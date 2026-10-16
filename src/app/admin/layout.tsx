"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminNav = [
  { href: "/admin", label: "Дашборд" },
  { href: "/admin/cases", label: "Кейсы" },
  { href: "/admin/skins", label: "Скины" },
  { href: "/admin/users", label: "Пользователи" },
  { href: "/admin/withdrawals", label: "Выводы" },
  { href: "/admin/promocodes", label: "Промокоды" },
  { href: "/admin/settings", label: "Настройки" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 border-r border-border bg-background-secondary flex flex-col shrink-0">
        <div className="p-5 border-b border-border">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white text-sm">
              A
            </div>
            <div>
              <p className="font-bold text-sm">PuzoDrop</p>
              <p className="text-xs text-text-muted">Админ-панель</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {adminNav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all " +
                  (isActive
                    ? "bg-primary/15 text-primary"
                    : "text-text-secondary hover:text-white hover:bg-background-hover")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-white hover:bg-background-hover transition"
          >
            ← На сайт
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border bg-background-secondary/50 flex items-center px-6">
          <h1 className="font-semibold text-sm text-text-secondary">
            Администрирование
          </h1>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
