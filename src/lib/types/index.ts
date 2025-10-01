import { SyncMode } from "./enums";

export * from "./api-response";

export type EntityData = {
  tableName: string;
  entityId?: string;
  entity: string;
  data: unknown;
  operation: SyncMode;
};

type Result<T> = {
  success: true;
  data: T;
};

type Error<E = string> = {
  success: false;
  error: E;
};

export type Action<T, E = string> = Promise<Result<T> | Error<E>>;
