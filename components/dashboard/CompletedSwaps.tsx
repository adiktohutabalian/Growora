"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";
import { Check, ArrowLeftRight, Star } from "lucide-react";
import Link from "next/link";

export default function CompletedSwaps() {
  const { user } = useApp();
  const [swapRequests, setSwapRequests] = useState<any[]>([]);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/swaps?userId=${user.id}`)
      .then((res) => res.json())
      .then(setSwapRequests)
      .catch(() => {});
  }, [user?.id]);

  const completedSwaps = swapRequests.filter((s) => s.status === "completed");

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Completed Swaps
        </h3>
        <Badge variant="success">
          <Check className="w-3.5 h-3.5 mr-1" />
          {completedSwaps.length}
        </Badge>
      </div>
      <div className="space-y-3">
        {completedSwaps.length > 0 ? (
          completedSwaps.map((swap) => (
            <div
              key={swap.id}
              className="p-4 rounded-xl border border-gray-100 hover:border-emerald-200 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <Avatar
                  src={swap.requester?.avatar}
                  alt={swap.requester?.fullName}
                  size="sm"
                />
                <span className="text-sm font-medium text-gray-900">
                  {swap.requester?.fullName}
                </span>
                <ArrowLeftRight className="w-4 h-4 text-gray-400" />
                <Avatar
                  src={swap.receiver?.avatar}
                  alt={swap.receiver?.fullName}
                  size="sm"
                />
                <span className="text-sm font-medium text-gray-900">
                  {swap.receiver?.fullName}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="default" size="sm">
                  {swap.skillOffered}
                </Badge>
                <span className="text-gray-400 text-xs">↔</span>
                <Badge variant="success" size="sm">
                  {swap.skillWanted}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-xs text-gray-500">Rate this swap</span>
                </div>
                <Link href="/swaps">
                  <Button variant="ghost" size="sm">
                    Leave Review
                  </Button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Check className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No completed swaps yet</p>
            <p className="text-gray-400 text-xs mt-1">
              Complete your first swap to see it here
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
