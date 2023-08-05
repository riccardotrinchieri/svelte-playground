export const formDataToJSON = (formdata: FormData, options?: { arrayKeys?: string[] }) => {
	const json: Record<string, unknown> = Object.fromEntries(formdata.entries());
	options?.arrayKeys?.forEach((k) => {
		json[k] = formdata.getAll(k);
	});
	return json;
};
