import { getFiltersStateParser, getSortingStateParser } from "@/lib/parsers";
import { Account } from "@prisma/client";
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

export const accountSearchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<Account>().withDefault([
    { id: "createdAt", desc: true },
  ]),
  search: parseAsString.withDefault(""),
  createdAt: parseAsArrayOf(parseAsInteger).withDefault([]),
  // advanced filter
  filters: getFiltersStateParser().withDefault([]),
  joinOperator: parseAsStringEnum(["and", "or"]).withDefault("and"),
});

export type GetAccountsSchema = Awaited<
  ReturnType<typeof accountSearchParamsCache.parse>
>;
