export interface PaginatedResponse<T> {
	currentPage: number;
	totalPages: number;
	totalCount: number;
	data: T[];
}
