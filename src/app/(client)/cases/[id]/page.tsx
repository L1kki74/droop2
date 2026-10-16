"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { Case, Skin, getCases, getSkins } from "@/lib/store";

const rarityColors: Record<string, string> = {
  Covert: "text-red-400 border-red-500/40 bg-red-500/10",
  Classified: "text-pink-400 border-pink-500/40 bg-pink-500/10",
  Restricted: "text-purple-400 border-purple-500/40 bg-purple-500/10",
  "Mil-Spec": "text-blue-400 border-blue-500/40 bg-blue-500/10",
  Extraordinary: "text-yellow-400 border-yellow-500/40 bg-yellow-500/10",
};

export default function CaseOpenPage() {
  const params = useParams();
  const id = params?.id as string;
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [skins, setSkins] = useState<Skin[]>([]);
  const [isOpening, setIsOpening] = useState(false);
  const [openedSkin, setOpenedSkin] = useState<Skin | null>(null);

  useEffect(() => {
    const c = getCases().find((x) => x.id === id) || null;
    setCaseData(c);
    setSkins(getSkins());
  }, [id]);

  const handleOpen = () => {
    if (!caseData || caseData.items.length === 0) return;
    setIsOpening(true);
    setOpenedSkin(null);
    setTimeout(() => {
      const rand = Math.random() * 100;
      let cumulative = 0;
      let selectedId = caseData.items[caseData.items.length - 1].skinId;
      for (const item of caseData.items) {
        cumulative += item.chance;
        if (rand <= cumulative) {
          selectedId = item.skinId;
          break;
        }
      }
      const skin = skins.find((s) => s.id === selectedId) || null;
      setOpenedSkin(skin);
      setIsOpening(false);
    }, 2500);
  };

  if (!caseData) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center text-text-muted">
        Кейс не найден. <Link href="/cases" className="text-primary">К списку</Link>
      </div>
    );
  }

  const caseItems = caseData.items
    .map((i) => {
      const skin = skins.find((s) => s.id === i.skinId);
      return skin ? { ...skin, chance: i.chance } : null;
    })
    .filter(Boolean) as (Skin & { chance: number })[];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <Link href="/cases" className="inline-flex items-center gap-2 text-text-secondary hover:text-white mb-8 transition">
        ← Назад к кейсам
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="card p-8 flex flex-col items-center">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center mb-6 relative overflow-hidden">
              {isOpening ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : openedSkin ? (
                <div className="text-center p-4">
                  {openedSkin.imageUrl && (
                    <img src={openedSkin.imageUrl} alt="" className="h-20 mx-auto mb-2 object-contain" />
                  )}
                  <p className="text-sm text-text-muted mb-1">Выпало:</p>
                  <p className="font-bold text-lg">{openedSkin.name}</p>
                  <p className="text-primary font-semibold mt-1">{openedSkin.price} ₽</p>
                </div>
              ) : caseData.imageUrl ? (
                <img src={caseData.imageUrl} alt={caseData.name} className="w-full h-full object-contain p-6" />
              ) : (
                <span className="text-6xl">📦</span>
              )}
            </div>

            <h1 className="text-2xl font-bold mb-2">{caseData.name}</h1>
            <p className="text-text-secondary text-sm mb-6 text-center">{caseData.description}</p>
            <span className="text-3xl font-bold text-primary mb-6">{caseData.price} ₽</span>

            <Button size="lg" className="w-full max-w-xs" onClick={handleOpen} isLoading={isOpening} disabled={isOpening}>
              {openedSkin ? "Открыть ещё" : "Открыть кейс"}
            </Button>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-4">Содержимое кейса</h2>
          <div className="space-y-2">
            {caseItems.map((item) => (
              <div key={item.id} className="card p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover bg-background-secondary" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-background-secondary flex items-center justify-center text-lg">🔫</div>
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <span className={`badge border text-xs ${rarityColors[item.rarity] || ""}`}>{item.rarity}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold">{item.price} ₽</p>
                  <p className="text-xs text-text-muted">{item.chance}%</p>
                </div>
              </div>
            ))}
            {caseItems.length === 0 && (
              <p className="text-text-muted text-sm">В кейсе пока нет предметов</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
