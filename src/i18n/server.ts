"user server";
import { getTranslations as getServerTranslations } from "next-intl/server";
import { MessageKey, Namespaces } from "./messages";

export async function getTranslations(namespace?: Namespaces) {
  const t = await getServerTranslations<Namespaces>(namespace);

  function typedT(key: MessageKey, values?: Record<string, any>) {
    return t(key, values);
  }

  return typedT;
}
