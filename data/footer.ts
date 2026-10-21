export type FooterLink = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export const footerColumns: FooterColumn[] = [
  {
    title: "Shop",
    links: [
      { label: "Road", href: "/bikes?discipline=road" },
      { label: "Mountain", href: "/bikes?discipline=mountain" },
      { label: "E-Bikes", href: "/bikes?discipline=ebike" },
      { label: "Gravel", href: "/bikes?discipline=gravel" },
      { label: "City", href: "/bikes?discipline=city" },
      { label: "Kids", href: "/bikes?discipline=kids" },
      { label: "Gear", href: "/gear" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Bike Fitting", href: "/service" },
      { label: "Service & Repair", href: "/service" },
      { label: "Test Rides", href: "/stores" },
      { label: "Warranty", href: "/service" },
    ],
  },
  {
    title: "Giant Mongolia",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Flagship Store", href: "/stores" },
      { label: "Group Rides", href: "/about" },
      { label: "Careers", href: "/about" },
    ],
  },
  {
    title: "Customer",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Shipping", href: "/contact" },
      { label: "Returns", href: "/service" },
      { label: "FAQ", href: "/contact" },
    ],
  },
];

// PLACEHOLDER social URLs — replace with official Giant Mongolia profiles.
export const socials = [
  {
    name: "Instagram",
    href: "#",
    path: "M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.8a1.4 1.4 0 100 2.9 1.4 1.4 0 000-2.9z",
  },
  {
    name: "Facebook",
    href: "#",
    path: "M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z",
  },
  {
    name: "YouTube",
    href: "#",
    path: "M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z",
  },
];
