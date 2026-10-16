"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { PromoCode, getPromos, setPromos, uid } from "@/lib/store";

export default function AdminPromocodesPage() {
  const [promos, setLocal] = useState<PromoCode[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: "", type: "balance" as "balance" | "percent", value: 100, maxUses: 100 });

  useEffect(() => {
    setLocal(getPromos());
  }, []);

  const handleSave = () => {
    if (!form.code.trim()) {
      alert("Введите код");
      return;
    }
    const newPromo: PromoCode = {
      id: uid(),
      code: form.code.toUpperCase().trim(),
      type: form.type,
      value: form.value,
      maxUses: form.maxUses,
      usedCount: 0,
      isActive: true,
    };
    const updated = [...promos, newPromo];
    setPromos(updated);
    setLocal(updated);
    setShowForm(false);
    setForm({ code: "", type: "balance", value: 100, maxUses: 100 });
  };

  const toggleActive = (id: string) => {
    const updated = promos.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p));
    setPromos(updated);
    setLocal(updated);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Удалить промокод?")) return;
    const updated = promos.filter((p) => p.id !== id);
    setPromos(updated);
    setLocal(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Промокоды</h1>
          <p className="text-text-secondary text-sm">Создание и управление промокодами</p>
        </div>
        <Button size="sm" onClick={() => setShowForm(true)}>+ Создать промокод</Button>
      </div>

      {showForm && (
        <div className="card p-6 mb-8 space-y-4">
          <h2 className="font-semibold text-lg">Новый промокод</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-text-secondary mb-1.5 block">Код *</label>
              <input className="input-field uppercase" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="WELCOME100" />
            </div>
            <div>
              <label className="text-sm text-text-secondary mb-1.5 block">Тип</label>
              <select className="input-field" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "balance" | "percent" })}>
                <option value="balance">Сумма на баланс (₽)</option>
                <option value="percent">Процент к депозиту (%)</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-text-secondary mb-1.5 block">Значение</label>
              <input type="number" className="input-field" value={form.value} onChange={(e) => setForm({ ...form, value: Number(e.target.value) })} min={1} />
            </div>
            <div>
              <label className="text-sm text-text-secondary mb-1.5 block">Макс. использований</label>
              <input type="number" className="input-field" value={form.maxUses} onChange={(e) => setForm({ ...form, maxUses: Number(e.target.value) })} min={1} />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave}>Создать</Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Отмена</Button>
          </div>
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-text-muted">
                <th className="px-5 py-3 font-medium">Код</th>
                <th className="px-5 py-3 font-medium">Тип</th>
                <th className="px-5 py-3 font-medium">Значение</th>
                <th className="px-5 py-3 font-medium">Использовано</th>
                <th className="px-5 py-3 font-medium">Статус</th>
                <th className="px-5 py-3 font-medium text-right">Действия</th>
              </tr>
            </thead>
            <tbody>
              {promos.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-text-muted">Промокодов пока нет</td>
                </tr>
              )}
              {promos.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-background-hover/50">
                  <td className="px-5 py-4 font-mono font-semibold">{p.code}</td>
                  <td className="px-5 py-4 text-text-secondary">{p.type === "balance" ? "Баланс" : "Процент"}</td>
                  <td className="px-5 py-4">{p.type === "balance" ? `${p.value} ₽` : `${p.value}%`}</td>
                  <td className="px-5 py-4 text-text-secondary">{p.usedCount} / {p.maxUses}</td>
                  <td className="px-5 py-4">
                    <span className={`badge ${p.isActive ? "bg-success/15 text-success" : "bg-text-muted/15 text-text-muted"}`}>
                      {p.isActive ? "Активен" : "Выкл"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => toggleActive(p.id)} className="text-sm text-text-secondary hover:text-white">
                        {p.isActive ? "Выкл" : "Вкл"}
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="text-sm text-text-secondary hover:text-accent">Удалить</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
