"use client";

import { type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTranslation, GlobalKeys } from "@/i18n";

export function NavMain({
  items,
}: {
  items: {
    title: GlobalKeys;
    url: string;
    icon?: Icon;
  }[];
}) {
  const pathname = usePathname();
  const tr = useTranslation();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link href={item.url as Route}>
                <SidebarMenuButton
                  tooltip={tr(item.title)}
                  className={cn(
                    pathname.includes(item.url) &&
                      "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                  )}
                >
                  {item.icon && <item.icon />}
                  <span>{tr(item.title)}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
