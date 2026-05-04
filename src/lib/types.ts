export interface Costume {
  id: string;
  name: string; // SRD: title
  series: string;
  character: string; // SRD: character_name
  price: number;
  image: string;
  type: "rental" | "sale";
  gender: "Pria" | "Wanita" | "Unisex";
  isHijabFriendly: boolean;
  isCrossplayFriendly: boolean;
  size: "S" | "M" | "L" | "XL" | "All Size";
  weightGrams: number;
  inclusions: string;
  rentalDurationDays: number;
}

import costumesData from "@/data/costumes.json";

export const MOCK_COSTUMES: Costume[] = costumesData as Costume[];
