"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale } from "next-intl";
import { setUserLocale } from "@/services/locale";
import { Locale, supportedLocales } from "@/i18n/config";
import { useTranslation } from "@/i18n";

export function LocaleSwitcher() {
  const t = useTranslation("common");
  const locale = useLocale();

  function onChange(locale: Locale) {
    setUserLocale(locale);
  }
  return (
    <Select onValueChange={onChange} defaultValue={locale}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Change locale" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t("locale.header")}</SelectLabel>
          {supportedLocales.map((locale) => (
            <SelectItem key={locale.value} value={locale.value}>
              {locale.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
