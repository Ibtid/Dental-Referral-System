export interface IAxiosResponse<T> {
  statusCode: number;
  isSuccess: boolean;
  message: string;
  body: T;
}

export interface IAxiosResponseWithPagination<T> {
  pageNumber: number;
  limit: number;
  totalCount: number;
  data: T;
}
