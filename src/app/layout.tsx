import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PuzoDrop — CS2 Cases",
  description: "Открывай кейсы CS2, апгрейды, инвентарь и вывод скинов",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased min-h-screen bg-background text-text-primary">
        {children}
      </body>
    </html>
  );
}
