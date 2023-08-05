import { ZodError, z } from 'zod';

export const zodParse = <TSchema extends z.ZodSchema<z.infer<TSchema>>>(
	schema: TSchema,
	value: unknown
) => {
	try {
		const data = schema.parse(value);
		return [data, null] as const;
	} catch (error) {
		if (error instanceof z.ZodError) {
			return [null, error as z.ZodError<z.infer<TSchema>>] as const;
		}
		throw error;
	}
};

export const zodErrorsToJsonErrors = (zodErrors: ZodError) => {
	const entries = zodErrors.issues.map((issue) => {
		const [field] = issue.path;
		return [field, issue.message];
	});
	return Object.fromEntries(entries);
};
