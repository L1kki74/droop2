"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSettings, SiteSettings } from "@/lib/store";

export default function Footer() {
  const [settings, setLocal] = useState<SiteSettings | null>(null);

  useEffect(() => {
    setLocal(getSettings());
  }, []);

  const s = settings;

  return (
    <footer className="border-t border-border bg-background-secondary mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white text-sm">
                P
              </div>
              <span className="text-lg font-bold">
                Puzo<span className="text-primary">Drop</span>
              </span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed">
              {s?.footerText || "Открывай кейсы CS2, апгрейди скины и выводи на Steam."}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-text-secondary">
              Навигация
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/cases" className="text-text-muted hover:text-primary transition">Кейсы</Link></li>
              <li><Link href="/upgrade" className="text-text-muted hover:text-primary transition">Апгрейд</Link></li>
              <li><Link href="/inventory" className="text-text-muted hover:text-primary transition">Инвентарь</Link></li>
              <li><Link href="/deposit" className="text-text-muted hover:text-primary transition">Пополнить</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-text-secondary">
              Соцсети
            </h4>
            <ul className="space-y-2 text-sm">
              {s?.telegramUrl && (
                <li>
                  <a href={s.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition">
                    Telegram
                  </a>
                </li>
              )}
              {s?.discordUrl && (
                <li>
                  <a href={s.discordUrl} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition">
                    Discord
                  </a>
                </li>
              )}
              {s?.vkUrl && (
                <li>
                  <a href={s.vkUrl} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition">
                    ВКонтакте
                  </a>
                </li>
              )}
              {s?.supportUrl && (
                <li>
                  <a href={s.supportUrl} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition">
                    Поддержка
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-text-secondary">
              Документы
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="text-text-muted hover:text-primary transition">Соглашение</Link></li>
              <li><Link href="/privacy" className="text-text-muted hover:text-primary transition">Конфиденциальность</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} {s?.siteName || "PuzoDrop"}. Все права защищены.
          </p>
          <p className="text-text-muted text-xs">Сайт не связан с Valve Corporation.</p>
        </div>
      </div>
    </footer>
  );
}
