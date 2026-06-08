
export interface Elixir {
  id: string;
  name: string;
}
 
export interface Wizard {
  id: string;
  firstName: string | null;
  lastName: string | null;
  elixirs: Elixir[];
}
 
export function getWizardName(wizard: Wizard): string {
  const parts = [wizard.firstName, wizard.lastName].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : "—";
}
 