import { useQuery } from "@tanstack/react-query";
import { Wizard } from "../types/types";

const BASE_URL = "https://wizard-world-api.herokuapp.com";

async function fetchWizards(search: string): Promise<Wizard[]> {
  const params = new URLSearchParams();
  if (search.trim()) {
    // Try both firstName and lastName — use firstName param as primary
    params.set("FirstName", search.trim());
  }

  const url = `${BASE_URL}/Wizards${params.toString() ? `?${params.toString()}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function fetchWizardsByLastName(search: string): Promise<Wizard[]> {
  const params = new URLSearchParams();
  params.set("LastName", search.trim());
  const url = `${BASE_URL}/Wizards?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export function useWizards(search: string) {
  return useQuery<Wizard[]>({
    queryKey: ["wizards", search],
    queryFn: async () => {
      if (!search.trim()) {
        return fetchWizards("");
      }
      // Fetch both firstName and lastName matches, merge & dedupe
      const [byFirst, byLast] = await Promise.all([
        fetchWizards(search).catch(() => [] as Wizard[]),
        fetchWizardsByLastName(search).catch(() => [] as Wizard[]),
      ]);
      const seen = new Set<string>();
      const merged: Wizard[] = [];
      for (const w of [...byFirst, ...byLast]) {
        if (!seen.has(w.id)) {
          seen.add(w.id);
          merged.push(w);
        }
      }
      return merged;
    },
    staleTime: 5 * 60 * 1000,
  });
}