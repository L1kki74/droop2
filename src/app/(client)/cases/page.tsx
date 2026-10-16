"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Case, getCases } from "@/lib/store";

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([]);

  useEffect(() => {
    setCases(getCases().filter((c) => c.isActive));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Кейсы</h1>
        <p className="text-text-secondary">Выбери кейс и испытай удачу. Все скины — настоящие CS2.</p>
      </div>

      {cases.length === 0 ? (
        <div className="card p-16 text-center text-text-muted">
          Кейсов пока нет. Добавьте их в админ-панели.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {cases.map((c) => (
            <Link
              key={c.id}
              href={`/cases/${c.id}`}
              className="card overflow-hidden group hover:border-primary/50 transition-all hover:shadow-glow"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                {c.imageUrl ? (
                  <img src={c.imageUrl} alt={c.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform" />
                ) : (
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-xl bg-background-card/60 border border-white/10 flex items-center justify-center text-3xl group-hover:scale-105 transition-transform">
                    📦
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm md:text-base truncate mb-1">{c.name}</h3>
                <span className="text-primary font-bold">{c.price} ₽</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
