"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signIn("credentials", { username, password, callbackUrl: "/" });
      }}
      className="max-w-sm mx-auto mt-24 p-6 rounded-xl border bg-white shadow"
    >
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      <input
        className="w-full p-2 border rounded mb-3"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="w-full p-2 border rounded mb-4"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="w-full p-2 rounded bg-black text-white">Continue</button>
    </form>
  );
}
