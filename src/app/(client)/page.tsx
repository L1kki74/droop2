"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Case, getCases } from "@/lib/store";

export default function HomePage() {
  const [cases, setCases] = useState<Case[]>([]);

  useEffect(() => {
    setCases(getCases().filter((c) => c.isActive).slice(0, 4));
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center relative">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Открывай кейсы{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">CS2</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10">
            Лучшие кейсы, честные шансы, быстрый вывод скинов на Steam.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cases">
              <Button size="lg" className="w-full sm:w-auto">Открыть кейсы</Button>
            </Link>
            <Link href="/upgrade">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">Апгрейд</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Популярные кейсы</h2>
          <Link href="/cases" className="text-primary hover:text-primary-light text-sm font-medium">Все кейсы →</Link>
        </div>
        {cases.length === 0 ? (
          <div className="card p-12 text-center text-text-muted">Добавьте кейсы в админ-панели</div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {cases.map((c) => (
              <Link key={c.id} href={`/cases/${c.id}`} className="card overflow-hidden group hover:border-primary/50 transition-all hover:shadow-glow">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                  {c.imageUrl ? (
                    <img src={c.imageUrl} alt={c.name} className="w-full h-full object-contain p-4" />
                  ) : (
                    <span className="text-4xl">📦</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm md:text-base truncate mb-1">{c.name}</h3>
                  <p className="text-primary font-bold">{c.price} ₽</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
