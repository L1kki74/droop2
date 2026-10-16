"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { Case, Skin, getCases, setCases, getSkins, uid } from "@/lib/store";

const emptyForm = {
  name: "",
  price: 100,
  imageUrl: "",
  description: "",
  isActive: true,
};

export default function AdminCasesPage() {
  const [cases, setLocalCases] = useState<Case[]>([]);
  const [skins, setLocalSkins] = useState<Skin[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [itemChances, setItemChances] = useState<Record<string, number>>({});

  useEffect(() => {
    setLocalCases(getCases());
    setLocalSkins(getSkins());
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setItemChances({});
    setShowForm(true);
  };

  const openEdit = (c: Case) => {
    setEditingId(c.id);
    setForm({
      name: c.name,
      price: c.price,
      imageUrl: c.imageUrl,
      description: c.description,
      isActive: c.isActive,
    });
    const chances: Record<string, number> = {};
    c.items.forEach((i) => {
      chances[i.skinId] = i.chance;
    });
    setItemChances(chances);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      alert("Введите название кейса");
      return;
    }
    const items = Object.entries(itemChances)
      .filter(([, ch]) => ch > 0)
      .map(([skinId, chance]) => ({ skinId, chance }));

    if (editingId) {
      const updated = cases.map((c) =>
        c.id === editingId
          ? { ...c, ...form, items }
          : c
      );
      setCases(updated);
      setLocalCases(updated);
    } else {
      const newCase: Case = {
        id: uid(),
        ...form,
        items,
      };
      const updated = [...cases, newCase];
      setCases(updated);
      setLocalCases(updated);
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Удалить кейс?")) return;
    const updated = cases.filter((c) => c.id !== id);
    setCases(updated);
    setLocalCases(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Кейсы</h1>
          <p className="text-text-secondary text-sm">Добавление, редактирование, картинки и цены</p>
        </div>
        <Button size="sm" onClick={openCreate}>+ Добавить кейс</Button>
      </div>

      {showForm && (
        <div className="card p-6 mb-8 space-y-4">
          <h2 className="font-semibold text-lg">{editingId ? "Редактировать кейс" : "Новый кейс"}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-text-secondary mb-1.5 block">Название *</label>
              <input
                className="input-field"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Danger Zone"
              />
            </div>
            <div>
              <label className="text-sm text-text-secondary mb-1.5 block">Цена (₽) *</label>
              <input
                type="number"
                className="input-field"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                min={1}
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-text-secondary mb-1.5 block">URL картинки кейса</label>
              <input
                className="input-field"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://example.com/case.png"
              />
              {form.imageUrl && (
                <img src={form.imageUrl} alt="preview" className="mt-2 h-24 rounded-lg object-contain bg-background-secondary p-2" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              )}
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-text-secondary mb-1.5 block">Описание</label>
              <textarea
                className="input-field min-h-[80px]"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="active"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              />
              <label htmlFor="active" className="text-sm">Активен (виден на сайте)</label>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Содержимое (шансы %)</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {skins.map((skin) => (
                <div key={skin.id} className="flex items-center gap-3 p-2 rounded-lg bg-background-secondary">
                  <span className="flex-1 text-sm truncate">{skin.name}</span>
                  <span className="text-xs text-text-muted w-20">{skin.rarity}</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    className="input-field w-24 text-sm"
                    placeholder="0"
                    value={itemChances[skin.id] || ""}
                    onChange={(e) =>
                      setItemChances({
                        ...itemChances,
                        [skin.id]: Number(e.target.value) || 0,
                      })
                    }
                  />
                  <span className="text-xs text-text-muted">%</span>
                </div>
              ))}
              {skins.length === 0 && (
                <p className="text-sm text-text-muted">Сначала добавьте скины во вкладке «Скины»</p>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
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
                <th className="px-5 py-3 font-medium">Кейс</th>
                <th className="px-5 py-3 font-medium">Цена</th>
                <th className="px-5 py-3 font-medium">Предметов</th>
                <th className="px-5 py-3 font-medium">Статус</th>
                <th className="px-5 py-3 font-medium text-right">Действия</th>
              </tr>
            </thead>
            <tbody>
              {cases.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-text-muted">
                    Кейсов пока нет. Нажмите «Добавить кейс»
                  </td>
                </tr>
              )}
              {cases.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-background-hover/50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {c.imageUrl ? (
                        <img src={c.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover bg-background-secondary" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center text-lg">📦</div>
                      )}
                      <span className="font-medium">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-semibold text-primary">{c.price} ₽</td>
                  <td className="px-5 py-4 text-text-secondary">{c.items.length}</td>
                  <td className="px-5 py-4">
                    <span className={`badge ${c.isActive ? "bg-success/15 text-success" : "bg-text-muted/15 text-text-muted"}`}>
                      {c.isActive ? "Активен" : "Скрыт"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(c)} className="text-sm text-text-secondary hover:text-white transition">Изменить</button>
                      <button onClick={() => handleDelete(c.id)} className="text-sm text-text-secondary hover:text-accent transition">Удалить</button>
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
