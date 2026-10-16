"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

const amounts = [100, 300, 500, 1000, 2000, 5000];

export default function DepositPage() {
  const [selected, setSelected] = useState(500);
  const [custom, setCustom] = useState("");
  const amount = custom ? Number(custom) : selected;

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Пополнение</h1>
        <p className="text-text-secondary">Пополни баланс банковской картой</p>
      </div>

      <div className="card p-6 space-y-6">
        <div>
          <label className="text-sm font-medium text-text-secondary mb-3 block">Сумма</label>
          <div className="grid grid-cols-3 gap-2">
            {amounts.map((a) => (
              <button
                key={a}
                onClick={() => { setSelected(a); setCustom(""); }}
                className={`py-3 rounded-lg text-sm font-semibold transition-all ${
                  selected === a && !custom
                    ? "bg-primary text-white shadow-glow"
                    : "bg-background-secondary border border-border text-text-secondary hover:border-primary/50"
                }`}
              >
                {a} ₽
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-text-secondary mb-2 block">Или введите свою сумму</label>
          <input type="number" placeholder="От 50 ₽" value={custom} onChange={(e) => setCustom(e.target.value)} className="input-field" min={50} />
        </div>

        <div>
          <label className="text-sm font-medium text-text-secondary mb-3 block">Способ оплаты</label>
          <div className="flex items-center gap-3 p-4 rounded-lg border border-primary bg-primary/10">
            <span className="text-2xl">💳</span>
            <div>
              <p className="font-medium text-sm">Банковская карта</p>
              <p className="text-xs text-text-muted">Visa, Mastercard, МИР</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg border border-border opacity-50 mt-2 cursor-not-allowed">
            <span className="text-2xl">🪙</span>
            <div>
              <p className="font-medium text-sm text-text-muted">Криптовалюта</p>
              <p className="text-xs text-text-muted">Скоро</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex justify-between mb-4">
            <span className="text-text-secondary">К оплате</span>
            <span className="text-xl font-bold">{amount || 0} ₽</span>
          </div>
          <Button className="w-full" size="lg" disabled={!amount || amount < 50}>
            Оплатить {amount || 0} ₽
          </Button>
        </div>
      </div>
    </div>
  );
}
