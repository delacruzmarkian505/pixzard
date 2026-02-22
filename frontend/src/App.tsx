import React, { useState, useEffect } from "react";
import { potionApi, playerApi } from "./api";
import { Potion, Ingredient, NewPotion, Player } from "./types";
import { LoginPage } from "./pages/LoginPage";
import { LaboratoryPage } from "./pages/LaboratoryPage";
import { LandingPage } from "./pages/LandingPage";
import ErrorModal from "./components/ErrorModal";
import MagicForest from "./components/MagicForest";
import { ShopModal } from "./components/ShopModal";
import { ConfirmModal } from "./components/ConfirmModal";
import { CombatArena } from "./components/CombatArena";

function App() {
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [potions, setPotions] = useState<Potion[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    [],
  );
  const [isBrewing, setIsBrewing] = useState<boolean>(false);
  const [editingPotion, setEditingPotion] = useState<Potion | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isForestOpen, setIsForestOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isLairOpen, setIsLairOpen] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [combatPlayerHp, setCombatPlayerHp] = useState(100);
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    type: "danger" | "warning" | "info";
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
    type: "info",
  });

  // Load player from localStorage on mount
  useEffect(() => {
    const savedPlayer = localStorage.getItem("pixzard_player");
    if (savedPlayer) {
      try {
        const player = JSON.parse(savedPlayer);
        // Silently login returnee
        playerApi
          .login(player.name)
          .then((p) => {
            setCurrentPlayer(p);
          })
          .catch(() => {
            localStorage.removeItem("pixzard_player");
          });
      } catch (e) {
        localStorage.removeItem("pixzard_player");
      }
    }
  }, []);

  useEffect(() => {
    if (currentPlayer) {
      fetchPotions();
    }
  }, [currentPlayer]);

  const handleLogin = async (name: string) => {
    if (!name.trim()) return;
    try {
      const player = await playerApi.login(name);
      setCurrentPlayer(player);
      localStorage.setItem("pixzard_player", JSON.stringify(player));
    } catch (error: any) {
      setErrorMessage(
        error.message ||
          "Failed to enter the laboratory. Check your magical resonance.",
      );
      console.error("Login error:", error);
    }
  };

  const handleRegister = async (name: string) => {
    if (!name.trim()) return;
    try {
      const player = await playerApi.register(name);
      setCurrentPlayer(player);
      localStorage.setItem("pixzard_player", JSON.stringify(player));
    } catch (error: any) {
      setErrorMessage(
        error.message ||
          "Failed to create your profile. The stars are not aligned.",
      );
      console.error("Register error:", error);
    }
  };

  const handleLogout = () => {
    setCurrentPlayer(null);
    setPotions([]);
    localStorage.removeItem("pixzard_player");
  };

  const fetchPotions = async () => {
    if (!currentPlayer) return;
    try {
      const data = await potionApi.getAll(currentPlayer.id);
      setPotions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching potions:", error);
    }
  };

  const handleBrew = async () => {
    if (!currentPlayer || selectedIngredients.length < 2) return;

    setIsBrewing(true);

    const price =
      Math.floor(Math.random() * 500) +
      (selectedIngredients.length === 3 ? 450 : 100);

    // Dynamic naming and description logic
    const names = selectedIngredients.map((i) => i.name).sort();
    let potionName = "Mystic Brew";
    let potionDescription = "";

    if (names.includes("Dragon Scale") && names.includes("Phoenix Feather")) {
      if (names.length === 3) {
        potionName = "Eternal Sunfire";
        potionDescription =
          "A radiant brew that glows with the heat of a thousand suns. Heals wounds and clears the path with blinding light.";
      } else {
        potionName = "Dragon's Rebirth";
        potionDescription =
          "Infused with the essence of fire and myth. Restores life force and grants the resilience of a dragon.";
      }
    } else if (names.includes("Nightshade") && names.includes("Ghost Mist")) {
      if (names.length === 3) {
        potionName = "Void Whisper";
        potionDescription =
          "A dark, swirling liquid that seems to absorb light. Inflicts devastating soul damage on those who oppose you.";
      } else {
        potionName = "Spectral Toxin";
        potionDescription =
          "A ghostly green mist trapped in a vial. Weakens the spirit and slowly drains the life of your enemies.";
      }
    } else if (names.includes("Moon Leaf") && names.includes("Ghost Mist")) {
      potionName = "Lunar Mirage";
      potionDescription =
        "A shimmering potion that reflects the silver light of the moon. Grants exceptional clarity and wards off illusions.";
    } else if (names.includes("Storm Core") && names.includes("Dragon Scale")) {
      potionName = "Thunder Drake Essence";
      potionDescription =
        "A crackling elixir that channels the fury of a storm. Strikes enemies with lightning and grants a boost in speed.";
    } else if (names.length === 3) {
      potionName = "Grand Alchemist's Elixir";
      potionDescription =
        "The pinnacle of alchemical science. A perfectly balanced draft that empowers every fiber of your being.";
    } else {
      const prefixes = [
        {
          name: "Radiant",
          desc: "A bright mixture that purifies the soul and restores vitality.",
        },
        {
          name: "Shadowed",
          desc: "A murky brew that hides the user in darkness, granting a tactical advantage.",
        },
        {
          name: "Unstable",
          desc: "A bubbling solution that reacts violently. Potent but unpredictable.",
        },
        {
          name: "Purified",
          desc: "A crystal-clear liquid that removes all impurities and strengthens the mind.",
        },
        {
          name: "Misty",
          desc: "A vaporous concoction that allows for swift movement.",
        },
        {
          name: "Fiery",
          desc: "A burning liquid that ignites the spirit and enhances combat prowess.",
        },
        {
          name: "Arcane",
          desc: "A pulsing purple elixir that connects the user to raw magical currents.",
        },
      ];
      const suffixes = ["Concoction", "Draft", "Mixture", "Solution"];
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      potionName = `${prefix.name} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
      potionDescription = prefix.desc;
    }

    // Potion Color Logic (Mix first two ingredients using Hex for reliability)
    const colorMap: Record<string, string> = {
      i1: "#ef4444", // red-500
      i2: "#60a5fa", // blue-400
      i3: "#facc15", // yellow-400
      i4: "#a855f7", // purple-500
      i5: "#f97316", // orange-500
      i6: "#cbd5e1", // slate-300
    };

    const color1 = colorMap[selectedIngredients[0].id] || "#10b981";
    const color2 = colorMap[selectedIngredients[1].id] || "#0d9488";

    const newPotionData: NewPotion & { quantity: number } = {
      name: potionName,
      effect: potionDescription,
      color: `${color1},${color2}`,
      rarity: price > 750 ? "Legendary" : price > 450 ? "Rare" : "Common",
      price,
      quantity: 1,
    };

    // Calculate new material counts
    const materialUpdates: Partial<Player> = {
      coins: currentPlayer.coins + 50,
      xp: currentPlayer.xp + 25,
    };

    selectedIngredients.forEach((ing) => {
      if (ing.name === "Dragon Scale")
        materialUpdates.dragonScales =
          (materialUpdates.dragonScales ?? currentPlayer.dragonScales) - 1;
      if (ing.name === "Moon Leaf")
        materialUpdates.moonLeaves =
          (materialUpdates.moonLeaves ?? currentPlayer.moonLeaves) - 1;
      if (ing.name === "Storm Core")
        materialUpdates.stormCores =
          (materialUpdates.stormCores ?? currentPlayer.stormCores) - 1;
      if (ing.name === "Nightshade")
        materialUpdates.nightshade =
          (materialUpdates.nightshade ?? currentPlayer.nightshade) - 1;
      if (ing.name === "Phoenix Feather")
        materialUpdates.phoenixFeathers =
          (materialUpdates.phoenixFeathers ?? currentPlayer.phoenixFeathers) -
          1;
      if (ing.name === "Ghost Mist")
        materialUpdates.ghostMist =
          (materialUpdates.ghostMist ?? currentPlayer.ghostMist) - 1;
    });

    // Check for existing similar potion to increment quantity
    const existing = potions.find(
      (p) =>
        p.name === newPotionData.name &&
        p.rarity === newPotionData.rarity &&
        p.effect === newPotionData.effect,
    );

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (existing) {
        await potionApi.update(existing.id, {
          quantity: (existing.quantity || 1) + 1,
        });
      } else {
        await potionApi.create(newPotionData, currentPlayer.id);
      }

      const updatedPlayer = await playerApi.update(
        currentPlayer.id,
        materialUpdates,
      );
      setCurrentPlayer(updatedPlayer);

      fetchPotions();
      setSelectedIngredients([]);
    } catch (error: any) {
      setErrorMessage(
        error.message ||
          "The brewing process was interrupted by a dark presence.",
      );
      console.error("Error brewing potion:", error);
    } finally {
      setIsBrewing(false);
    }
  };

  const handleConsumePotion = async (potion: Potion) => {
    try {
      if (potion.quantity > 1) {
        const updated = await potionApi.update(potion.id, {
          quantity: potion.quantity - 1,
        });
        setPotions((prev) =>
          prev.map((p) => (p.id === potion.id ? updated : p)),
        );
      } else {
        await potionApi.delete(potion.id);
        setPotions((prev) => prev.filter((p) => p.id !== potion.id));
      }
    } catch (error) {
      console.error("Consumption error:", error);
    }
  };

  const handleDeletePotion = (id: number) => {
    setConfirmState({
      isOpen: true,
      title: "Discard Essence?",
      message:
        "Are you sure you want to discard this potion? This action cannot be undone.",
      type: "danger",
      onConfirm: async () => {
        try {
          await potionApi.delete(id);
          fetchPotions();
          setConfirmState((prev) => ({ ...prev, isOpen: false }));
        } catch (error: any) {
          setErrorMessage(
            error.message || "Could not discard this magical essence.",
          );
          console.error("Error deleting potion:", error);
        }
      },
    });
  };

  const handleSellPotion = (potion: Potion) => {
    if (!currentPlayer) return;
    const goldEarned = Math.floor(potion.price * 0.8);

    setConfirmState({
      isOpen: true,
      title: "Sell Potion?",
      message: `The traveling merchant offers ${goldEarned} coins for your ${potion.name}. Do you accept?`,
      type: "info",
      onConfirm: async () => {
        try {
          await potionApi.delete(potion.id);
          const updatedPlayer = await playerApi.update(currentPlayer.id, {
            coins: currentPlayer.coins + goldEarned,
            xp: currentPlayer.xp + 10,
          });
          setCurrentPlayer(updatedPlayer);
          fetchPotions();
          setConfirmState((prev) => ({ ...prev, isOpen: false }));
        } catch (error: any) {
          setErrorMessage(error.message || "The merchant refused your brew.");
          console.error("Sell error:", error);
        }
      },
    });
  };

  const handlePurchase = async (materialKey: keyof Player, price: number) => {
    if (!currentPlayer || currentPlayer.coins < price) return;

    try {
      const updatedPlayer = await playerApi.update(currentPlayer.id, {
        coins: currentPlayer.coins - price,
        [materialKey]: (currentPlayer[materialKey] as number) + 1,
        xp: currentPlayer.xp + 2,
      });
      setCurrentPlayer(updatedPlayer);
    } catch (error) {
      console.error("Purchase error:", error);
    }
  };

  const handleLairVictory = async (rewardCoins: number, rewardXp: number) => {
    if (!currentPlayer) return;
    try {
      const updatedPlayer = await playerApi.update(currentPlayer.id, {
        coins: currentPlayer.coins + rewardCoins,
        xp: currentPlayer.xp + rewardXp,
      });
      setCurrentPlayer(updatedPlayer);
    } catch (error) {
      console.error("Victory update error:", error);
    }
  };

  const calculatePotionCombatEffect = (potion: Potion) => {
    // Combat logic: Higher rarity = more power
    const powerScale =
      potion.rarity === "Legendary"
        ? 2.5
        : potion.rarity === "Rare"
          ? 1.6
          : 1.0;

    let damage = 0;
    let heal = 0;

    const name = potion.name;

    // Check specific iconic potions
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
      // Generic Categorization based on name prefixes
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

  const handleGather = async (materialKey: keyof Player) => {
    if (!currentPlayer) return;

    try {
      const updatedPlayer = await playerApi.update(currentPlayer.id, {
        [materialKey]: (currentPlayer[materialKey] as number) + 1,
        xp: currentPlayer.xp + 5,
      });
      setCurrentPlayer(updatedPlayer);
    } catch (error) {
      console.error("Gather error:", error);
    }
  };

  const handleUpdatePotion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPotion) return;

    try {
      await potionApi.update(editingPotion.id, editingPotion);
      fetchPotions();
      setEditingPotion(null);
    } catch (error: any) {
      setErrorMessage(
        error.message || "Failed to refine the potion's properties.",
      );
      console.error("Error updating potion:", error);
    }
  };

  const toggleIngredient = (ing: Ingredient) => {
    if (selectedIngredients.find((i) => i.id === ing.id)) {
      setSelectedIngredients(
        selectedIngredients.filter((i) => i.id !== ing.id),
      );
    } else if (selectedIngredients.length < 3) {
      setSelectedIngredients([...selectedIngredients, ing]);
    }
  };

  if (showLanding && !currentPlayer) {
    return <LandingPage onEnter={() => setShowLanding(false)} />;
  }

  if (!currentPlayer) {
    return (
      <>
        <LoginPage
          onLogin={handleLogin}
          onRegister={handleRegister}
          onBackToHome={() => setShowLanding(true)}
        />
        {errorMessage && (
          <ErrorModal
            message={errorMessage}
            onClose={() => setErrorMessage(null)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <LaboratoryPage
        player={currentPlayer}
        potions={potions}
        selectedIngredients={selectedIngredients}
        isBrewing={isBrewing}
        editingPotion={editingPotion}
        onLogout={handleLogout}
        onToggleIngredient={toggleIngredient}
        onBrew={handleBrew}
        onDeletePotion={handleDeletePotion}
        onStartEdit={setEditingPotion}
        onCancelEdit={() => setEditingPotion(null)}
        onUpdatePotion={handleUpdatePotion}
        onEditPotionChange={setEditingPotion}
        onGoToForest={() => setIsForestOpen(true)}
        onSellPotion={handleSellPotion}
        onOpenShop={() => setIsShopOpen(true)}
        onGoToLair={() => setIsLairOpen(true)}
      />
      {isForestOpen && (
        <MagicForest
          player={currentPlayer}
          onClose={() => setIsForestOpen(false)}
          onGather={handleGather}
        />
      )}
      {isShopOpen && (
        <ShopModal
          player={currentPlayer}
          onPurchase={handlePurchase}
          onClose={() => setIsShopOpen(false)}
        />
      )}
      {isLairOpen && (
        <CombatArena
          player={currentPlayer}
          playerHp={combatPlayerHp}
          setPlayerHp={setCombatPlayerHp}
          potions={potions}
          onClose={() => {
            setIsLairOpen(false);
            setCombatPlayerHp(100); // Reset for next battle when leaving
          }}
          onVictory={handleLairVictory}
          onUsePotion={calculatePotionCombatEffect}
          onConsumePotion={handleConsumePotion}
        />
      )}
      {confirmState.isOpen && (
        <ConfirmModal
          title={confirmState.title}
          message={confirmState.message}
          type={confirmState.type}
          confirmLabel="Confirm"
          onConfirm={confirmState.onConfirm}
          onCancel={() =>
            setConfirmState((prev) => ({ ...prev, isOpen: false }))
          }
        />
      )}
      {errorMessage && (
        <ErrorModal
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
    </>
  );
}

export default App;
