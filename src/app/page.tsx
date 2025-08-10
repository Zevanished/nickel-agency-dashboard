// src/app/page.tsx  (SERVER component — no "use client")
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardUI from "@/components/DashboardUI";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return <DashboardUI />;
}
