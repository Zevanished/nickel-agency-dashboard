import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

function normalizeDomain(input: string): string {
  let d = input.trim();
  if (!d) return "";
  try {
    if (!/^https?:\/\//i.test(d)) d = "https://" + d;
    const u = new URL(d);
    return u.hostname.toLowerCase();
  } catch {
    return "";
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const companies = await prisma.company.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ companies });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { website, name } = await req.json();
  const domain = normalizeDomain(website || "");
  if (!domain) return NextResponse.json({ error: "Invalid website" }, { status: 400 });

  try {
    const company = await prisma.company.create({
      data: { domain, name: name?.toString() || null },
    });
    return NextResponse.json({ company }, { status: 201 });
  } catch (e: any) {
    if (e.code === "P2002") {
      return NextResponse.json({ error: "That domain is already added." }, { status: 409 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
