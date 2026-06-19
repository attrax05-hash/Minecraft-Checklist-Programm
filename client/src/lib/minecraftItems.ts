// Minecraft Items Database with real PNG icons from texture pack
// Source: Minecraft Wiki and Game Data

import imageMapping from './imageMapping.json';

export interface MinecraftItem {
  id: string;
  name: string;
  category: 'ore' | 'ingot' | 'block' | 'tool' | 'weapon' | 'armor' | 'food' | 'material' | 'decoration' | 'other';
  imageId: string; // ID für die Bildsuche
}

// Erstelle Items aus dem Image-Mapping
const createItemsFromMapping = (): MinecraftItem[] => {
  const items: MinecraftItem[] = [];
  const categoryMap: Record<string, MinecraftItem['category']> = {};

  // Kategorisiere Items basierend auf Schlüsselwörtern
  const categorizeItem = (id: string): MinecraftItem['category'] => {
    if (id.includes('ore')) return 'ore';
    if (id.includes('ingot') || id.includes('gem') || id.includes('diamond') || id.includes('emerald')) return 'ingot';
    if (id.includes('pickaxe') || id.includes('axe') || id.includes('shovel') || id.includes('hoe')) return 'tool';
    if (id.includes('sword') || id.includes('bow') || id.includes('arrow') || id.includes('trident')) return 'weapon';
    if (id.includes('helmet') || id.includes('chestplate') || id.includes('leggings') || id.includes('boots')) return 'armor';
    if (id.includes('apple') || id.includes('bread') || id.includes('beef') || id.includes('pork') || 
        id.includes('chicken') || id.includes('fish') || id.includes('carrot') || id.includes('potato') ||
        id.includes('melon') || id.includes('pumpkin') || id.includes('cake') || id.includes('cookie') ||
        id.includes('milk') || id.includes('egg')) return 'food';
    if (id.includes('crafting_table') || id.includes('furnace') || id.includes('enchanting') || 
        id.includes('anvil') || id.includes('brewing') || id.includes('cauldron') ||
        id.includes('torch') || id.includes('lantern') || id.includes('candle') || id.includes('bed') ||
        id.includes('chest') || id.includes('door') || id.includes('fence') || id.includes('ladder')) return 'decoration';
    if (id.includes('stick') || id.includes('string') || id.includes('leather') || id.includes('feather') ||
        id.includes('gunpowder') || id.includes('flint') || id.includes('paper') || id.includes('book') ||
        id.includes('slimeball') || id.includes('ender_pearl') || id.includes('blaze_rod')) return 'material';
    if (id.includes('block') || id.includes('stone') || id.includes('dirt') || id.includes('grass') ||
        id.includes('sand') || id.includes('gravel') || id.includes('glass') || id.includes('obsidian') ||
        id.includes('wood') || id.includes('log') || id.includes('planks') || id.includes('leaves')) return 'block';
    
    return 'other';
  };

  // Erstelle Items aus dem Mapping
  Object.entries(imageMapping).forEach(([imageId, germanName]) => {
    items.push({
      id: imageId,
      name: germanName as string,
      category: categorizeItem(imageId),
      imageId: imageId,
    });
  });

  return items;
};

export const minecraftItems = createItemsFromMapping();

// Funktion zum Abrufen der Bild-URL
export const getItemImageUrl = (imageId: string): string => {
  // Verwende die statischen Assets
  return `/manus-storage/minecraft-blocks/${imageId}.png`;
};

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

export function getItemById(id: string): MinecraftItem | undefined {
  return minecraftItems.find((item) => item.id === id);
}
