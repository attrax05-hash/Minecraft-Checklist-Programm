'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Plus, Search, Download, Trash2, Info } from 'lucide-react';
import { minecraftItems, searchItems, getItemImageUrl } from '@/lib/minecraftItems';
import type { MinecraftItem } from '@/lib/minecraftItems';
import { getItemDetails } from '@/lib/itemDetails';
import { toast } from 'sonner';

interface ChecklistItem extends Omit<MinecraftItem, 'id'> {
  id: string; // Eindeutige ID für den Listeneintrag
  itemId: string; // Original Minecraft Item ID (für Lookups)
  stacks: number; // Anzahl der Stacks (à 64)
  items: number; // Einzelne Items
  checked: boolean;
}

const STORAGE_KEY = 'minecraft-checklist-data';
const STACK_SIZE = 64;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [stacks, setStacks] = useState(0);
  const [items, setItems] = useState(1);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MinecraftItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [infoItem, setInfoItem] = useState<MinecraftItem | null>(null);

  // Lade Checkliste aus localStorage beim Start
  useEffect(() => {
    const savedChecklist = localStorage.getItem(STORAGE_KEY);
    if (savedChecklist) {
      try {
        const parsed = JSON.parse(savedChecklist);
        setChecklist(parsed);
      } catch (error) {
        console.error('Fehler beim Laden der Checkliste:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Speichere Checkliste in localStorage wenn sie sich ändert
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checklist));
    }
  }, [checklist, isLoading]);

  const searchResults = searchQuery.trim() ? searchItems(searchQuery) : [];

  const handleSelectItem = (item: MinecraftItem) => {
    setSelectedItem(item);
    setSearchQuery('');
  };

  const handleAddToChecklist = () => {
    if (!selectedItem) return;

    // Nur hinzufügen wenn mindestens Stacks oder Items > 0
    if (stacks === 0 && items === 0) {
      toast.error('Bitte geben Sie eine Menge ein');
      return;
    }

    const newItem: ChecklistItem = {
      ...selectedItem,
      id: `${selectedItem.id}-${Date.now()}`,
      itemId: selectedItem.id,
      stacks,
      items,
      checked: false,
    };

    setChecklist([...checklist, newItem]);
    toast.success(`${selectedItem.name} zur Liste hinzugefügt`);
    setSelectedItem(null);
    setStacks(0);
    setItems(1);
  };

  const handleToggleItem = (id: string) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setChecklist(checklist.filter((item) => item.id !== id));
    toast.success('Item entfernt');
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(checklist, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `minecraft-checklist-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Als JSON exportiert');
  };

  const handleExportText = () => {
    const text = checklist
      .map((item) => {
        const stacks_text = item.stacks > 0 ? `${item.stacks} Stacks` : '';
        const items_text = item.items > 0 ? `${item.items} Items` : '';
        const amount = [stacks_text, items_text].filter(Boolean).join(' + ') || '1';
        const status = item.checked ? '✓' : '☐';
        return `${status} ${item.name} - ${amount}`;
      })
      .join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `minecraft-checklist-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Als Text exportiert');
  };

  const completedCount = checklist.filter((item) => item.checked).length;
  const totalCount = checklist.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const popularItems = minecraftItems.slice(0, 8);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-4">
      {/* Header */}
      <div className="mb-6 border-b-4 border-[#FFD700] pb-4">
        <h1 className="text-4xl font-bold text-[#4CAF50] flex items-center gap-2">
          <span>⛏️</span>
          MINECRAFT CHECKLIST
        </h1>
        <p className="text-[#FFD700] mt-2">
          {completedCount} / {totalCount} erledigt
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Linke Spalte: Item Suche */}
        <div className="border-4 border-[#8B7355] rounded-lg p-6 bg-[#2a2a2a]">
          <h2 className="text-2xl font-bold text-[#4CAF50] mb-4">ITEM SUCHEN</h2>

          {/* Suchleiste */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-[#4CAF50]" />
              <Input
                placeholder="Suche Items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-2 border-[#4CAF50] bg-[#1a1a1a] text-white placeholder-[#666]"
              />
            </div>
          </div>

          {/* Beliebte Items */}
          <div className="mb-6">
            <p className="text-[#FFD700] font-bold mb-3">BELIEBTE ITEMS:</p>
            <div className="grid grid-cols-4 gap-2">
              {popularItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  className="h-16 w-16 bg-[#1a1a1a] border-2 border-[#4CAF50] rounded hover:border-[#FFD700] hover:bg-[#2a2a2a] transition-all flex items-center justify-center"
                  title={item.name}
                >
                  <img
                    src={item.imageUrl || getItemImageUrl(item.id)}
                    alt={item.name}
                    className="h-14 w-14 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Suchergebnisse */}
          {searchQuery && (
            <div className="space-y-2">
              {searchResults.slice(0, 10).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  className="w-full flex items-center gap-3 p-2 bg-[#1a1a1a] border border-[#4CAF50] rounded hover:bg-[#2a2a2a] text-left"
                >
                  <img
                    src={item.imageUrl || getItemImageUrl(item.id)}
                    alt={item.name}
                    className="h-8 w-8 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <span className="text-[#4CAF50]">{item.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Item Details */}
          {selectedItem && (
            <div className="mt-6 p-4 bg-[#1a1a1a] border-2 border-[#4CAF50] rounded">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={selectedItem.imageUrl || getItemImageUrl(selectedItem.id)}
                  alt={selectedItem.name}
                  className="h-12 w-12 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div>
                  <h3 className="text-lg font-bold text-[#4CAF50]">{selectedItem.name}</h3>
                  <p className="text-sm text-[#b0b0b0]">{selectedItem.category}</p>
                </div>
              </div>

              {/* Stacks und Items Eingabe */}
              <div className="space-y-3">
                <div>
                  <label className="text-[#FFD700] text-sm font-bold">Stacks (à 64):</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Button
                      onClick={() => setStacks(Math.max(0, stacks - 1))}
                      className="h-8 w-8 p-0 bg-[#4CAF50] hover:bg-[#45a049]"
                    >
                      −
                    </Button>
                    <Input
                      type="number"
                      value={stacks}
                      onChange={(e) => setStacks(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-16 text-center border border-[#4CAF50] bg-[#2a2a2a] text-white"
                    />
                    <Button
                      onClick={() => setStacks(stacks + 1)}
                      className="h-8 w-8 p-0 bg-[#4CAF50] hover:bg-[#45a049]"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-[#FFD700] text-sm font-bold">Einzelne Items:</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Button
                      onClick={() => setItems(Math.max(0, items - 1))}
                      className="h-8 w-8 p-0 bg-[#4CAF50] hover:bg-[#45a049]"
                    >
                      −
                    </Button>
                    <Input
                      type="number"
                      value={items}
                      onChange={(e) => setItems(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-16 text-center border border-[#4CAF50] bg-[#2a2a2a] text-white"
                    />
                    <Button
                      onClick={() => setItems(items + 1)}
                      className="h-8 w-8 p-0 bg-[#4CAF50] hover:bg-[#45a049]"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  onClick={handleAddToChecklist}
                  className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white font-bold"
                >
                  ZUR LISTE HINZUFÜGEN
                </Button>
                <Button
                  onClick={() => {
                    setSelectedItem(null);
                    setStacks(0);
                    setItems(1);
                  }}
                  className="h-10 w-10 p-0 bg-[#8B4513] hover:bg-[#6B3410] text-white"
                  title="Schließen"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Rechte Spalte: Checkliste */}
        <div className="border-4 border-[#8B7355] rounded-lg p-6 bg-[#2a2a2a]">
          <h2 className="text-2xl font-bold text-[#4CAF50] mb-4">DEINE CHECKLISTE</h2>

          {/* Fortschrittsbalken */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#FFD700]">FORTSCHRITT</span>
              <span className="text-[#4CAF50]">{progress}%</span>
            </div>
            <div className="w-full h-4 bg-[#1a1a1a] border-2 border-[#4CAF50] rounded overflow-hidden">
              <div
                className="h-full bg-[#4CAF50] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Export Buttons */}
          <div className="flex gap-2 mb-6">
            <Button
              onClick={handleExportJSON}
              className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white text-sm"
              title="Als JSON exportieren"
            >
              <Download className="h-4 w-4 mr-1" />
              JSON
            </Button>
            <Button
              onClick={handleExportText}
              className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white text-sm"
              title="Als Text exportieren"
            >
              <Download className="h-4 w-4 mr-1" />
              Text
            </Button>
          </div>

          {/* Checkliste Items */}
          {totalCount === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-[#4CAF50] rounded">
              <p className="text-[#b0b0b0]">Keine Items in deiner Liste.</p>
              <p className="text-[#b0b0b0]">Suche nach Items und füge sie hinzu!</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {checklist.map((item) => {
                const stacks_text = item.stacks > 0 ? `${item.stacks} Stacks` : '';
                const items_text = item.items > 0 ? `${item.items}` : '';
                const amount = [stacks_text, items_text].filter(Boolean).join(' + ') || '1';

                return (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 p-3 rounded border-2 ${
                      item.checked
                        ? 'border-[#666] bg-[#1a1a1a] opacity-60'
                        : 'border-[#4CAF50] bg-[#1a1a1a]'
                    }`}
                  >
                    <Checkbox
                      checked={item.checked}
                      onChange={() => handleToggleItem(item.id)}
                      className="h-5 w-5"
                    />
                    <img
                      src={item.imageUrl || getItemImageUrl(item.itemId)}
                      alt={item.name}
                      className="h-8 w-8 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="flex-1">
                      <p className={`font-bold ${item.checked ? 'line-through text-[#666]' : 'text-[#4CAF50]'}`}>
                        {item.name}
                      </p>
                      <p className="text-xs text-[#b0b0b0]">{amount}</p>
                    </div>
                    <Button
                      onClick={() => setInfoItem(item)}
                      className="h-8 w-8 p-0 bg-[#FFD700] hover:bg-[#FFC700] text-black"
                      title="Info anzeigen"
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleRemoveItem(item.id)}
                      className="h-8 w-8 p-0 bg-[#FF6B35] hover:bg-[#FF5722] text-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Info Modal */}
      {infoItem && (() => {
        const itemIdForLookup = (infoItem as any).itemId || infoItem.id;
        const details = getItemDetails(itemIdForLookup);
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <Card className="border-4 border-[#8B7355] bg-[#2a2a2a] p-6 shadow-2xl max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={infoItem.imageUrl || getItemImageUrl(infoItem.id)}
                    alt={infoItem.name}
                    className="h-16 w-16 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-[#4CAF50]">{infoItem.name}</h2>
                    <p className="text-sm text-[#b0b0b0]">{infoItem.category.toUpperCase()}</p>
                  </div>
                </div>
                <Button
                  onClick={() => setInfoItem(null)}
                  className="h-8 w-8 border-2 border-[#FF6B35] bg-transparent p-0 text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {details ? (
                  <>
                    {details.location && (
                      <div className="rounded border-2 border-[#4CAF50] bg-[#1a1a1a] p-3">
                        <h3 className="font-bold text-[#FFD700] mb-2">📍 FUNDORT</h3>
                        <p className="text-white">{details.location}</p>
                      </div>
                    )}

                    {details.biomes && (
                      <div className="rounded border-2 border-[#4CAF50] bg-[#1a1a1a] p-3">
                        <h3 className="font-bold text-[#FFD700] mb-2">🌍 BIOME</h3>
                        <p className="text-white">{details.biomes}</p>
                      </div>
                    )}

                    {details.height && (
                      <div className="rounded border-2 border-[#4CAF50] bg-[#1a1a1a] p-3">
                        <h3 className="font-bold text-[#FFD700] mb-2">📏 HÖHE</h3>
                        <p className="text-white">{details.height}</p>
                      </div>
                    )}

                    {details.recipeGrid && (
                      <div className="rounded border-2 border-[#4CAF50] bg-[#1a1a1a] p-3">
                        <h3 className="font-bold text-[#FFD700] mb-2">🔨 CRAFTING-REZEPT</h3>
                        <div className="flex items-center justify-center gap-4">
                          <div className="grid grid-cols-3 gap-1">
                            {details.recipeGrid.inputs.map((itemId, idx) => (
                              <div key={idx} className="w-12 h-12 bg-[#2a2a2a] border border-[#4CAF50] rounded flex items-center justify-center">
                                {itemId && (
                                  <img
                                    src={getItemImageUrl(itemId)}
                                    alt={itemId}
                                    className="w-10 h-10 object-contain"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="text-[#FFD700] text-xl font-bold">→</div>
                          <div className="w-16 h-16 bg-[#2a2a2a] border-2 border-[#FFD700] rounded flex items-center justify-center">
                            <div className="text-center">
                              <img
                                src={getItemImageUrl(details.recipeGrid.output)}
                                alt={details.recipeGrid.output}
                                className="w-12 h-12 object-contain mx-auto"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                              {details.recipeGrid.outputCount && details.recipeGrid.outputCount > 1 && (
                                <p className="text-[#FFD700] text-xs font-bold">x{details.recipeGrid.outputCount}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {details.recipe && !details.recipeGrid && (
                      <div className="rounded border-2 border-[#4CAF50] bg-[#1a1a1a] p-3">
                        <h3 className="font-bold text-[#FFD700] mb-2">🔨 HERSTELLUNG</h3>
                        <p className="text-white whitespace-pre-wrap">{details.recipe}</p>
                      </div>
                    )}

                    {details.miningRequirement && (
                      <div className="rounded border-2 border-[#FF6B35] bg-[#1a1a1a] p-3">
                        <h3 className="font-bold text-[#FFD700] mb-2">⛏️ ABBAU-ANFORDERUNG</h3>
                        <p className="text-white">{details.miningRequirement}</p>
                      </div>
                    )}

                    {details.description && (
                      <div className="rounded border-2 border-[#4CAF50] bg-[#1a1a1a] p-3">
                        <h3 className="font-bold text-[#FFD700] mb-2">ℹ️ BESCHREIBUNG</h3>
                        <p className="text-white">{details.description}</p>
                      </div>
                    )}

                    {details.recipeUrl && (
                      <div className="rounded border-2 border-[#4CAF50] bg-[#1a1a1a] p-3">
                        <h3 className="font-bold text-[#FFD700] mb-2">🔗 VOLLSTÄNDIGES REZEPT</h3>
                        <a
                          href={details.recipeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-[#4CAF50] hover:text-[#FFD700] underline font-bold"
                        >
                          Öffne auf minecraft-craftings.com →
                        </a>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="rounded border-2 border-[#FFD700] bg-[#1a1a1a] p-3">
                    <p className="text-[#FFD700]">Keine Informationen für dieses Item verfügbar.</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        );
      })()}
    </div>
  );
}
