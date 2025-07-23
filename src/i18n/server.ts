"user server";
import { getTranslations as getServerTranslations } from "next-intl/server";
import { MessageKey, Namespace } from "./messages";

export async function getTranslations(namespace?: Namespace) {
  const t = await getServerTranslations<Namespace>(namespace);

  function typedT(key: MessageKey, values?: Record<string, any>) {
    return t(key, values);
  }

  return typedT;
}
