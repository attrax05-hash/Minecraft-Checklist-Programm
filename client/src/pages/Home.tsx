import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Plus, Search, Download, Trash2 } from 'lucide-react';
import { minecraftItems, searchItems, getItemImageUrl } from '@/lib/minecraftItems';
import type { MinecraftItem } from '@/lib/minecraftItems';
import { toast } from 'sonner';

interface ChecklistItem extends MinecraftItem {
  stacks: number; // Anzahl der Stacks (à 64)
  items: number; // Einzelne Items
  checked: boolean;
  id: string;
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

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchItems(searchQuery);
  }, [searchQuery]);

  const handleAddToChecklist = (item: MinecraftItem) => {
    // Nur hinzufügen wenn mindestens Stacks oder Items > 0
    if (stacks === 0 && items === 0) {
      toast.error('Bitte gib mindestens 1 Item ein');
      return;
    }

    const newItem: ChecklistItem = {
      ...item,
      stacks,
      items,
      checked: false,
      id: `${item.id}-${Date.now()}`,
    };
    setChecklist([...checklist, newItem]);
    setSearchQuery('');
    setStacks(0);
    setItems(1);
    setSelectedItem(null);
    toast.success(`${item.name} hinzugefügt!`);
  };

  const handleRemoveFromChecklist = (id: string) => {
    setChecklist(checklist.filter((item) => item.id !== id));
    toast.success('Item entfernt');
  };

  const handleToggleCheck = (id: string) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleClearChecklist = () => {
    if (window.confirm('Möchtest du wirklich alle Items löschen?')) {
      setChecklist([]);
      toast.success('Checkliste geleert');
    }
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(checklist, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `minecraft-checklist-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Checkliste als JSON exportiert');
  };

  const handleExportText = () => {
    let text = 'MINECRAFT CHECKLIST\n';
    text += `Exportiert: ${new Date().toLocaleString('de-DE')}\n`;
    text += `Fortschritt: ${checklist.filter(i => i.checked).length} / ${checklist.length}\n`;
    text += '\n=== ITEMS ===\n\n';

    checklist.forEach((item) => {
      const status = item.checked ? '✓' : '○';
      let quantity = '';
      if (item.stacks > 0 && item.items > 0) {
        quantity = `${item.stacks} Stacks + ${item.items}`;
      } else if (item.stacks > 0) {
        quantity = `${item.stacks} Stacks`;
      } else {
        quantity = `${item.items}`;
      }
      text += `${status} ${item.name} (${item.category}) x${quantity}\n`;
    });

    const dataBlob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `minecraft-checklist-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Checkliste als Text exportiert');
  };

  // Formatiere die Mengenanzeige
  const formatQuantity = (stack: number, item: number): string => {
    if (stack > 0 && item > 0) {
      return `${stack} Stacks + ${item}`;
    } else if (stack > 0) {
      return `${stack} Stacks`;
    } else {
      return `${item}`;
    }
  };

  // Berechne Gesamtmenge für Fortschritt
  const getTotalItems = (stack: number, item: number): number => {
    return stack * STACK_SIZE + item;
  };

  const checkedCount = checklist.filter((item) => item.checked).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-4xl mb-4">⛏️</div>
          <p>Lädt...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <header className="border-b-4 border-[#8B7355] bg-[#2a2a2a] p-6 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">⛏️</div>
            <h1 className="text-3xl font-bold text-[#4CAF50]">
              MINECRAFT CHECKLIST
            </h1>
          </div>
          <div className="text-sm text-[#b0b0b0]">
            {checkedCount} / {checklist.length} erledigt
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column: Search & Item Selection */}
          <div className="lg:col-span-1">
            <Card className="border-2 border-[#8B7355] bg-[#2a2a2a] p-6 shadow-xl">
              <h2 className="mb-4 text-xl font-bold text-[#4CAF50]">
                ITEM SUCHEN
              </h2>

              {/* Search Input */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-[#4CAF50]" />
                  <Input
                    type="text"
                    placeholder="Suche Items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-2 border-[#4CAF50] bg-[#1a1a1a] pl-10 text-white placeholder-[#666] focus:ring-2 focus:ring-[#4CAF50]"
                  />
                </div>
              </div>

              {/* Search Results */}
              {searchQuery.trim() && (
                <div className="mb-4 max-h-96 overflow-y-auto rounded border-2 border-[#4CAF50] bg-[#1a1a1a] p-2">
                  {searchResults.length > 0 ? (
                    <div className="space-y-2">
                      {searchResults.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedItem(item)}
                          className={`w-full rounded border-2 p-3 text-left transition-all flex items-center gap-3 ${
                            selectedItem?.id === item.id
                              ? 'border-[#4CAF50] bg-[#4CAF50] text-[#1a1a1a]'
                              : 'border-[#3a3a3a] bg-[#2a2a2a] hover:border-[#4CAF50]'
                          }`}
                        >
                          <img
                            src={item.imageUrl || getItemImageUrl(item.id)}
                            alt={item.name}
                            className="h-8 w-8 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          <div>
                            <div className="font-semibold">{item.name}</div>
                            <div className="text-xs text-[#999]">{item.category}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-[#b0b0b0]">
                      Keine Items gefunden
                    </div>
                  )}
                </div>
              )}

              {/* Quantity Selector */}
              {selectedItem && (
                <div className="mb-4 space-y-3 rounded border-2 border-[#8B7355] bg-[#1a1a1a] p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedItem.imageUrl || getItemImageUrl(selectedItem.id)}
                      alt={selectedItem.name}
                      className="h-12 w-12 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div>
                      <div className="font-bold text-[#4CAF50]">
                        {selectedItem.name}
                      </div>
                      <div className="text-xs text-[#b0b0b0]">
                        {selectedItem.category}
                      </div>
                    </div>
                  </div>

                  {/* Stacks Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#FFD700]">
                      Stacks (à 64):
                    </label>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() =>
                          setStacks(Math.max(0, stacks - 1))
                        }
                        className="h-8 w-8 border-2 border-[#4CAF50] bg-[#2a2a2a] p-0 text-[#4CAF50] hover:bg-[#4CAF50] hover:text-[#1a1a1a]"
                      >
                        −
                      </Button>
                      <Input
                        type="number"
                        min="0"
                        max="999"
                        value={stacks}
                        onChange={(e) =>
                          setStacks(Math.max(0, parseInt(e.target.value) || 0))
                        }
                        className="h-8 w-16 border-2 border-[#4CAF50] bg-[#1a1a1a] text-center text-white"
                      />
                      <Button
                        onClick={() => setStacks(stacks + 1)}
                        className="h-8 w-8 border-2 border-[#4CAF50] bg-[#2a2a2a] p-0 text-[#4CAF50] hover:bg-[#4CAF50] hover:text-[#1a1a1a]"
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* Items Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#FFD700]">
                      Einzelne Items:
                    </label>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() =>
                          setItems(Math.max(0, items - 1))
                        }
                        className="h-8 w-8 border-2 border-[#4CAF50] bg-[#2a2a2a] p-0 text-[#4CAF50] hover:bg-[#4CAF50] hover:text-[#1a1a1a]"
                      >
                        −
                      </Button>
                      <Input
                        type="number"
                        min="0"
                        max="63"
                        value={items}
                        onChange={(e) => {
                          const val = Math.max(0, Math.min(63, parseInt(e.target.value) || 0));
                          setItems(val);
                        }}
                        className="h-8 w-16 border-2 border-[#4CAF50] bg-[#1a1a1a] text-center text-white"
                      />
                      <Button
                        onClick={() => setItems(Math.min(63, items + 1))}
                        className="h-8 w-8 border-2 border-[#4CAF50] bg-[#2a2a2a] p-0 text-[#4CAF50] hover:bg-[#4CAF50] hover:text-[#1a1a1a]"
                      >
                        +
                      </Button>
                    </div>
                    <div className="text-xs text-[#b0b0b0]">
                      Max. 63 Items (ab 64 = 1 Stack)
                    </div>
                  </div>

                  {/* Summary */}
                  {(stacks > 0 || items > 0) && (
                    <div className="rounded border-2 border-[#4CAF50] bg-[#2a2a2a] p-2 text-center">
                      <div className="text-sm text-[#FFD700] font-bold">
                        Gesamt: {formatQuantity(stacks, items)}
                      </div>
                      <div className="text-xs text-[#b0b0b0]">
                        ({getTotalItems(stacks, items)} Items)
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={() => handleAddToChecklist(selectedItem)}
                    className="w-full border-2 border-[#4CAF50] bg-[#4CAF50] text-[#1a1a1a] font-bold hover:bg-[#2E7D32]"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    ZUR LISTE HINZUFÜGEN
                  </Button>
                </div>
              )}

              {/* Quick Add - Popular Items */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[#FFD700]">
                  BELIEBTE ITEMS:
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {minecraftItems.slice(0, 8).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedItem(item);
                        setSearchQuery('');
                      }}
                      className="flex h-12 items-center justify-center rounded border-2 border-[#3a3a3a] bg-[#1a1a1a] transition-all hover:border-[#4CAF50] hover:bg-[#2a2a2a]"
                      title={item.name}
                    >
                      <img
                        src={item.imageUrl || getItemImageUrl(item.id)}
                        alt={item.name}
                        className="h-8 w-8 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Checklist */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-[#8B7355] bg-[#2a2a2a] p-6 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#4CAF50]">
                  DEINE CHECKLISTE
                </h2>
                <div className="flex gap-2">
                  {checklist.length > 0 && (
                    <>
                      <Button
                        onClick={handleExportJSON}
                        variant="outline"
                        className="border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-[#1a1a1a]"
                        title="Als JSON exportieren"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={handleExportText}
                        variant="outline"
                        className="border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#1a1a1a]"
                        title="Als Text exportieren"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={handleClearChecklist}
                        variant="outline"
                        className="border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {checklist.length === 0 ? (
                <div className="rounded border-2 border-dashed border-[#4a4a4a] bg-[#1a1a1a] p-12 text-center">
                  <div className="text-4xl mb-3">⛏️</div>
                  <p className="text-[#b0b0b0]">
                    Keine Items in deiner Liste.
                    <br />
                    Suche nach Items und füge sie hinzu!
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 rounded border-2 p-3 transition-all ${
                        item.checked
                          ? 'border-[#4a4a4a] bg-[#1a1a1a] opacity-60'
                          : 'border-[#4CAF50] bg-[#1a1a1a] hover:border-[#FFD700]'
                      }`}
                    >
                      <Checkbox
                        checked={item.checked}
                        onCheckedChange={() => handleToggleCheck(item.id)}
                        className="h-6 w-6 border-2 border-[#4CAF50]"
                      />
                      <img
                        src={item.imageUrl || getItemImageUrl(item.id)}
                        alt={item.name}
                        className="h-8 w-8 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <div className="flex-1">
                        <div
                          className={`font-semibold ${
                            item.checked
                              ? 'line-through text-[#666]'
                              : 'text-white'
                          }`}
                        >
                          {item.name}
                        </div>
                        <div className="text-xs text-[#b0b0b0]">
                          {item.category}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="rounded border-2 border-[#4CAF50] bg-[#2a2a2a] px-3 py-1 font-bold text-[#4CAF50]">
                          {formatQuantity(item.stacks, item.items)}
                        </div>
                        <Button
                          onClick={() => handleRemoveFromChecklist(item.id)}
                          className="h-8 w-8 border-2 border-[#FF6B35] bg-transparent p-0 text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Progress Bar */}
              {checklist.length > 0 && (
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-[#FFD700]">FORTSCHRITT</span>
                    <span className="text-[#4CAF50]">
                      {Math.round((checkedCount / checklist.length) * 100)}%
                    </span>
                  </div>
                  <div className="h-4 overflow-hidden rounded border-2 border-[#4CAF50] bg-[#1a1a1a]">
                    <div
                      className="h-full bg-[#4CAF50] transition-all duration-300"
                      style={{
                        width: `${(checkedCount / checklist.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
