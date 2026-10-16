"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/cases", label: "Кейсы" },
  { href: "/upgrade", label: "Апгрейд" },
  { href: "/inventory", label: "Инвентарь" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  // Пока без авторизации — баланс не показываем
  const isLoggedIn = false;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white shadow-glow">
              P
            </div>
            <span className="text-xl font-bold tracking-tight">
              Puzo<span className="text-primary">Drop</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all " +
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

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <Link
                href="/deposit"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background-card border border-border hover:border-primary/50 transition-all"
              >
                <span className="text-primary text-sm">₽</span>
                <span className="font-semibold text-sm">0.00</span>
              </Link>
            ) : null}

            <div className="hidden sm:flex items-center gap-2">
              <a href="/api/auth/steam">
                <Button variant="outline" size="sm">
                  Войти через Steam
                </Button>
              </a>
            </div>

            <button
              className="md:hidden p-2 text-text-secondary hover:text-white text-xl"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={
                      "px-4 py-3 rounded-lg text-sm font-medium " +
                      (isActive
                        ? "bg-primary/15 text-primary"
                        : "text-text-secondary hover:text-white hover:bg-background-hover")
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-4 px-2">
                <a href="/api/auth/steam">
                  <Button className="w-full">Войти через Steam</Button>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
