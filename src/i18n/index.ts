"use client";
import { useTranslations as useTranslationsBase } from "next-intl";
import { MessageKey, Namespaces, NamespaceKeys, GlobalKeys } from "./messages";

export function useTranslation<N extends Namespaces | undefined = undefined>(
  namespace?: N
) {
  const t = useTranslationsBase(namespace as any);

  return <K extends N extends string ? NamespaceKeys<N> : GlobalKeys>(
    key: K,
    values?: Record<string, any>
  ) => {
    return t(key as string, values);
  };
}
