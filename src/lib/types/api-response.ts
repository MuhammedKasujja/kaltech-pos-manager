import { Prettify } from "./util";

type ApiResponseSuccess<T> = {
  message?: string;
  data?: T;
  success: true;
};

type ApiResponseError = {
  success: false;
  error: {
    message: string;
    code?: number;
  };
};

type ResponseStruct<T> = ApiResponseSuccess<T> | ApiResponseError;

export type ApiResponse<T> = Prettify<ResponseStruct<T>>;
