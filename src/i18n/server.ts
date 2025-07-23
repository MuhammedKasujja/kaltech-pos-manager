"use server";
import { getTranslations as getServerTranslations } from "next-intl/server";
import { GlobalKeys, NamespaceKeys, Namespaces } from "./messages";
import type { TranslationValues } from "next-intl";

export async function getTranslations<
  N extends Namespaces | undefined = undefined,
>(namespace?: N) {
  const t = await getServerTranslations(namespace);

  return <K extends N extends string ? NamespaceKeys<N> : GlobalKeys>(
    key: K,
    values?: TranslationValues
  ) => {
    return t(key as string, values);
  };
}
