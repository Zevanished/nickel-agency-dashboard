"use client";
import Image from "next/image";
import Link from "next/link";

export default function AppHeader() {
  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/nickelseo-logo.png"
            alt="Nickel SEO"
            width={170}
            height={60}
            priority
          />
        </Link>
        <div className="text-sm text-[#3B4247]">
          <span className="font-semibold">Nickel SEO</span> Dashboard
        </div>
      </div>
    </header>
  );
}
