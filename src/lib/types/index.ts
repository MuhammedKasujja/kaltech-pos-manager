import { SyncMode } from "./enums";

export * from "./api-response";

export type EntityData = {
  tableName: string;
  entityId?: string;
  entity: string;
  data: any;
  operation: SyncMode;
};
