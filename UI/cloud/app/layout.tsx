import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Вход | Cloud Drive",
  description: "Войдите в своё облачное хранилище Cloud Drive.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
