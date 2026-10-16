"use client";

export type Rarity = "Consumer" | "Industrial" | "Mil-Spec" | "Restricted" | "Classified" | "Covert" | "Extraordinary";

export interface Skin {
  id: string;
  name: string;
  rarity: Rarity;
  price: number;
  imageUrl: string;
}

export interface CaseItem {
  skinId: string;
  chance: number;
}

export interface Case {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  isActive: boolean;
  items: CaseItem[];
}

export interface PromoCode {
  id: string;
  code: string;
  type: "balance" | "percent";
  value: number;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
}

export interface SiteSettings {
  siteName: string;
  minDeposit: number;
  minWithdraw: number;
  referralPercent: number;
  telegramUrl: string;
  discordUrl: string;
  vkUrl: string;
  supportUrl: string;
  footerText: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "PuzoDrop",
  minDeposit: 50,
  minWithdraw: 100,
  referralPercent: 5,
  telegramUrl: "https://t.me/",
  discordUrl: "",
  vkUrl: "",
  supportUrl: "",
  footerText: "Открывай кейсы CS2, апгрейди скины и выводи на Steam.",
};

const DEFAULT_SKINS: Skin[] = [
  { id: "s1", name: "AWP | Neo-Noir", rarity: "Covert", price: 4500, imageUrl: "" },
  { id: "s2", name: "AK-47 | Asiimov", rarity: "Covert", price: 2800, imageUrl: "" },
  { id: "s3", name: "M4A4 | Neo-Noir", rarity: "Classified", price: 450, imageUrl: "" },
  { id: "s4", name: "USP-S | Cortex", rarity: "Classified", price: 380, imageUrl: "" },
  { id: "s5", name: "Glock-18 | Oxide Blaze", rarity: "Restricted", price: 45, imageUrl: "" },
  { id: "s6", name: "MP9 | Modest Threat", rarity: "Mil-Spec", price: 8, imageUrl: "" },
];

const DEFAULT_CASES: Case[] = [
  {
    id: "c1",
    name: "Danger Zone",
    price: 149,
    imageUrl: "",
    description: "Классический кейс Danger Zone",
    isActive: true,
    items: [
      { skinId: "s1", chance: 0.26 },
      { skinId: "s2", chance: 0.64 },
      { skinId: "s3", chance: 3.2 },
      { skinId: "s4", chance: 3.2 },
      { skinId: "s5", chance: 15.98 },
      { skinId: "s6", chance: 76.72 },
    ],
  },
  {
    id: "c2",
    name: "Kilowatt",
    price: 99,
    imageUrl: "",
    description: "Кейс Kilowatt",
    isActive: true,
    items: [
      { skinId: "s3", chance: 5 },
      { skinId: "s5", chance: 20 },
      { skinId: "s6", chance: 75 },
    ],
  },
];

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function getSkins(): Skin[] {
  return load("pd_skins", DEFAULT_SKINS);
}
export function setSkins(skins: Skin[]) {
  save("pd_skins", skins);
}
export function getCases(): Case[] {
  return load("pd_cases", DEFAULT_CASES);
}
export function setCases(cases: Case[]) {
  save("pd_cases", cases);
}
export function getPromos(): PromoCode[] {
  return load("pd_promos", [] as PromoCode[]);
}
export function setPromos(promos: PromoCode[]) {
  save("pd_promos", promos);
}
export function getSettings(): SiteSettings {
  return load("pd_settings", DEFAULT_SETTINGS);
}
export function setSettings(s: SiteSettings) {
  save("pd_settings", s);
}

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}
