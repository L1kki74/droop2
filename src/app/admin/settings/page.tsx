"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { SiteSettings, getSettings, setSettings } from "@/lib/store";

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SiteSettings | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(getSettings());
  }, []);

  if (!form) return <div className="text-text-muted">Загрузка...</div>;

  const handleSave = () => {
    setSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Настройки</h1>
        <p className="text-text-secondary text-sm">Сайт, ссылки в подвале, лимиты</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold">Сайт</h2>
          <div>
            <label className="text-sm text-text-secondary mb-1.5 block">Название сайта</label>
            <input className="input-field" value={form.siteName} onChange={(e) => setForm({ ...form, siteName: e.target.value })} />
          </div>
          <div>
            <label className="text-sm text-text-secondary mb-1.5 block">Текст в подвале</label>
            <textarea className="input-field min-h-[60px]" value={form.footerText} onChange={(e) => setForm({ ...form, footerText: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-text-secondary mb-1.5 block">Мин. депозит (₽)</label>
              <input type="number" className="input-field" value={form.minDeposit} onChange={(e) => setForm({ ...form, minDeposit: Number(e.target.value) })} />
            </div>
            <div>
              <label className="text-sm text-text-secondary mb-1.5 block">Мин. вывод (₽)</label>
              <input type="number" className="input-field" value={form.minWithdraw} onChange={(e) => setForm({ ...form, minWithdraw: Number(e.target.value) })} />
            </div>
          </div>
          <div>
            <label className="text-sm text-text-secondary mb-1.5 block">Реферальный процент (%)</label>
            <input type="number" className="input-field" value={form.referralPercent} onChange={(e) => setForm({ ...form, referralPercent: Number(e.target.value) })} />
          </div>
        </div>

        <div className="card p-6 space-y-4">
          <h2 className="font-semibold">Ссылки в подвале (соцсети)</h2>
          <div>
            <label className="text-sm text-text-secondary mb-1.5 block">Telegram</label>
            <input className="input-field" value={form.telegramUrl} onChange={(e) => setForm({ ...form, telegramUrl: e.target.value })} placeholder="https://t.me/yourchannel" />
          </div>
          <div>
            <label className="text-sm text-text-secondary mb-1.5 block">Discord</label>
            <input className="input-field" value={form.discordUrl} onChange={(e) => setForm({ ...form, discordUrl: e.target.value })} placeholder="https://discord.gg/..." />
          </div>
          <div>
            <label className="text-sm text-text-secondary mb-1.5 block">ВКонтакте</label>
            <input className="input-field" value={form.vkUrl} onChange={(e) => setForm({ ...form, vkUrl: e.target.value })} placeholder="https://vk.com/..." />
          </div>
          <div>
            <label className="text-sm text-text-secondary mb-1.5 block">Поддержка</label>
            <input className="input-field" value={form.supportUrl} onChange={(e) => setForm({ ...form, supportUrl: e.target.value })} placeholder="https://t.me/support" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={handleSave}>Сохранить настройки</Button>
          {saved && <span className="text-success text-sm">Сохранено ✓</span>}
        </div>
      </div>
    </div>
  );
}
