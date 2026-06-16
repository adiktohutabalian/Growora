"use client";

import UpcomingSessions from "@/components/dashboard/UpcomingSessions";
import ActiveSwaps from "@/components/dashboard/ActiveSwaps";
import RecommendedMatches from "@/components/dashboard/RecommendedMatches";
import GrowthStats from "@/components/dashboard/GrowthStats";
import RecentMessages from "@/components/dashboard/RecentMessages";
import CompletedSwaps from "@/components/dashboard/CompletedSwaps";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useApp } from "@/context/AppContext";

export default function DashboardPage() {
  const { user } = useApp();

  return (
    <ProtectedRoute>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.fullName?.split(" ")[0] || "there"}! 👋
        </h1>
        <p className="mt-2 text-gray-600">
          Here&apos;s what&apos;s happening with your skill swaps
        </p>
      </div>

      {/* Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          <UpcomingSessions />
          <ActiveSwaps />
          <CompletedSwaps />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <GrowthStats />
          <RecentMessages />
          <RecommendedMatches />
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
