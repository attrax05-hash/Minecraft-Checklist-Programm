// Detaillierte Informationen zu Minecraft-Items
export interface ItemDetails {
  id: string;
  name: string;
  location?: string; // Wo man es findet
  biomes?: string; // In welchen Biomen
  height?: string; // Höhe (Y-Koordinate)
  recipe?: string; // Herstellungsrezept
  description?: string; // Allgemeine Beschreibung
}

export const itemDetailsMap: Record<string, ItemDetails> = {
  // === ERZE ===
  'coal_ore': {
    id: 'coal_ore',
    name: 'Kohle Erz',
    location: 'Untergrund',
    biomes: 'Überall',
    height: 'Y: 0-256',
    recipe: 'Abbau mit Spitzhacke → Kohle',
    description: 'Das häufigste Erz, verwendet für Brennstoff und Farbstoff'
  },
  'iron_ore': {
    id: 'iron_ore',
    name: 'Eisenerz',
    location: 'Untergrund',
    biomes: 'Überall',
    height: 'Y: -64-72',
    recipe: 'Abbau mit Spitzhacke (mind. Stein) → Eisenerz → Ofen → Eisenbarren',
    description: 'Essentiell für Werkzeuge und Rüstung'
  },
  'deepslate_iron_ore': {
    id: 'deepslate_iron_ore',
    name: 'Tiefenschiefer Eisenerz',
    location: 'Tiefe Untergrund',
    biomes: 'Überall',
    height: 'Y: -64-0',
    recipe: 'Abbau mit Spitzhacke (mind. Stein) → Tiefenschiefer Eisenerz → Ofen → Eisenbarren',
    description: 'Tiefere Variante von Eisenerz'
  },
  'gold_ore': {
    id: 'gold_ore',
    name: 'Golderz',
    location: 'Untergrund & Nether',
    biomes: 'Überall (Oberwelt), Nether',
    height: 'Y: -64-32',
    recipe: 'Abbau mit Eisenspitzhacke → Golderz → Ofen → Goldbarren',
    description: 'Seltener als Eisen, verwendet für Verzauberungen'
  },
  'deepslate_gold_ore': {
    id: 'deepslate_gold_ore',
    name: 'Tiefenschiefer Golderz',
    location: 'Tiefe Untergrund',
    biomes: 'Überall',
    height: 'Y: -64-0',
    recipe: 'Abbau mit Eisenspitzhacke → Tiefenschiefer Golderz → Ofen → Goldbarren',
    description: 'Tiefere Variante von Golderz'
  },
  'diamond_ore': {
    id: 'diamond_ore',
    name: 'Diamanterz',
    location: 'Tiefe Untergrund',
    biomes: 'Überall',
    height: 'Y: -64 bis -16 (Peak: Y: -59)',
    recipe: 'Abbau mit Diamantspitzhacke → Diamanterz → Ofen → Diamant',
    description: 'Das wertvollste Erz, verwendet für beste Werkzeuge'
  },
  'deepslate_diamond_ore': {
    id: 'deepslate_diamond_ore',
    name: 'Tiefenschiefer Diamanterz',
    location: 'Tiefe Untergrund',
    biomes: 'Überall',
    height: 'Y: -64 bis -16',
    recipe: 'Abbau mit Diamantspitzhacke → Tiefenschiefer Diamanterz → Ofen → Diamant',
    description: 'Tiefere Variante von Diamanterz'
  },
  'emerald_ore': {
    id: 'emerald_ore',
    name: 'Smaragderz',
    location: 'Bergige Untergrund',
    biomes: 'Bergige Biome',
    height: 'Y: 4-32',
    recipe: 'Abbau mit Eisenspitzhacke → Smaragderz → Ofen → Smaragd',
    description: 'Seltenes Erz, nur in Bergen'
  },
  'deepslate_emerald_ore': {
    id: 'deepslate_emerald_ore',
    name: 'Tiefenschiefer Smaragderz',
    location: 'Tiefe Untergrund (Berge)',
    biomes: 'Bergige Biome',
    height: 'Y: -64-0',
    recipe: 'Abbau mit Eisenspitzhacke → Tiefenschiefer Smaragderz → Ofen → Smaragd',
    description: 'Tiefere Variante von Smaragderz'
  },
  'lapis_ore': {
    id: 'lapis_ore',
    name: 'Lapislazuli Erz',
    location: 'Untergrund',
    biomes: 'Überall',
    height: 'Y: -64-64',
    recipe: 'Abbau mit Spitzhacke (mind. Stein) → Lapislazuli Erz → Lapislazuli',
    description: 'Verwendet für Verzauberungen'
  },
  'deepslate_lapis_ore': {
    id: 'deepslate_lapis_ore',
    name: 'Tiefenschiefer Lapislazuli Erz',
    location: 'Tiefe Untergrund',
    biomes: 'Überall',
    height: 'Y: -64-0',
    recipe: 'Abbau mit Spitzhacke (mind. Stein) → Tiefenschiefer Lapislazuli Erz → Lapislazuli',
    description: 'Tiefere Variante von Lapislazuli Erz'
  },
  'redstone_ore': {
    id: 'redstone_ore',
    name: 'Redstone Erz',
    location: 'Tiefe Untergrund',
    biomes: 'Überall',
    height: 'Y: -64-16',
    recipe: 'Abbau mit Eisenspitzhacke → Redstone Erz → Redstone',
    description: 'Essentiell für Redstone-Schaltkreise'
  },
  'deepslate_redstone_ore': {
    id: 'deepslate_redstone_ore',
    name: 'Tiefenschiefer Redstone Erz',
    location: 'Tiefe Untergrund',
    biomes: 'Überall',
    height: 'Y: -64-0',
    recipe: 'Abbau mit Eisenspitzhacke → Tiefenschiefer Redstone Erz → Redstone',
    description: 'Tiefere Variante von Redstone Erz'
  },
  'copper_ore': {
    id: 'copper_ore',
    name: 'Kupfererz',
    location: 'Untergrund',
    biomes: 'Überall',
    height: 'Y: -16-112',
    recipe: 'Abbau mit Spitzhacke (mind. Stein) → Kupfererz → Ofen → Kupferbarren',
    description: 'Verwendet für Blitzableiter und Dekorationen'
  },
  'deepslate_copper_ore': {
    id: 'deepslate_copper_ore',
    name: 'Tiefenschiefer Kupfererz',
    location: 'Tiefe Untergrund',
    biomes: 'Überall',
    height: 'Y: -64-0',
    recipe: 'Abbau mit Spitzhacke (mind. Stein) → Tiefenschiefer Kupfererz → Ofen → Kupferbarren',
    description: 'Tiefere Variante von Kupfererz'
  },

  // === MATERIALIEN ===
  'cobblestone': {
    id: 'cobblestone',
    name: 'Bruchstein',
    location: 'Überall an der Oberfläche',
    biomes: 'Überall',
    height: 'Y: 64+',
    recipe: 'Abbau von Stein mit Spitzhacke',
    description: 'Grundmaterial für viele Blöcke'
  },
  'smooth_stone': {
    id: 'smooth_stone',
    name: 'Glatter Stein',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Bruchstein x2 → Ofen → Glatter Stein',
    description: 'Hergestelltes Material für Dekorationen'
  },
  'dirt': {
    id: 'dirt',
    name: 'Erde',
    location: 'Überall an der Oberfläche',
    biomes: 'Überall',
    height: 'Y: 62-64',
    recipe: 'Abbau mit beliebiger Spitzhacke',
    description: 'Häufigstes Material'
  },
  'grass_block': {
    id: 'grass_block',
    name: 'Grasbock',
    location: 'Überall an der Oberfläche',
    biomes: 'Überall',
    height: 'Y: 63-64',
    recipe: 'Abbau mit Spitzhacke',
    description: 'Oberflächenblock mit Gras'
  },
  'sand': {
    id: 'sand',
    name: 'Sand',
    location: 'Strände, Wüsten',
    biomes: 'Strände, Wüsten, Flüsse',
    height: 'Y: 60-64',
    recipe: 'Abbau mit Spitzhacke',
    description: 'Verwendet für Glas und Sandstein'
  },
  'gravel': {
    id: 'gravel',
    name: 'Kies',
    location: 'Untergrund, Strände',
    biomes: 'Überall',
    height: 'Y: 0-64',
    recipe: 'Abbau mit Spitzhacke (droppt Feuerstein)',
    description: 'Kann Feuerstein droppen'
  },
  'obsidian': {
    id: 'obsidian',
    name: 'Obsidian',
    location: 'Nether, Nether-Portale',
    biomes: 'Nether',
    height: 'Y: 0-128',
    recipe: 'Wasser auf Lava → Obsidian, Abbau mit Diamantspitzhacke',
    description: 'Sehr hart, verwendet für Nether-Portale'
  },

  // === HOLZ & PFLANZEN ===
  'oak_log': {
    id: 'oak_log',
    name: 'Eichenholz',
    location: 'Eichenbäume',
    biomes: 'Überall',
    height: 'Y: 62-256',
    recipe: 'Abbau von Eichenbäumen',
    description: 'Grundmaterial für Holzplanken'
  },
  'birch_log': {
    id: 'birch_log',
    name: 'Birkenholz',
    location: 'Birkenbäume',
    biomes: 'Birkenwald',
    height: 'Y: 62-256',
    recipe: 'Abbau von Birkenbäumen',
    description: 'Helles Holz'
  },
  'spruce_log': {
    id: 'spruce_log',
    name: 'Fichtenholz',
    location: 'Fichtenbäume',
    biomes: 'Taiga, Schneewald',
    height: 'Y: 62-256',
    recipe: 'Abbau von Fichtenbäumen',
    description: 'Dunkles Holz'
  },
  'oak_leaves': {
    id: 'oak_leaves',
    name: 'Eichenlaub',
    location: 'Eichenbäume',
    biomes: 'Überall',
    height: 'Y: 62-256',
    recipe: 'Abbau von Eichenbäumen (mit Glück)',
    description: 'Kann Setzlinge droppen'
  },

  // === INGOTS & GEMS ===
  'iron_ingot': {
    id: 'iron_ingot',
    name: 'Eisenbarren',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Eisenerz → Ofen → Eisenbarren',
    description: 'Essentiell für Werkzeuge und Rüstung'
  },
  'gold_ingot': {
    id: 'gold_ingot',
    name: 'Goldbarren',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Golderz → Ofen → Goldbarren',
    description: 'Verwendet für Verzauberungen'
  },
  'diamond': {
    id: 'diamond',
    name: 'Diamant',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Diamanterz → Ofen → Diamant',
    description: 'Das wertvollste Material'
  },
  'emerald': {
    id: 'emerald',
    name: 'Smaragd',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Smaragderz → Ofen → Smaragd',
    description: 'Verwendet für Handel mit Dorfbewohnern'
  },

  // === WERKZEUGE ===
  'wooden_pickaxe': {
    id: 'wooden_pickaxe',
    name: 'Holzspitzhacke',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Holzplanken x3 + Stöcke x2 → Crafting Table → Holzspitzhacke',
    description: 'Erstes Werkzeug zum Abbau von Stein'
  },
  'stone_pickaxe': {
    id: 'stone_pickaxe',
    name: 'Steinspitzhacke',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Bruchstein x3 + Stöcke x2 → Crafting Table → Steinspitzhacke',
    description: 'Kann Eisenerz abbauen'
  },
  'iron_pickaxe': {
    id: 'iron_pickaxe',
    name: 'Eisenspitzhacke',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Eisenbarren x3 + Stöcke x2 → Crafting Table → Eisenspitzhacke',
    description: 'Kann Gold- und Diamanterz abbauen'
  },
  'diamond_pickaxe': {
    id: 'diamond_pickaxe',
    name: 'Diamantspitzhacke',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Diamanten x3 + Stöcke x2 → Crafting Table → Diamantspitzhacke',
    description: 'Das beste Werkzeug'
  },

  // === RÜSTUNG ===
  'iron_helmet': {
    id: 'iron_helmet',
    name: 'Eisenhelm',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Eisenbarren x5 → Crafting Table → Eisenhelm',
    description: 'Kopfschutz'
  },
  'iron_chestplate': {
    id: 'iron_chestplate',
    name: 'Eisenbrustpanzer',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Eisenbarren x8 → Crafting Table → Eisenbrustpanzer',
    description: 'Oberkörperschutz'
  },
  'iron_leggings': {
    id: 'iron_leggings',
    name: 'Eisenbeinschienen',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Eisenbarren x7 → Crafting Table → Eisenbeinschienen',
    description: 'Beinschutz'
  },
  'iron_boots': {
    id: 'iron_boots',
    name: 'Eisenstiefel',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Eisenbarren x4 → Crafting Table → Eisenstiefel',
    description: 'Fußschutz'
  },
  'diamond_helmet': {
    id: 'diamond_helmet',
    name: 'Diamanthelm',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Diamanten x5 → Crafting Table → Diamanthelm',
    description: 'Bester Kopfschutz'
  },
  'diamond_chestplate': {
    id: 'diamond_chestplate',
    name: 'Diamantbrustpanzer',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Diamanten x8 → Crafting Table → Diamantbrustpanzer',
    description: 'Bester Oberkörperschutz'
  },
  'diamond_leggings': {
    id: 'diamond_leggings',
    name: 'Diamantbeinschienen',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Diamanten x7 → Crafting Table → Diamantbeinschienen',
    description: 'Bester Beinschutz'
  },
  'diamond_boots': {
    id: 'diamond_boots',
    name: 'Diamantstiefel',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Diamanten x4 → Crafting Table → Diamantstiefel',
    description: 'Bester Fußschutz'
  },

  // === WAFFEN ===
  'wooden_sword': {
    id: 'wooden_sword',
    name: 'Holzschwert',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Holzplanken x2 + Stöcke x1 → Crafting Table → Holzschwert',
    description: 'Schwaches Schwert'
  },
  'stone_sword': {
    id: 'stone_sword',
    name: 'Steinschwert',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Bruchstein x2 + Stöcke x1 → Crafting Table → Steinschwert',
    description: 'Besseres Schwert'
  },
  'iron_sword': {
    id: 'iron_sword',
    name: 'Eisenschwert',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Eisenbarren x2 + Stöcke x1 → Crafting Table → Eisenschwert',
    description: 'Gutes Schwert'
  },
  'diamond_sword': {
    id: 'diamond_sword',
    name: 'Diamantschwert',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Diamanten x2 + Stöcke x1 → Crafting Table → Diamantschwert',
    description: 'Bestes Schwert'
  },

  // === ESSEN ===
  'apple': {
    id: 'apple',
    name: 'Apfel',
    location: 'Eichenbäume (Laub)',
    biomes: 'Überall',
    height: 'Y: 62-256',
    recipe: 'Abbau von Eichenlaub',
    description: 'Heilt 4 Hunger'
  },
  'bread': {
    id: 'bread',
    name: 'Brot',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Weizen x3 → Crafting Table → Brot',
    description: 'Heilt 5 Hunger'
  },
  'cooked_beef': {
    id: 'cooked_beef',
    name: 'Gekochtes Rindfleisch',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Rohes Rindfleisch → Ofen → Gekochtes Rindfleisch',
    description: 'Heilt 8 Hunger'
  },
  'cooked_chicken': {
    id: 'cooked_chicken',
    name: 'Gekochtes Hähnchen',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Rohes Hähnchen → Ofen → Gekochtes Hähnchen',
    description: 'Heilt 6 Hunger'
  },

  // === MATERIALIEN ===
  'stick': {
    id: 'stick',
    name: 'Stab',
    location: 'Nicht natürlich vorhanden',
    biomes: '-',
    height: '-',
    recipe: 'Holzplanken x2 → Crafting Table → Stäbe x4',
    description: 'Essentiell für viele Rezepte'
  },
  'string': {
    id: 'string',
    name: 'Faden',
    location: 'Spinnen droppen',
    biomes: 'Überall',
    height: 'Y: 0-256',
    recipe: 'Spinnen töten → Faden',
    description: 'Verwendet für Bögen und Wolle'
  },
  'leather': {
    id: 'leather',
    name: 'Leder',
    location: 'Kühe, Pferde, Lamas droppen',
    biomes: 'Überall',
    height: 'Y: 0-256',
    recipe: 'Kühe töten → Leder',
    description: 'Verwendet für Lederrüstung'
  },
  'feather': {
    id: 'feather',
    name: 'Feder',
    location: 'Hühner droppen',
    biomes: 'Überall',
    height: 'Y: 0-256',
    recipe: 'Hühner töten → Feder',
    description: 'Verwendet für Pfeile'
  },
  'gunpowder': {
    id: 'gunpowder',
    name: 'Schießpulver',
    location: 'Creeper droppen',
    biomes: 'Überall',
    height: 'Y: 0-256',
    recipe: 'Creeper töten → Schießpulver',
    description: 'Verwendet für TNT und Feuerwerk'
  },
  'flint': {
    id: 'flint',
    name: 'Feuerstein',
    location: 'Kies abbau',
    biomes: 'Überall',
    height: 'Y: 0-64',
    recipe: 'Kies abbau (10% Chance) → Feuerstein',
    description: 'Verwendet für Feuerzeug'
  },
};

export const getItemDetails = (itemId: string): ItemDetails | undefined => {
  // Versuche zuerst die exakte ID
  if (itemDetailsMap[itemId]) {
    return itemDetailsMap[itemId];
  }

  // Fallback: Suche nach ähnlichen IDs
  // z.B. wenn "deepslate_diamond_ore" nicht gefunden wird, suche nach "diamond_ore"
  const baseName = itemId.replace(/^deepslate_/, '').replace(/^raw_/, '');
  if (baseName !== itemId && itemDetailsMap[baseName]) {
    return itemDetailsMap[baseName];
  }

  // Weitere Fallback-Versuche
  const variants = [
    itemId.replace(/^deepslate_/, ''),
    itemId.replace(/^raw_/, ''),
    itemId.replace(/_ore$/, ''),
    itemId.replace(/_block$/, ''),
  ];

  for (const variant of variants) {
    if (itemDetailsMap[variant]) {
      return itemDetailsMap[variant];
    }
  }

  return undefined;
};
