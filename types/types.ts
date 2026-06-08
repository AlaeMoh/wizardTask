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
