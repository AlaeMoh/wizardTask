import { useQuery } from "@tanstack/react-query";
import { Wizard } from "../types/types";

const BASE_URL = "https://wizard-world-api.herokuapp.com";

async function fetchAllWizards(): Promise<Wizard[]> {
  const res = await fetch(`${BASE_URL}/Wizards`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export function useWizards(search: string) {
  return useQuery<Wizard[]>({

    queryKey: ["wizards"], 
    queryFn: fetchAllWizards,
    staleTime: 10 * 60 * 1000, 
    
    select: (wizards) => {
      const cleanSearch = search.trim().toLowerCase();
      if (!cleanSearch) return wizards;

      return wizards.filter((wizard) => {
        const firstName = wizard.firstName?.toLowerCase() || "";
        const lastName = wizard.lastName?.toLowerCase() || "";
        
        const combinedName = `${firstName} ${lastName}`.trim();

        return (
          firstName.includes(cleanSearch) ||
          lastName.includes(cleanSearch) ||
          combinedName.includes(cleanSearch)
        );
      });
    },
  });
}