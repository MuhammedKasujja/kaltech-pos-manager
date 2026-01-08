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
      title: "routes.dashboard",
      url: "/admin/dashboard",
      icon: IconDashboard,
    },
    {
      title: "routes.accounts",
      url: "/admin/accounts",
      icon: IconListDetails,
    },
    {
      title: "routes.sync-devices",
      url: "/admin/sync-devices",
      icon: IconFolder,
    },
    {
      title: "routes.data-uploads",
      url: "/admin/data-uploads",
      icon: IconFileDescription,
    },
    {
      title: "routes.subscriptions",
      url: "/admin/subscriptions",
      icon: IconUsersGroup,
    },
    {
      title: "routes.users",
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
