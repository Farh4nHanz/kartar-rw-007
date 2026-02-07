type PaginationMeta = {
	totalPages: number;
	currentPage: number;
	pageSize: number;
};

export type Meta<TExtra extends object = Record<string, unknown>> =
	PaginationMeta & TExtra;

export type SuccessResponse = {
	success: true;
	message: string;
};

export type SuccessResponseWithData<TData> = SuccessResponse & {
	data: TData;
};

export type SuccessResponseWithMeta<
	TData,
	TMeta extends object,
> = SuccessResponse & {
	data: TData;
	meta: TMeta;
};

export type ErrorResponse = {
	success: false;
	code?: string;
	message: string;
};
