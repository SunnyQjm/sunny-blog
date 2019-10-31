export interface BaseResponseBody<T> {
  statusCode: number;
  error: string;
  message: string;
  data: T;
}


export interface BaseListData<T> {
  list: T[],
  total: number,
  page: number,
  size: number,
}
