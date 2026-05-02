import { Costume, MOCK_COSTUMES } from "@/lib/types";

export async function fetchCostumes(filters?: {
  search?: string;
  hijabFriendly?: boolean;
  crossplayFriendly?: boolean;
}): Promise<Costume[]> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  let filtered = [...MOCK_COSTUMES];
  if (filters?.search) {
    const s = filters.search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(s) ||
        c.series.toLowerCase().includes(s) ||
        c.character.toLowerCase().includes(s)
    );
  }
  if (filters?.hijabFriendly) {
    filtered = filtered.filter((c) => c.isHijabFriendly);
  }
  if (filters?.crossplayFriendly) {
    filtered = filtered.filter((c) => c.isCrossplayFriendly);
  }
  return filtered;
}
