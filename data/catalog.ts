export type NavLink = { label: string; href: string };

export type MegaMenu = {
  id: string;
  allHref: string;
  columns: { title: string; links: NavLink[] }[];
  feature: { eyebrow: string; title: string; description: string; image: string; href: string };
};

export type PrimaryNavItem = { label: string; href: string; menu?: MegaMenu };

export const disciplines = [
  { name: "Road", tagline: "Speed & endurance", image: "/images/discipline-road.png", href: "#bikes" },
  { name: "Mountain", tagline: "Trail & enduro", image: "/images/discipline-mountain.png", href: "#bikes" },
  { name: "E-Bikes", tagline: "Powered by SyncDrive", image: "/images/discipline-ebike.png", href: "#bikes" },
  { name: "Gravel", tagline: "Any road, any steppe", image: "/images/discipline-gravel.png", href: "#bikes" },
  { name: "City", tagline: "Commute & fitness", image: "/images/discipline-city.png", href: "#bikes" },
  { name: "Kids", tagline: "First rides, big smiles", image: "/images/discipline-kids.png", href: "#bikes" },
];

const bikesMenu: MegaMenu = {
  id: "bikes",
  allHref: "#bikes",
  columns: [
    {
      title: "Road",
      links: [
        { label: "Aero", href: "#bikes" },
        { label: "Endurance", href: "#bikes" },
        { label: "Race", href: "#bikes" },
      ],
    },
    {
      title: "Mountain",
      links: [
        { label: "Trail", href: "#bikes" },
        { label: "Enduro", href: "#bikes" },
        { label: "Cross Country", href: "#bikes" },
        { label: "Hardtail", href: "#bikes" },
      ],
    },
    {
      title: "Gravel",
      links: [
        { label: "Gravel Race", href: "#bikes" },
        { label: "Adventure", href: "#bikes" },
        { label: "Bikepacking", href: "#bikes" },
      ],
    },
    {
      title: "City & Kids",
      links: [
        { label: "Urban", href: "#bikes" },
        { label: "Fitness", href: "#bikes" },
        { label: "Kids", href: "#bikes" },
      ],
    },
  ],
  feature: {
    eyebrow: "Road / Aero",
    title: "Built for speed",
    description: "Aero road bikes engineered in Advanced SL carbon.",
    image: "/images/discipline-road.png",
    href: "#bikes",
  },
};

const eBikesMenu: MegaMenu = {
  id: "e-bikes",
  allHref: "#bikes",
  columns: [
    {
      title: "E-Mountain",
      links: [
        { label: "E-Trail", href: "#bikes" },
        { label: "E-Enduro", href: "#bikes" },
        { label: "E-Hardtail", href: "#bikes" },
      ],
    },
    {
      title: "E-Road & Gravel",
      links: [
        { label: "E-Road", href: "#bikes" },
        { label: "E-Gravel", href: "#bikes" },
      ],
    },
    {
      title: "E-City",
      links: [
        { label: "Commute", href: "#bikes" },
        { label: "Fitness", href: "#bikes" },
      ],
    },
    {
      title: "Technology",
      links: [
        { label: "SyncDrive Motors", href: "#technology" },
        { label: "EnergyPak Batteries", href: "#technology" },
        { label: "RideControl", href: "#technology" },
      ],
    },
  ],
  feature: {
    eyebrow: "E-Bike / E-MTB",
    title: "Climb further",
    description: "Smart Assist power that reads every pedal stroke.",
    image: "/images/discipline-ebike.png",
    href: "#bikes",
  },
};

export const primaryNav: PrimaryNavItem[] = [
  { label: "Bikes", href: "#bikes", menu: bikesMenu },
  { label: "E-Bikes", href: "#bikes", menu: eBikesMenu },
  { label: "Gear", href: "#" },
  { label: "Technology", href: "#technology" },
  { label: "Stores", href: "#stores" },
];
