import {
  Calendar1,
  ChevronDown,
  Globe,
  Handshake,
  Home,
  School,
  Settings,
  Users2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { Link } from "react-router-dom";

const sidebarMenuItems = [
  {
    title: "Homepage",
    url: "/",
    icon: Home,
  },
  {
    title: "Events",
    url: "/events",
    icon: Calendar1,
  },
  {
    title: "Organizations",
    url: "/organizations",
    icon: School,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users2,
  },
  {
    title: "Services",
    url: "/services",
    icon: Globe,
  },
  {
    title: "Sponsors",
    url: "/sponsors",
    icon: Handshake,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    submenu: [
      {
        title: "App Settings",
        url: "/app-settings",
      },
      {
        title: "General Settings",
        url: "/general-settings",
      },
      {
        title: "Commerce Settings",
        url: "/commerce-settings",
      },
      {
        title: "Trading Card Settings",
        url: "/trading-card-settings",
      },
    ],
  },
];

const AppSidebar = () => {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarMenuItems.map((item) =>
                item.submenu && item.submenu.length > 0 ? (
                  <Collapsible key={item.title} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton asChild>
                          <div className="flex items-center justify-between">
                            <Link to="#" className="flex items-center gap-2">
                              <item.icon />
                              <span>{item.title}</span>
                            </Link>
                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </div>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-6">
                        {item.submenu.map((submenuItem) => (
                          <SidebarMenuSub key={submenuItem.title}>
                            <SidebarMenuButton asChild>
                              <Link to={submenuItem.url}>
                                <span>{submenuItem.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuSub>
                        ))}
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <div className="flex items-center gap-2">
                          <item.icon />
                          <span>{item.title}</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
