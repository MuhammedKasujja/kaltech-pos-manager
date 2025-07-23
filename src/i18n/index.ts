"use client";
import { useTranslations as useTranslationsBase } from "next-intl";
import {Namespaces, NamespaceKeys, GlobalKeys } from "./messages";
import type { TranslationValues } from 'next-intl';

export function useTranslation<N extends Namespaces | undefined = undefined>(
  namespace?: N
) {
  const t = useTranslationsBase(namespace);

  return <K extends N extends string ? NamespaceKeys<N> : GlobalKeys>(
    key: K,
    values?: TranslationValues
  ) => {
    return t(key as string, values);
  };
}
