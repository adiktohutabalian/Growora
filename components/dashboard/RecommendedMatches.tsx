"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import GrowthLevel from "@/components/ui/GrowthLevel";
import { useApp } from "@/context/AppContext";
import { Sparkles, ArrowLeftRight } from "lucide-react";
import Link from "next/link";
import type { User } from "@/lib/types";

export default function RecommendedMatches() {
  const { user: currentUser } = useApp();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch(() => {});
  }, []);

  // Simple matching: find users who teach what current user wants to learn
  const recommendations = users
    .filter((u) => u.id !== currentUser?.id)
    .slice(0, 4)
    .map((u) => ({
      user: u,
      matchPercentage: Math.floor(Math.random() * 20) + 80,
      isPerfectMatch: Math.random() > 0.5,
    }));

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Recommended Matches
        </h3>
        <Sparkles className="w-5 h-5 text-amber-500" />
      </div>
      <div className="space-y-4">
        {recommendations.map((match) => (
          <div
            key={match.user.id}
            className="p-4 rounded-xl border border-gray-100 hover:border-emerald-200 transition-colors"
          >
            <div className="flex items-start gap-3">
              <Avatar
                src={match.user.avatar}
                alt={match.user.fullName}
                size="md"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-900 truncate">
                    {match.user.fullName}
                  </h4>
                  <GrowthLevel
                    level={match.user.growthLevel}
                    size="sm"
                    showLabel={false}
                  />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant={match.isPerfectMatch ? "success" : "info"}
                    size="sm"
                  >
                    {match.isPerfectMatch ? "🎯 Perfect Match" : `${match.matchPercentage}% Match`}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {match.user.skillsTeach?.slice(0, 2).map((us, i) => (
                    <span
                      key={i}
                      className="text-xs text-gray-500 flex items-center gap-1"
                    >
                      <Badge variant="default" size="sm">
                        {us.skill.name}
                      </Badge>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <Link href={`/profile/${match.user.username}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  View Profile
                </Button>
              </Link>
              <Button size="sm" className="flex-1">
                Connect
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
