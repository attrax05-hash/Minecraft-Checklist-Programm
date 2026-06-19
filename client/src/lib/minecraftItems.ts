// Source: Minecraft Wiki and Game Data

import imageMapping from './imageMapping.json';
import imageUrlMapping from './imageUrlMapping.json';
import englishNamesMapping from './englishNamesMapping.json';
import itemMetadata from './itemMetadata.json';

export interface MinecraftItem {
  id: string;
  name: string; // Deutscher Name
  englishName?: string; // Englischer Name
  category: 'ore' | 'ingot' | 'block' | 'tool' | 'weapon' | 'armor' | 'food' | 'material' | 'decoration' | 'redstone' | 'other';
  imageId: string; // ID für die Bildsuche
  imageUrl?: string; // Direkte URL zum Bild
  creativeOnly?: boolean; // Nur im Creative Mode verfügbar
  survivalOnly?: boolean; // Nur im Survival Mode verfügbar
  stackAmount?: number; // Maximale Stack-Größe
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
        id.includes('milk') || id.includes('egg') || id.includes('steak') || id.includes('cooked')) return 'food';
    if (id.includes('redstone') || id.includes('repeater') || id.includes('comparator') || 
        id.includes('piston') || id.includes('dispenser') || id.includes('hopper') ||
        id.includes('observer') || id.includes('target')) return 'redstone';
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
    const imageUrl = (imageUrlMapping as Record<string, string>)[imageId];
    const englishName = (englishNamesMapping as Record<string, string>)[imageId];
    const metadata = (itemMetadata as Record<string, any>)[imageId] || {};
    
    items.push({
      id: imageId,
      name: germanName as string,
      englishName: englishName,
      category: categorizeItem(imageId),
      imageId: imageId,
      imageUrl: imageUrl || `/manus-storage/${imageId}.png`,
      creativeOnly: metadata.creative_only || false,
      survivalOnly: !metadata.creative_only && metadata.creative_only !== undefined,
      stackAmount: metadata.stack_amount || 64,
    });
  });

  return items;
};

export const minecraftItems = createItemsFromMapping();

// Funktion zum Abrufen der Bild-URL
export const getItemImageUrl = (imageId: string): string => {
  const url = (imageUrlMapping as Record<string, string>)[imageId];
  return url || `/manus-storage/${imageId}.png`;
};

export function searchItems(query: string): MinecraftItem[] {
  const lowerQuery = query.toLowerCase();
  return minecraftItems.filter(
    (item) =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.englishName?.toLowerCase().includes(lowerQuery) ||
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
