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
    label: "MENU PRINCIPAL",
    items: [
      {
        title: "Accueil",
        url: "/",
        icon: Icons.HomeIcon,
      },
      {
        title: "Recherche de ville",
        url: "/city-search",
        icon: Icons.User,
      },
      {
        title: "Itinéraires optimisés",
        url: "/route-planning",
        icon: Icons.FourCircle,
      },      
    ],
  },
];
