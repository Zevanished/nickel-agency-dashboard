import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nickel SEO Dashboard",
  description: "Client performance dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-[#3B4247]">{children}</body>
    </html>
  );
}
