"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border shadow-sm bg-white p-6">
        <div className="mb-6 flex justify-center">
          <Image src="/nickel-seo-logo.png" alt="Nickel SEO" width={200} height={70} priority />
        </div>
        <h1 className="text-xl font-semibold text-[#3B4247] text-center mb-2">
          Client Dashboard Login
        </h1>
        <p className="text-sm text-[#3B4247]/70 text-center mb-6">
          Sign in to access your live reports.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            signIn("credentials", { username, password, callbackUrl: "/" });
          }}
          className="space-y-3"
        >
          <input
            className="w-full p-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0F8291]"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          <input
            type="password"
            className="w-full p-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0F8291]"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button
            type="submit"
            className="w-full p-2.5 rounded-lg bg-[#0F8291] text-white font-medium hover:opacity-95 transition"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#3B4247]/60">
          © {new Date().getFullYear()} Nickel SEO
        </p>
      </div>
    </div>
  );
}
