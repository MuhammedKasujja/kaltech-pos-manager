import { Prettify } from "./util";

type ApiResultSuccess<T> = {
  message?: string;
  data?: T;
  success: true;
};

type ApiResultError = {
  success: false;
  error: {
    message: string;
    code?: number;
  };
};

type ApiResultStruct<T> = ApiResultSuccess<T> | ApiResultError;

export type ApiResult<T> = Prettify<ApiResultStruct<T>>;
