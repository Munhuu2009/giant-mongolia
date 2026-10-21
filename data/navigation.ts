export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "Bikes", href: "/bikes" },
  { label: "E-Bikes", href: "/bikes?discipline=ebike" },
  { label: "Gear", href: "/gear" },
  { label: "Technology", href: "/technology" },
  { label: "Stores", href: "/stores" },
];
