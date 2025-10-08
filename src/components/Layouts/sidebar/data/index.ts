import * as Icons from "../icons";

export interface NavSubItem {
  title: string;
  url: string;
}

export interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  items?: NavSubItem[];
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const NAV_DATA: NavSection[] = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Home",
        url: "/",
        icon: Icons.HomeIcon,
      },
      {
        title: "City Search",
        url: "/city-search",
        icon: Icons.User,
      },
      {
        title: "Route Planning",
        url: "/route-planning",
        icon: Icons.FourCircle,
      },      
    ],
  },
];
