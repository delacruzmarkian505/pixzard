export interface Player {
  id: number;
  name: string;
  coins: number;
  xp: number;
  dragonScales: number;
  moonLeaves: number;
  stormCores: number;
  nightshade: number;
  phoenixFeathers: number;
  ghostMist: number;
}

export interface Potion {
  id: number;
  name: string;
  effect: string;
  color: string;
  rarity: string;
  price: number;
  quantity: number;
  player?: Player;
}

export interface Ingredient {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

export type NewPotion = Omit<Potion, "id" | "player">;
