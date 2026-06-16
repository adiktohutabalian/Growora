"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useApp } from "@/context/AppContext";
import type { SwapStatus } from "@/lib/types";
import { ArrowLeftRight, Check, X, Clock, MessageSquare } from "lucide-react";
import Link from "next/link";

const statusColors: Record<SwapStatus, "success" | "warning" | "info" | "default"> = {
  pending: "warning",
  accepted: "info",
  rejected: "default",
  completed: "success",
};

const statusIcons: Record<SwapStatus, React.ElementType> = {
  pending: Clock,
  accepted: Check,
  rejected: X,
  completed: Check,
};

export default function SwapsPage() {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState<"all" | SwapStatus>("all");
  const [swapRequests, setSwapRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = user?.id ? `/api/swaps?userId=${user.id}` : "/api/swaps";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSwapRequests(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.id]);

  const tabs = [
    { id: "all" as const, label: "All" },
    { id: "pending" as const, label: "Pending" },
    { id: "accepted" as const, label: "Active" },
    { id: "completed" as const, label: "Completed" },
    { id: "rejected" as const, label: "Declined" },
  ];

  const filtered =
    activeTab === "all"
      ? swapRequests
      : swapRequests.filter((s) => s.status === activeTab);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Skill Swaps</h1>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Skill Swaps</h1>
        <p className="mt-2 text-gray-600">
          Manage your skill exchange requests
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
            {tab.id !== "all" && (
              <span className="ml-1.5 text-xs text-gray-400">
                ({swapRequests.filter((s) => s.status === tab.id).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Swap list */}
      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((swap) => {
            const swapStatus = swap.status as SwapStatus;
            const StatusIcon = statusIcons[swapStatus] || Clock;
            return (
              <Card key={swap.id} hover>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* People */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Avatar
                      src={swap.requester?.avatar}
                      alt={swap.requester?.fullName}
                      size="md"
                    />
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {swap.requester?.fullName}
                      </p>
                      <p className="text-sm text-gray-500">Requester</p>
                    </div>
                    <ArrowLeftRight className="w-5 h-5 text-gray-400 shrink-0 mx-2" />
                    <Avatar
                      src={swap.receiver?.avatar}
                      alt={swap.receiver?.fullName}
                      size="md"
                    />
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {swap.receiver?.fullName}
                      </p>
                      <p className="text-sm text-gray-500">Receiver</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="default" size="sm">
                      {swap.skillOffered}
                    </Badge>
                    <span className="text-gray-400">↔</span>
                    <Badge variant="success" size="sm">
                      {swap.skillWanted}
                    </Badge>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge variant={statusColors[swapStatus]} size="md">
                      <StatusIcon className="w-3.5 h-3.5 mr-1" />
                      {swapStatus}
                    </Badge>
                    {swap.status === "accepted" && (
                      <Link href="/chat">
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Message */}
                <p className="mt-3 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                  &ldquo;{swap.message}&rdquo;
                </p>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-20">
            <ArrowLeftRight className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No swaps found</p>
            <p className="text-gray-400 text-sm mt-2">
              {activeTab === "all"
                ? "Start by discovering skills and requesting swaps!"
                : `No ${activeTab} swaps at the moment.`}
            </p>
            {activeTab === "all" && (
              <Link href="/discover" className="mt-4 inline-block">
                <Button>Discover Skills</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
}
