export type Discipline = {
  id: string;
  name: string;
  tagline: string;
  image: string;
};

export const disciplines: Discipline[] = [
  { id: "road", name: "Road", tagline: "Speed & endurance", image: "/images/discipline-road.png" },
  { id: "mountain", name: "Mountain", tagline: "Trail & enduro", image: "/images/discipline-mountain.png" },
  { id: "ebike", name: "E-Bikes", tagline: "Powered by SyncDrive", image: "/images/discipline-ebike.png" },
  { id: "gravel", name: "Gravel", tagline: "Any road, any steppe", image: "/images/discipline-gravel.png" },
  { id: "city", name: "City", tagline: "Commute & fitness", image: "/images/discipline-city.png" },
  { id: "kids", name: "Kids", tagline: "First rides, big smiles", image: "/images/discipline-kids.png" },
];

export function getDisciplineById(id: string | undefined): Discipline | undefined {
  if (!id) return undefined;
  return disciplines.find((discipline) => discipline.id === id);
}
