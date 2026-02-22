import { Potion } from "./types";

export const getPotionStats = (potion: Potion) => {
  const powerScale =
    potion.rarity === "Legendary" ? 2.5 : potion.rarity === "Rare" ? 1.6 : 1.0;

  let damage = 0;
  let heal = 0;
  const name = potion.name;

  if (name === "Void Whisper" || name === "Spectral Toxin") {
    damage = 60 * powerScale;
  } else if (name === "Thunder Drake Essence") {
    damage = 45 * powerScale;
  } else if (name === "Eternal Sunfire" || name === "Dragon's Rebirth") {
    heal = 40 * powerScale;
    damage = 20 * powerScale;
  } else if (name === "Lunar Mirage") {
    heal = 25 * powerScale;
    damage = 10 * powerScale;
  } else if (name === "Grand Alchemist's Elixir") {
    heal = 50 * powerScale;
    damage = 50 * powerScale;
  } else {
    if (
      name.includes("Fiery") ||
      name.includes("Arcane") ||
      name.includes("Unstable")
    ) {
      damage = 30 * powerScale;
    } else if (name.includes("Radiant") || name.includes("Purified")) {
      heal = 30 * powerScale;
    } else if (name.includes("Shadowed") || name.includes("Misty")) {
      damage = 15 * powerScale;
      heal = 15 * powerScale;
    } else {
      damage = 20 * powerScale;
      heal = 5 * powerScale;
    }
  }

  return {
    damage: Math.floor(damage),
    heal: Math.floor(heal),
  };
};

export const getEnhancedDescription = (name: string, effect: string) => {
  if (!effect.startsWith("Combined power of")) return effect;

  const mappings: Record<string, string> = {
    "Eternal Sunfire":
      "A radiant brew that glows with the heat of a thousand suns. Heals wounds and clears the path with blinding light.",
    "Dragon's Rebirth":
      "Infused with the essence of fire and myth. Restores life force and grants the resilience of a dragon.",
    "Void Whisper":
      "A dark, swirling liquid that seems to absorb light. Inflicts devastating soul damage on those who oppose you.",
    "Spectral Toxin":
      "A ghostly green mist trapped in a vial. Weakens the spirit and slowly drains the life of your enemies.",
    "Lunar Mirage":
      "A shimmering potion that reflects the silver light of the moon. Grants exceptional clarity and wards off illusions.",
    "Thunder Drake Essence":
      "A crackling elixir that channels the fury of a storm. Strikes enemies with lightning and grants a boost in speed.",
    "Grand Alchemist's Elixir":
      "The pinnacle of alchemical science. A perfectly balanced draft that empowers every fiber of your being.",
  };

  if (mappings[name]) return mappings[name];

  if (name.includes("Radiant"))
    return "A bright mixture that purifies the soul and restores vitality.";
  if (name.includes("Shadowed"))
    return "A murky brew that hides the user in darkness, granting a tactical advantage.";
  if (name.includes("Unstable"))
    return "A bubbling solution that reacts violently. Potent but unpredictable.";
  if (name.includes("Purified"))
    return "A crystal-clear liquid that removes all impurities and strengthens the mind.";
  if (name.includes("Misty"))
    return "A vaporous concoction that allows for swift movement.";
  if (name.includes("Fiery"))
    return "A burning liquid that ignites the spirit and enhances combat prowess.";
  if (name.includes("Arcane"))
    return "A pulsing purple elixir that connects the user to raw magical currents.";

  return "A mysterious bubbling concoction with unknown magical properties.";
};
