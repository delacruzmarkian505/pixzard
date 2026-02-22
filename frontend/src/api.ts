import { Potion, NewPotion, Player } from "./types";

const BASE_URL = "http://localhost:3000";

export const playerApi = {
  login: async (name: string): Promise<Player> => {
    const response = await fetch(`${BASE_URL}/players/${name}`);
    if (!response.ok) {
      if (response.status === 404)
        throw new Error("Wizard not found. Did you mean to Join?");
      throw new Error("Failed to connect to the Magic Server.");
    }
    return response.json();
  },

  register: async (name: string): Promise<Player> => {
    const response = await fetch(`${BASE_URL}/players`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Failed to join the lab: ${err}`);
    }
    return response.json();
  },

  update: async (id: number, data: Partial<Player>): Promise<Player> => {
    const response = await fetch(`${BASE_URL}/players/${id}/stats`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update player profile");
    return response.json();
  },
};

export const potionApi = {
  getAll: async (playerId?: number): Promise<Potion[]> => {
    const url = playerId
      ? `${BASE_URL}/potions?playerId=${playerId}`
      : `${BASE_URL}/potions`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch potions");
    return response.json();
  },

  create: async (potionData: NewPotion, playerId: number): Promise<Potion> => {
    const response = await fetch(`${BASE_URL}/potions?playerId=${playerId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(potionData),
    });
    if (!response.ok) throw new Error("Failed to brew potion");
    return response.json();
  },

  update: async (id: number, potionData: Partial<Potion>): Promise<Potion> => {
    const response = await fetch(`${BASE_URL}/potions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(potionData),
    });
    if (!response.ok) throw new Error("Failed to refine potion");
    return response.json();
  },

  delete: async (id: number): Promise<boolean> => {
    const response = await fetch(`${BASE_URL}/potions/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to discard potion");
    return true;
  },
};
