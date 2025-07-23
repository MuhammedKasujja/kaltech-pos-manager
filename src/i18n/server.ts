"user server";
import { getTranslations as getServerTranslations } from "next-intl/server";
import { MessageKey, Namespaces } from "./messages";
import type { TranslationValues } from 'next-intl';

export async function getTranslations(namespace?: Namespaces) {
  const t = await getServerTranslations<Namespaces>(namespace);

  function typedT(key: MessageKey, values?: TranslationValues) {
    return t(key, values);
  }

  return typedT;
}
