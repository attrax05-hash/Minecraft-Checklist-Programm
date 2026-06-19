'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Plus, Search, Download, Trash2, Info, Upload } from 'lucide-react';
import { minecraftItems, searchItems, getItemImageUrl, getItemsByCategory, getCategories } from '@/lib/minecraftItems';
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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Lade Checkliste aus localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setChecklist(JSON.parse(saved));
      } catch (e) {
        console.error('Fehler beim Laden der Checkliste:', e);
      }
    }
  }, []);

  // Speichere Checkliste in localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checklist));
  }, [checklist]);

  // Tastenkombinationen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'e') {
          e.preventDefault();
          exportAsJSON();
        } else if (e.key === 'i') {
          e.preventDefault();
          fileInputRef.current?.click();
        } else if (e.key === 'f') {
          e.preventDefault();
          (document.querySelector('input[placeholder*="Suche"]') as HTMLInputElement)?.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [checklist]);

  // Filtere Items basierend auf Suche und Kategorie
  const filteredItems = () => {
    let result = minecraftItems;

    // Filter nach Kategorie
    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Filter nach Suchquery
    if (searchQuery) {
      result = searchItems(searchQuery);
      if (selectedCategory !== 'all') {
        result = result.filter((item) => item.category === selectedCategory);
      }
    }

    return result;
  };

  const categories = getCategories();
  const popularItems = minecraftItems.slice(0, 8);
  const searchResults = filteredItems();

  // Berechne Statistiken
  const totalCount = checklist.length;
  const completedCount = checklist.filter((item) => item.checked).length;

  // Füge Item zur Checkliste hinzu
  const addItem = (item: MinecraftItem) => {
    const newItem: ChecklistItem = {
      ...item,
      id: `${item.id}-${Date.now()}`,
      itemId: item.id,
      stacks,
      items,
      checked: false,
    };
    setChecklist([...checklist, newItem]);
    setSelectedItem(null);
    setStacks(0);
    setItems(1);
    toast.success(`${item.name} hinzugefügt!`);
  };

  // Entferne Item aus Checkliste
  const removeItem = (id: string) => {
    setChecklist(checklist.filter((item) => item.id !== id));
  };

  // Toggle Item als erledigt
  const toggleItem = (id: string) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Exportiere als JSON
  const exportAsJSON = () => {
    const data = JSON.stringify(checklist, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `minecraft-checklist-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Checkliste exportiert!');
  };

  // Exportiere als Text
  const exportAsText = () => {
    const text = checklist
      .map((item) => `${item.checked ? '✓' : '○'} ${item.name} (${item.stacks}x${STACK_SIZE} + ${item.items})`)
      .join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `minecraft-checklist-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Checkliste als Text exportiert!');
  };

  // Importiere aus JSON
  const importFromJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (Array.isArray(data)) {
          setChecklist(data);
          toast.success('Checkliste importiert!');
        }
      } catch (error) {
        toast.error('Fehler beim Importieren der Datei');
      }
    };
    reader.readAsText(file);
  };

  // Lösche alle Items
  const clearAll = () => {
    if (window.confirm('Wirklich alle Items löschen?')) {
      setChecklist([]);
      toast.success('Checkliste geleert!');
    }
  };

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

      {/* HOTBAR */}
      <div className="mb-6 bg-[#2a2a2a] border-4 border-[#8B7355] rounded-lg p-4">
        <p className="text-[#FFD700] font-bold mb-3 text-sm">KATEGORIEN-HOTBAR:</p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('block')}
            className="flex-shrink-0 p-3 bg-[#1a1a1a] border-2 border-[#4CAF50] rounded hover:bg-[#2a2a2a] transition-all"
            title="Blöcke"
          >
            <img src={getItemImageUrl('dirt')} alt="Blöcke" className="h-10 w-10 object-contain" style={{ minHeight: '40px', minWidth: '40px', backgroundColor: '#333' }} />
          </button>
          <button
            onClick={() => setSelectedCategory('weapon')}
            className="flex-shrink-0 p-3 bg-[#1a1a1a] border-2 border-[#4CAF50] rounded hover:bg-[#2a2a2a] transition-all"
            title="Waffen"
          >
            <img src={getItemImageUrl('diamond_sword')} alt="Waffen" className="h-10 w-10 object-contain" style={{ minHeight: '40px', minWidth: '40px', backgroundColor: '#333' }} />
          </button>
          <button
            onClick={() => setSelectedCategory('armor')}
            className="flex-shrink-0 p-3 bg-[#1a1a1a] border-2 border-[#4CAF50] rounded hover:bg-[#2a2a2a] transition-all"
            title="Rüstung"
          >
            <img src={getItemImageUrl('diamond_helmet')} alt="Rüstung" className="h-10 w-10 object-contain" style={{ minHeight: '40px', minWidth: '40px', backgroundColor: '#333' }} />
          </button>
          <button
            onClick={() => setSelectedCategory('food')}
            className="flex-shrink-0 p-3 bg-[#1a1a1a] border-2 border-[#4CAF50] rounded hover:bg-[#2a2a2a] transition-all"
            title="Essen"
          >
            <img src={getItemImageUrl('cooked_beef')} alt="Essen" className="h-10 w-10 object-contain" style={{ minHeight: '40px', minWidth: '40px', backgroundColor: '#333' }} />
          </button>
          <button
            onClick={() => setSelectedCategory('redstone')}
            className="flex-shrink-0 p-3 bg-[#1a1a1a] border-2 border-[#4CAF50] rounded hover:bg-[#2a2a2a] transition-all"
            title="Redstone"
          >
            <img src={getItemImageUrl('redstone')} alt="Redstone" className="h-10 w-10 object-contain" style={{ minHeight: '40px', minWidth: '40px', backgroundColor: '#333' }} />
          </button>
          <button
            onClick={() => setSelectedCategory('decoration')}
            className="flex-shrink-0 p-3 bg-[#1a1a1a] border-2 border-[#4CAF50] rounded hover:bg-[#2a2a2a] transition-all"
            title="Dekoration"
          >
            <img src={getItemImageUrl('oak_door')} alt="Dekoration" className="h-10 w-10 object-contain" style={{ minHeight: '40px', minWidth: '40px', backgroundColor: '#333' }} />
          </button>
        </div>
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

          {/* Kategorie-Filter */}
          <div className="mb-6">
            <p className="text-[#FFD700] font-bold mb-3">KATEGORIEN:</p>
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid grid-cols-3 gap-1 bg-[#1a1a1a] border-2 border-[#4CAF50]">
                <TabsTrigger value="all" className="text-xs">ALLE</TabsTrigger>
                {categories.slice(0, 5).map((cat) => (
                  <TabsTrigger key={cat} value={cat} className="text-xs">
                    {cat.toUpperCase().slice(0, 4)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Beliebte Items */}
          <div className="mb-6">
            <p className="text-[#FFD700] font-bold mb-3">BELIEBTE ITEMS:</p>
            <div className="grid grid-cols-4 gap-2">
              {popularItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="p-2 bg-[#1a1a1a] border-2 border-[#4CAF50] rounded hover:bg-[#2a2a2a] transition-all"
                  title={item.name}
                >
                  <img
                    src={item.imageUrl || getItemImageUrl(item.id)}
                    alt={item.name}
                    className="h-8 w-8 object-contain mx-auto"
                    style={{ minHeight: '32px', minWidth: '32px', backgroundColor: '#333' }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Suchergebnisse */}
          {searchQuery && (
            <div className="mb-6">
              <p className="text-[#FFD700] font-bold mb-3">SUCHERGEBNISSE ({searchResults.length}):</p>
              <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                {searchResults.slice(0, 20).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="p-2 bg-[#1a1a1a] border-2 border-[#4CAF50] rounded hover:bg-[#2a2a2a] transition-all"
                    title={item.name}
                  >
                    <img
                      src={item.imageUrl || getItemImageUrl(item.id)}
                      alt={item.name}
                      className="h-8 w-8 object-contain mx-auto"
                      style={{ minHeight: '32px', minWidth: '32px', backgroundColor: '#333' }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Item Details */}
          {selectedItem && (
            <div className="mt-6 p-4 bg-[#1a1a1a] border-2 border-[#4CAF50] rounded">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedItem.imageUrl || getItemImageUrl(selectedItem.id)}
                    alt={selectedItem.name}
                    className="h-12 w-12 object-contain"
                    style={{ minHeight: '48px', minWidth: '48px', backgroundColor: '#333' }}
                  />
                  <div>
                    <h3 className="text-lg font-bold text-[#4CAF50]">{selectedItem.name}</h3>
                    <p className="text-sm text-[#b0b0b0]">{selectedItem.category}</p>
                    {(selectedItem.creativeOnly || selectedItem.survivalOnly) && (
                      <p className="text-xs text-[#FF6B35] mt-1">
                        {selectedItem.creativeOnly ? '🎨 Creative Only' : selectedItem.survivalOnly ? '⛏️ Survival Only' : ''}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1 hover:bg-[#4CAF50]/20 rounded transition-colors"
                  title="Schließen"
                >
                  <X className="h-5 w-5 text-[#4CAF50]" />
                </button>
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
                      onClick={() => setItems(Math.max(1, items - 1))}
                      className="h-8 w-8 p-0 bg-[#4CAF50] hover:bg-[#45a049]"
                    >
                      −
                    </Button>
                    <Input
                      type="number"
                      value={items}
                      onChange={(e) => setItems(Math.max(1, parseInt(e.target.value) || 1))}
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

                <Button
                  onClick={() => addItem(selectedItem)}
                  className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white font-bold"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  ZUR CHECKLISTE HINZUFÜGEN
                </Button>
              </div>

              {/* Crafting Info Box */}
              <div className="mt-4 p-3 bg-[#2a2a2a] border border-[#FFD700] rounded">
                <h4 className="text-[#FFD700] font-bold mb-2">📋 CRAFTING INFO</h4>
                <div className="space-y-2 text-xs text-[#b0b0b0]">
                  <div>
                    <p className="text-[#FFD700] font-bold">Biom:</p>
                    <p>Überall</p>
                  </div>
                  <div>
                    <p className="text-[#FFD700] font-bold">Höhe:</p>
                    <p>Überall</p>
                  </div>
                  <div>
                    <p className="text-[#FFD700] font-bold">Herstellung:</p>
                    <p>Siehe Crafting-Link</p>
                  </div>
                  <div>
                    <a
                      href="https://minecraft-craftings.com/#google_vignette"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4CAF50] hover:text-[#45a049] underline"
                    >
                      🔗 Crafting-Rezept anschauen
                    </a>
                  </div>
                  <div>
                    <p className="text-[#FFD700] font-bold">Verfügbarkeit:</p>
                    <p>Survival &amp; Creative</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rechte Spalte: Checkliste */}
        <div className="border-4 border-[#8B7355] rounded-lg p-6 bg-[#2a2a2a]">
          <h2 className="text-2xl font-bold text-[#4CAF50] mb-4">DEINE CHECKLISTE</h2>

          {/* Fortschritt */}
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-[#FFD700] font-bold">FORTSCHRITT</span>
              <span className="text-[#4CAF50]">{Math.round((completedCount / totalCount) * 100) || 0}%</span>
            </div>
            <div className="w-full bg-[#1a1a1a] border-2 border-[#4CAF50] rounded h-4 overflow-hidden">
              <div
                className="bg-[#4CAF50] h-full transition-all"
                style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Export/Import Buttons */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <Button
              onClick={exportAsJSON}
              className="bg-green-600 hover:bg-green-700 text-white font-bold text-sm"
            >
              <Download className="h-4 w-4 mr-1" />
              JSON
            </Button>
            <Button
              onClick={exportAsText}
              className="bg-green-600 hover:bg-green-700 text-white font-bold text-sm"
            >
              <Download className="h-4 w-4 mr-1" />
              Text
            </Button>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-sm"
            >
              <Upload className="h-4 w-4 mr-1" />
              Import
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={importFromJSON}
              className="hidden"
            />
          </div>

          {/* Checklisten Items */}
          {checklist.length === 0 ? (
            <div className="border-2 border-dashed border-[#4CAF50] rounded p-8 text-center">
              <p className="text-[#b0b0b0] mb-2">Keine Items in deiner Liste.</p>
              <p className="text-[#FFD700] text-sm">Suche nach Items und füge sie hinzu!</p>
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold"
              >
                <Upload className="h-4 w-4 mr-2" />
                Oder importiere eine Checkliste
              </Button>
            </div>
          ) : (
            <div className="space-y-2 max-h-[calc(100vh-500px)] overflow-y-auto">
              {checklist.map((item) => (
                <div key={item.id} className="flex items-center gap-2 p-2 bg-[#1a1a1a] border border-[#4CAF50] rounded">
                  <Checkbox
                    checked={item.checked}
                    onChange={() => toggleItem(item.id)}
                    className="border-[#4CAF50]"
                  />
                  <img
                    src={item.imageUrl || getItemImageUrl(item.itemId)}
                    alt={item.name}
                    className="h-6 w-6 object-contain"
                    style={{ minHeight: '24px', minWidth: '24px', backgroundColor: '#333' }}
                  />
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${item.checked ? 'line-through text-[#666]' : 'text-[#4CAF50]'}`}>
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-[#b0b0b0]">
                        {item.stacks > 0 && `${item.stacks} Stacks + `}{item.items}
                      </p>
                      <div className="flex items-center gap-1">
                        <Button
                          onClick={() => {
                            const newItems = item.items - 1;
                            if (newItems < 0) {
                              setChecklist(checklist.map((i) => i.id === item.id ? { ...i, stacks: Math.max(0, i.stacks - 1), items: STACK_SIZE - 1 } : i));
                            } else {
                              setChecklist(checklist.map((i) => i.id === item.id ? { ...i, items: newItems } : i));
                            }
                          }}
                          className="h-5 w-5 p-0 bg-[#4CAF50]/50 hover:bg-[#4CAF50] text-xs"
                        >
                          −
                        </Button>
                        <Button
                          onClick={() => {
                            const newItems = item.items + 1;
                            if (newItems > STACK_SIZE) {
                              setChecklist(checklist.map((i) => i.id === item.id ? { ...i, stacks: i.stacks + 1, items: 1 } : i));
                            } else {
                              setChecklist(checklist.map((i) => i.id === item.id ? { ...i, items: newItems } : i));
                            }
                          }}
                          className="h-5 w-5 p-0 bg-[#4CAF50]/50 hover:bg-[#4CAF50] text-xs"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => removeItem(item.id)}
                    className="h-6 w-6 p-0 bg-red-600 hover:bg-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Clear All Button */}
          {checklist.length > 0 && (
            <Button
              onClick={clearAll}
              className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              ALLE LÖSCHEN
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
