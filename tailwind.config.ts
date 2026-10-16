import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Основная палитра: чёрный / фиолетовый / белый / красный
        background: {
          DEFAULT: "#0a0a0f",
          secondary: "#12121a",
          card: "#16161f",
          hover: "#1e1e2a",
        },
        primary: {
          DEFAULT: "#8b5cf6", // фиолетовый
          light: "#a78bfa",
          dark: "#7c3aed",
          muted: "#4c1d95",
        },
        accent: {
          DEFAULT: "#ef4444", // красный
          light: "#f87171",
          dark: "#dc2626",
        },
        text: {
          primary: "#f8fafc",
          secondary: "#94a3b8",
          muted: "#64748b",
        },
        border: {
          DEFAULT: "#27272a",
          light: "#3f3f46",
        },
        success: "#22c55e",
        warning: "#f59e0b",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(139, 92, 246, 0.3)",
        "glow-red": "0 0 20px rgba(239, 68, 68, 0.3)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow":
          "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
