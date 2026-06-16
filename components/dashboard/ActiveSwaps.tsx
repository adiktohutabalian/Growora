"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";
import type { SwapStatus } from "@/lib/types";

const statusColors: Record<SwapStatus, "success" | "warning" | "info" | "default"> = {
  pending: "warning",
  accepted: "info",
  rejected: "default",
  completed: "success",
};

export default function ActiveSwaps() {
  const { user } = useApp();
  const [swapRequests, setSwapRequests] = useState<any[]>([]);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/swaps?userId=${user.id}`)
      .then((res) => res.json())
      .then(setSwapRequests)
      .catch(() => {});
  }, [user?.id]);

  const activeSwaps = swapRequests.filter(
    (s) => s.status === "pending" || s.status === "accepted"
  );

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Active Swaps</h3>
        <Badge variant="info">{activeSwaps.length} active</Badge>
      </div>
      <div className="space-y-3">
        {activeSwaps.map((swap) => (
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
              <span className="text-gray-400">↔</span>
              <Avatar
                src={swap.receiver?.avatar}
                alt={swap.receiver?.fullName}
                size="sm"
              />
              <span className="text-sm font-medium text-gray-900">
                {swap.receiver?.fullName}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default" size="sm">
                {swap.skillOffered}
              </Badge>
              <span className="text-gray-400 text-xs">↔</span>
              <Badge variant="success" size="sm">
                {swap.skillWanted}
              </Badge>
              <Badge variant={statusColors[swap.status]} size="sm" className="ml-auto">
                {swap.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
