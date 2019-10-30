export interface BaseResponseBody<T> {
  statusCode: number;
  error: string;
  message: string;
  data: T;
}
