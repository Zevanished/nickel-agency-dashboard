// src/components/DashboardUI.tsx
"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Loader2,
  Globe,
  Phone,
  BarChart3,
  Search,
  Facebook,
  Settings,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

// Define type for companies
type Company = {
  id: number;
  name: string;
  domain: string;
};

// Mock data for SEO stats
const mockRankSeries = [
  { date: "2025-07-01", avgPos: 14.2, top3: 6, top10: 18 },
  { date: "2025-07-08", avgPos: 12.4, top3: 8, top10: 22 },
  { date: "2025-07-15", avgPos: 10.1, top3: 11, top10: 27 },
  { date: "2025-07-22", avgPos: 9.4, top3: 13, top10: 31 },
  { date: "2025-07-29", avgPos: 8.9, top3: 14, top10: 34 },
  { date: "2025-08-05", avgPos: 8.1, top3: 16, top10: 36 },
];

// Mock integrations
const mockIntegrations = [
  { key: "gsc", name: "Google Search Console", icon: Globe, status: "connected" },
  { key: "ga4", name: "Google Analytics 4", icon: BarChart3, status: "connected" },
  { key: "gbp", name: "Google Business Profile", icon: Search, status: "connected" },
  { key: "fb", name: "Facebook Page Insights", icon: Facebook, status: "connected" },
  { key: "callrail", name: "CallRail", icon: Phone, status: "connected" },
  { key: "psi", name: "PageSpeed Insights", icon: RefreshCw, status: "ready" },
  { key: "lighthouse", name: "Lighthouse", icon: Settings, status: "ready" },
];

export default function DashboardUI() {
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [newDomain, setNewDomain] = useState("");

  // Calculate rank change
  const positionTrend = useMemo(() => {
    const first = mockRankSeries[0]?.avgPos ?? 0;
    const last = mockRankSeries[mockRankSeries.length - 1]?.avgPos ?? 0;
    const delta = (first - last).toFixed(1);
    return { delta, up: Number(delta) > 0 };
  }, []);

  // Add company handler
  const handleAddCompany = () => {
    if (!newDomain.trim()) return;
    const newCompany: Company = {
      id: Date.now(),
      name: newDomain.replace(/^https?:\/\//, "").split(".")[0], // crude name from domain
      domain: newDomain,
    };
    setCompanies((prev) => [...prev, newCompany]);
    setNewDomain("");
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen w-full bg-gradient-to-b from-white to-slate-50 p-6 md:p-10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Client SEO Dashboard</h1>
              <p className="text-slate-600">
                Live performance, rankings, and calls — all in one view.
              </p>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Add Company Form */}
          <div className="flex w-full max-w-xl items-center gap-3 mb-6">
            <Input
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              placeholder="Enter company website"
            />
            <Button onClick={handleAddCompany}>Add</Button>
          </div>

          {/* Company Cards */}
          {companies.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
              {companies.map((company) => (
                <Card key={company.id} className="shadow-sm">
                  <CardHeader>
                    <CardTitle>{company.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">{company.domain}</p>
                    <Link href={`https://${company.domain}`} target="_blank">
                      <Button variant="outline" size="sm" className="mt-3">
                        View Site
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Integrations */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mockIntegrations.map((intg) => (
              <Card key={intg.key} className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{intg.name}</CardTitle>
                  <intg.icon className="h-4 w-4" />
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <Badge
                    variant={intg.status === "connected" ? "default" : "secondary"}
                    className="rounded-full"
                  >
                    {intg.status}
                  </Badge>
                  {intg.status === "connected" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Button variant="outline" size="sm">Connect</Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
