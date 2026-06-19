// Minecraft Items Database with icons and names
// Source: Minecraft Wiki and Game Data

export interface MinecraftItem {
  id: string;
  name: string;
  category: 'ore' | 'ingot' | 'block' | 'tool' | 'weapon' | 'armor' | 'food' | 'material' | 'decoration' | 'other';
  icon: string; // Unicode emoji or icon representation
}

export const minecraftItems: MinecraftItem[] = [
  // Ores
  { id: 'coal_ore', name: 'Kohle', category: 'ore', icon: '⬛' },
  { id: 'iron_ore', name: 'Eisenerz', category: 'ore', icon: '🟫' },
  { id: 'gold_ore', name: 'Golderz', category: 'ore', icon: '🟨' },
  { id: 'diamond_ore', name: 'Diamanterz', category: 'ore', icon: '🔷' },
  { id: 'emerald_ore', name: 'Smaragderz', category: 'ore', icon: '🟢' },
  { id: 'lapis_ore', name: 'Lapislazuli-Erz', category: 'ore', icon: '🔵' },
  { id: 'redstone_ore', name: 'Redstone-Erz', category: 'ore', icon: '🔴' },
  { id: 'copper_ore', name: 'Kupfererz', category: 'ore', icon: '🟠' },

  // Ingots & Gems
  { id: 'coal', name: 'Kohle', category: 'material', icon: '◼️' },
  { id: 'iron_ingot', name: 'Eisenbarren', category: 'ingot', icon: '⚪' },
  { id: 'gold_ingot', name: 'Goldbarren', category: 'ingot', icon: '🟡' },
  { id: 'diamond', name: 'Diamant', category: 'ingot', icon: '💎' },
  { id: 'emerald', name: 'Smaragd', category: 'ingot', icon: '💚' },
  { id: 'copper_ingot', name: 'Kupferbarren', category: 'ingot', icon: '🧡' },
  { id: 'netherite_ingot', name: 'Netherit-Barren', category: 'ingot', icon: '🖤' },

  // Blocks
  { id: 'dirt', name: 'Erde', category: 'block', icon: '🟫' },
  { id: 'grass_block', name: 'Grasblock', category: 'block', icon: '🟩' },
  { id: 'stone', name: 'Stein', category: 'block', icon: '⬜' },
  { id: 'cobblestone', name: 'Kopfsteinpflaster', category: 'block', icon: '🪨' },
  { id: 'oak_wood', name: 'Eichenholz', category: 'block', icon: '🪵' },
  { id: 'spruce_wood', name: 'Fichtenholz', category: 'block', icon: '🟤' },
  { id: 'birch_wood', name: 'Birkenholz', category: 'block', icon: '🟨' },
  { id: 'jungle_wood', name: 'Dschungelholz', category: 'block', icon: '🟫' },
  { id: 'acacia_wood', name: 'Akazienholz', category: 'block', icon: '🧡' },
  { id: 'dark_oak_wood', name: 'Dunkeleiches Holz', category: 'block', icon: '🟤' },
  { id: 'sand', name: 'Sand', category: 'block', icon: '🟨' },
  { id: 'gravel', name: 'Kies', category: 'block', icon: '⬜' },
  { id: 'glass', name: 'Glas', category: 'block', icon: '🟦' },
  { id: 'obsidian', name: 'Obsidian', category: 'block', icon: '🟪' },
  { id: 'netherrack', name: 'Netherrack', category: 'block', icon: '🔴' },
  { id: 'end_stone', name: 'Endstein', category: 'block', icon: '🟩' },

  // Tools
  { id: 'wooden_pickaxe', name: 'Holzspitzhacke', category: 'tool', icon: '⛏️' },
  { id: 'stone_pickaxe', name: 'Steinspitzhacke', category: 'tool', icon: '⛏️' },
  { id: 'iron_pickaxe', name: 'Eisenspitzhacke', category: 'tool', icon: '⛏️' },
  { id: 'gold_pickaxe', name: 'Goldspitzhacke', category: 'tool', icon: '⛏️' },
  { id: 'diamond_pickaxe', name: 'Diamantspitzhacke', category: 'tool', icon: '⛏️' },
  { id: 'netherite_pickaxe', name: 'Netherit-Spitzhacke', category: 'tool', icon: '⛏️' },
  { id: 'wooden_axe', name: 'Holzaxt', category: 'tool', icon: '🪓' },
  { id: 'stone_axe', name: 'Steinaxt', category: 'tool', icon: '🪓' },
  { id: 'iron_axe', name: 'Eisenaxt', category: 'tool', icon: '🪓' },
  { id: 'golden_axe', name: 'Goldaxt', category: 'tool', icon: '🪓' },
  { id: 'diamond_axe', name: 'Diamantaxt', category: 'tool', icon: '🪓' },
  { id: 'netherite_axe', name: 'Netherit-Axt', category: 'tool', icon: '🪓' },
  { id: 'wooden_shovel', name: 'Holzschaufel', category: 'tool', icon: '🔨' },
  { id: 'stone_shovel', name: 'Steinschaufel', category: 'tool', icon: '🔨' },
  { id: 'iron_shovel', name: 'Eisenschaufel', category: 'tool', icon: '🔨' },
  { id: 'golden_shovel', name: 'Goldschaufel', category: 'tool', icon: '🔨' },
  { id: 'diamond_shovel', name: 'Diamantschaufel', category: 'tool', icon: '🔨' },
  { id: 'netherite_shovel', name: 'Netherit-Schaufel', category: 'tool', icon: '🔨' },

  // Weapons
  { id: 'wooden_sword', name: 'Holzschwert', category: 'weapon', icon: '⚔️' },
  { id: 'stone_sword', name: 'Steinschwert', category: 'weapon', icon: '⚔️' },
  { id: 'iron_sword', name: 'Eisenschwert', category: 'weapon', icon: '⚔️' },
  { id: 'golden_sword', name: 'Goldschwert', category: 'weapon', icon: '⚔️' },
  { id: 'diamond_sword', name: 'Diamantschwert', category: 'weapon', icon: '⚔️' },
  { id: 'netherite_sword', name: 'Netherit-Schwert', category: 'weapon', icon: '⚔️' },
  { id: 'bow', name: 'Bogen', category: 'weapon', icon: '🏹' },
  { id: 'arrow', name: 'Pfeil', category: 'weapon', icon: '➡️' },
  { id: 'trident', name: 'Dreizack', category: 'weapon', icon: '🔱' },

  // Armor
  { id: 'leather_helmet', name: 'Lederhelm', category: 'armor', icon: '🎩' },
  { id: 'iron_helmet', name: 'Eisenhelm', category: 'armor', icon: '🎩' },
  { id: 'golden_helmet', name: 'Goldhelm', category: 'armor', icon: '🎩' },
  { id: 'diamond_helmet', name: 'Diamanthelm', category: 'armor', icon: '🎩' },
  { id: 'netherite_helmet', name: 'Netherit-Helm', category: 'armor', icon: '🎩' },
  { id: 'leather_chestplate', name: 'Lederpanzer', category: 'armor', icon: '🦺' },
  { id: 'iron_chestplate', name: 'Eisenpanzer', category: 'armor', icon: '🦺' },
  { id: 'golden_chestplate', name: 'Goldpanzer', category: 'armor', icon: '🦺' },
  { id: 'diamond_chestplate', name: 'Diamantpanzer', category: 'armor', icon: '🦺' },
  { id: 'netherite_chestplate', name: 'Netherit-Panzer', category: 'armor', icon: '🦺' },
  { id: 'leather_leggings', name: 'Lederhose', category: 'armor', icon: '👖' },
  { id: 'iron_leggings', name: 'Eisenhose', category: 'armor', icon: '👖' },
  { id: 'golden_leggings', name: 'Goldhose', category: 'armor', icon: '👖' },
  { id: 'diamond_leggings', name: 'Diamanthose', category: 'armor', icon: '👖' },
  { id: 'netherite_leggings', name: 'Netherit-Hose', category: 'armor', icon: '👖' },
  { id: 'leather_boots', name: 'Lederstiefel', category: 'armor', icon: '👢' },
  { id: 'iron_boots', name: 'Eisenstiefel', category: 'armor', icon: '👢' },
  { id: 'golden_boots', name: 'Goldstiefe', category: 'armor', icon: '👢' },
  { id: 'diamond_boots', name: 'Diamantstiefel', category: 'armor', icon: '👢' },
  { id: 'netherite_boots', name: 'Netherit-Stiefel', category: 'armor', icon: '👢' },

  // Food
  { id: 'apple', name: 'Apfel', category: 'food', icon: '🍎' },
  { id: 'golden_apple', name: 'Goldener Apfel', category: 'food', icon: '🍎' },
  { id: 'bread', name: 'Brot', category: 'food', icon: '🍞' },
  { id: 'cooked_beef', name: 'Gebratenes Rindfleisch', category: 'food', icon: '🥩' },
  { id: 'cooked_pork', name: 'Gebratenes Schweinefleisch', category: 'food', icon: '🥓' },
  { id: 'cooked_chicken', name: 'Gebratenes Huhn', category: 'food', icon: '🍗' },
  { id: 'cooked_fish', name: 'Gebratener Fisch', category: 'food', icon: '🐟' },
  { id: 'cooked_salmon', name: 'Gebratener Lachs', category: 'food', icon: '🐠' },
  { id: 'carrot', name: 'Karotte', category: 'food', icon: '🥕' },
  { id: 'potato', name: 'Kartoffel', category: 'food', icon: '🥔' },
  { id: 'baked_potato', name: 'Gebackene Kartoffel', category: 'food', icon: '🥔' },
  { id: 'melon', name: 'Melone', category: 'food', icon: '🍈' },
  { id: 'pumpkin', name: 'Kürbis', category: 'food', icon: '🎃' },
  { id: 'cake', name: 'Kuchen', category: 'food', icon: '🍰' },
  { id: 'cookie', name: 'Keks', category: 'food', icon: '🍪' },
  { id: 'milk_bucket', name: 'Milcheimer', category: 'food', icon: '🥛' },

  // Materials & Crafting
  { id: 'stick', name: 'Stock', category: 'material', icon: '🪵' },
  { id: 'string', name: 'Faden', category: 'material', icon: '🧵' },
  { id: 'leather', name: 'Leder', category: 'material', icon: '🧥' },
  { id: 'feather', name: 'Feder', category: 'material', icon: '🪶' },
  { id: 'gunpowder', name: 'Schießpulver', category: 'material', icon: '💥' },
  { id: 'flint', name: 'Feuerstein', category: 'material', icon: '⚪' },
  { id: 'paper', name: 'Papier', category: 'material', icon: '📄' },
  { id: 'book', name: 'Buch', category: 'material', icon: '📖' },
  { id: 'slimeball', name: 'Schleimball', category: 'material', icon: '💚' },
  { id: 'egg', name: 'Ei', category: 'material', icon: '🥚' },
  { id: 'ender_pearl', name: 'Enderperle', category: 'material', icon: '🟪' },
  { id: 'blaze_rod', name: 'Lohestab', category: 'material', icon: '🔥' },
  { id: 'ender_eye', name: 'Enderauge', category: 'material', icon: '👁️' },

  // Decoration & Other
  { id: 'crafting_table', name: 'Handwerkstisch', category: 'decoration', icon: '📦' },
  { id: 'furnace', name: 'Ofen', category: 'decoration', icon: '🔥' },
  { id: 'chest', name: 'Truhe', category: 'decoration', icon: '📦' },
  { id: 'bed', name: 'Bett', category: 'decoration', icon: '🛏️' },
  { id: 'door', name: 'Tür', category: 'decoration', icon: '🚪' },
  { id: 'fence', name: 'Zaun', category: 'decoration', icon: '🚧' },
  { id: 'ladder', name: 'Leiter', category: 'decoration', icon: '🪜' },
  { id: 'torch', name: 'Fackel', category: 'decoration', icon: '🔦' },
  { id: 'lantern', name: 'Laterne', category: 'decoration', icon: '🏮' },
  { id: 'enchanting_table', name: 'Verzauberungstisch', category: 'decoration', icon: '📚' },
  { id: 'anvil', name: 'Amboss', category: 'decoration', icon: '🔨' },
  { id: 'brewing_stand', name: 'Brauständer', category: 'decoration', icon: '🧪' },
  { id: 'cauldron', name: 'Kessel', category: 'decoration', icon: '🍲' },
  { id: 'beacon', name: 'Leuchtfeuer', category: 'decoration', icon: '✨' },
  { id: 'end_portal_frame', name: 'End-Portal-Rahmen', category: 'decoration', icon: '🟪' },
];

export function searchItems(query: string): MinecraftItem[] {
  const lowerQuery = query.toLowerCase();
  return minecraftItems.filter(
    (item) =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.id.toLowerCase().includes(lowerQuery)
  );
}

export function getItemsByCategory(category: MinecraftItem['category']): MinecraftItem[] {
  return minecraftItems.filter((item) => item.category === category);
}

export function getCategories(): MinecraftItem['category'][] {
  const categories = new Set(minecraftItems.map((item) => item.category));
  return Array.from(categories);
}
