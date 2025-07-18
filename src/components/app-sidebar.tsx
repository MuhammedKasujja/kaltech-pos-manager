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
  navMain: [
    {
      title: "Dashboard",
      url: "dashboard",
      icon: IconDashboard,
    },
    {
      title: "Companies",
      url: "companies",
      icon: IconListDetails,
    },
    {
      title: "Accounts",
      url: "accounts",
      icon: IconListDetails,
    },
    {
      title: "Sync Devices",
      url: "sync-devices",
      icon: IconFolder,
    },
    {
      title: "Data Uploads",
      url: "data-uploads",
      icon: IconFileDescription,
    },
    {
      title: "Users",
      url: "users",
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
  } | null>;
};

export function AppSidebar({ userPromise, ...props }: Props) {
  const user = React.use(userPromise);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Kaltech Inc.</span>
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
