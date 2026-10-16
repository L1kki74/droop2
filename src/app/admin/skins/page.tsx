"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { Skin, Rarity, getSkins, setSkins, uid } from "@/lib/store";

const RARITIES: Rarity[] = ["Consumer", "Industrial", "Mil-Spec", "Restricted", "Classified", "Covert", "Extraordinary"];

const rarityColors: Record<string, string> = {
  Covert: "text-red-400",
  Classified: "text-pink-400",
  Restricted: "text-purple-400",
  "Mil-Spec": "text-blue-400",
  Extraordinary: "text-yellow-400",
  Industrial: "text-sky-400",
  Consumer: "text-gray-400",
};

const emptyForm = { name: "", rarity: "Mil-Spec" as Rarity, price: 10, imageUrl: "" };

export default function AdminSkinsPage() {
  const [skins, setLocal] = useState<Skin[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setLocal(getSkins());
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (s: Skin) => {
    setEditingId(s.id);
    setForm({ name: s.name, rarity: s.rarity, price: s.price, imageUrl: s.imageUrl });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      alert("Введите название скина");
      return;
    }
    if (editingId) {
      const updated = skins.map((s) => (s.id === editingId ? { ...s, ...form } : s));
      setSkins(updated);
      setLocal(updated);
    } else {
      const newSkin: Skin = { id: uid(), ...form };
      const updated = [...skins, newSkin];
      setSkins(updated);
      setLocal(updated);
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Удалить скин?")) return;
    const updated = skins.filter((s) => s.id !== id);
    setSkins(updated);
    setLocal(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Скины</h1>
          <p className="text-text-secondary text-sm">Каталог предметов CS2 — название, цена, картинка</p>
        </div>
        <Button size="sm" onClick={openCreate}>+ Добавить скин</Button>
      </div>

      {showForm && (
        <div className="card p-6 mb-8 space-y-4">
          <h2 className="font-semibold text-lg">{editingId ? "Редактировать скин" : "Новый скин"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-text-secondary mb-1.5 block">Название *</label>
              <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="AWP | Neo-Noir" />
            </div>
            <div>
              <label className="text-sm text-text-secondary mb-1.5 block">Редкость</label>
              <select className="input-field" value={form.rarity} onChange={(e) => setForm({ ...form, rarity: e.target.value as Rarity })}>
                {RARITIES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-text-secondary mb-1.5 block">Цена (₽)</label>
              <input type="number" className="input-field" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} min={0} />
            </div>
            <div>
              <label className="text-sm text-text-secondary mb-1.5 block">URL картинки скина</label>
              <input className="input-field" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." />
            </div>
            {form.imageUrl && (
              <div className="md:col-span-2">
                <img src={form.imageUrl} alt="preview" className="h-20 rounded-lg object-contain bg-background-secondary p-2" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave}>Сохранить</Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Отмена</Button>
          </div>
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-text-muted">
                <th className="px-5 py-3 font-medium">Скин</th>
                <th className="px-5 py-3 font-medium">Редкость</th>
                <th className="px-5 py-3 font-medium">Цена</th>
                <th className="px-5 py-3 font-medium text-right">Действия</th>
              </tr>
            </thead>
            <tbody>
              {skins.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-text-muted">Скинов пока нет</td>
                </tr>
              )}
              {skins.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-background-hover/50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {s.imageUrl ? (
                        <img src={s.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover bg-background-secondary" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-background-secondary flex items-center justify-center text-lg">🔫</div>
                      )}
                      <span className="font-medium">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4"><span className={rarityColors[s.rarity] || ""}>{s.rarity}</span></td>
                  <td className="px-5 py-4 font-semibold">{s.price} ₽</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(s)} className="text-sm text-text-secondary hover:text-white">Изменить</button>
                      <button onClick={() => handleDelete(s.id)} className="text-sm text-text-secondary hover:text-accent">Удалить</button>
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
