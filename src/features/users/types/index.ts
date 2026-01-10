import { getFiltersStateParser, getSortingStateParser } from "@/lib/parsers";
import { User } from "@prisma/client";
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

export const userSearchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<User>().withDefault([
    { id: "createdAt", desc: true },
  ]),
  search: parseAsString.withDefault(""),
  createdAt: parseAsArrayOf(parseAsInteger).withDefault([]),
  filters: getFiltersStateParser().withDefault([]),
  joinOperator: parseAsStringEnum(["and", "or"]).withDefault("and"),
});

export type GetUsersSchema = Awaited<
  ReturnType<typeof userSearchParamsCache.parse>
>;
