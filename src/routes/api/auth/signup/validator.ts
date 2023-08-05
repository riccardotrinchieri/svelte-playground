import { z } from 'zod';

export const POSTValidationSchema = z.object({
	username: z.string().nonempty(),
	password: z.string().nonempty(),
	confirmPassword: z.string().nonempty()
});
