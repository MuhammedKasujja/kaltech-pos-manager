import { SyncMode } from "./enums";

export * from "./api-response";

export type EntityData = {
  tableName: string;
  entityId?: string;
  entity: string;
  data: unknown;
  operation: SyncMode;
};
