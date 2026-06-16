"use client";

import Card from "@/components/ui/Card";
import GrowthLevel from "@/components/ui/GrowthLevel";
import { useApp } from "@/context/AppContext";
import { TrendingUp, ArrowUpRight, Repeat, Star } from "lucide-react";

export default function GrowthStats() {
  const { user } = useApp();

  if (!user) return null;

  const stats = [
    {
      label: "Completed Swaps",
      value: user.completedSwaps,
      icon: Repeat,
      change: "+3 this week",
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Average Rating",
      value: user.rating.toFixed(1),
      icon: Star,
      change: "+0.2 this month",
      color: "text-amber-600 bg-amber-50",
    },
    {
      label: "Total Reviews",
      value: user.reviewCount,
      icon: TrendingUp,
      change: "+5 this month",
      color: "text-blue-600 bg-blue-50",
    },
  ];

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Your Growth
      </h3>

      <div className="mb-6">
        <GrowthLevel
          level={user.growthLevel}
          size="lg"
          showProgress
          completedSwaps={user.completedSwaps}
        />
      </div>

      <div className="space-y-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50"
          >
            <div
              className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}
            >
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="font-semibold text-gray-900">{stat.value}</p>
            </div>
            <span className="text-xs text-emerald-600 flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" />
              {stat.change}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
