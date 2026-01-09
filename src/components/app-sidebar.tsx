"use client";
import * as React from "react";
import {
  IconCamera,
  IconDashboard,
  IconFileDescription,
  IconFolder,
  IconInnerShadowTop,
  IconListDetails,
  IconSettings,
  IconUsersGroup,
  IconListCheck,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavAuthUser } from "@/components/nav-auth-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  appName: "Kaltech Inc.",
  navMain: [
    {
      title: "routes.dashboard" as const,
      url: "/admin/dashboard",
      icon: IconDashboard,
    },
    {
      title: "routes.accounts" as const,
      url: "/admin/accounts",
      icon: IconListDetails,
    },
    {
      title: "routes.sync-devices" as const,
      url: "/admin/sync-devices",
      icon: IconFolder,
    },
    {
      title: "routes.data-uploads" as const,
      url: "/admin/data-uploads",
      icon: IconFileDescription,
    },
    {
      title: "routes.subscriptions" as const,
      url: "/admin/subscriptions",
      icon: IconListCheck,
    },
    {
      title: "routes.users" as const,
      url: "/admin/users",
      icon: IconUsersGroup,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
  ],
};

type Props = React.ComponentProps<typeof Sidebar> & {
  userPromise: Promise<{
    id: number;
    email: string;
    name: string;
    avatar: string;
    initials: string;
  } | null>;
};

export function AppSidebar({ userPromise, ...props }: Props) {
  const user = React.use(userPromise);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">{data.appName}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>{user && <NavAuthUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
