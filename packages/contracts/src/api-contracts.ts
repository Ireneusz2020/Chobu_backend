export interface ErrorResponseDto {
  code: string;
  message: string;
  correlationId: string;
  details?: Record<string, unknown>;
}

export interface PaginatedResponseDto<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}
