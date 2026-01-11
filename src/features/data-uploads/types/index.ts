import { getFiltersStateParser, getSortingStateParser } from "@/lib/parsers";
import { DataUpload } from "@prisma/client";
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

export const dataUploadSearchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<DataUpload>().withDefault([
    { id: "createdAt", desc: true },
  ]),
  search: parseAsString.withDefault(""),
  createdAt: parseAsArrayOf(parseAsInteger).withDefault([]),
  // advanced filter
  filters: getFiltersStateParser().withDefault([]),
  joinOperator: parseAsStringEnum(["and", "or"]).withDefault("and"),
});

export type GetDataUploadsSchema = Awaited<
  ReturnType<typeof dataUploadSearchParamsCache.parse>
>;

export type GetAccountDataUploadsSchema = Awaited<
  ReturnType<typeof dataUploadSearchParamsCache.parse>
>;

export type EntityUpload = {
  state: "updated" | "created" | "deleted";
  entity: string;
  entityId: string;
  isSaved?: boolean;
  data: {
    uuid: string;
    is_synced: boolean;
    relations?: {
      [key: string]: EntityRelation | EntityRelation[] | undefined | null;
    };
    updated_at?: string;
    updatedAt: string;
    created_at: string;
    deleted_at?: string;
  };
};

export type EntityRelationUpload = {
  state: "updated" | "created" | "deleted";
  entity: string;
  entityId: string;
  isSaved?: boolean;
  data: {
    uuid: string;
    relations?: {
      [key: string]: EntityRelation | EntityRelation[] | undefined | null;
    };
  };
};

export type EntityRelation = {
  entity: string;
  uuid: string;
  is_synced: boolean;
  parent_uuid?: string;
};
