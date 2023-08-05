export const handleResponse = (response: Response) =>
	new Promise((resolve, reject) => {
		const solver = response.ok ? resolve : reject;
		response.json().then((data) => solver(data));
	});
