"use client";
import { useTranslations as translator } from "next-intl";
import { MessageKey, Namespace } from "./messages";

export function useTranslation(namespace?: Namespace) {
  const t = translator<Namespace>(namespace);

  function typedT(key: MessageKey, values?: Record<string, any>) {
    return t(key, values);
  }

  return typedT;
}
