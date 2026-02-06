export class ApiError extends Error {
	code?: string | number | null;
	constructor(message: string, code?: string | number | null) {
		super(message);
		this.name = "ApiError";
		this.code = code;
	}
}
