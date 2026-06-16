"use client";

import { useState } from "react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import GrowthLevel from "@/components/ui/GrowthLevel";
import StarRating from "@/components/ui/StarRating";
import SwapRequestModal from "@/components/swaps/SwapRequestModal";
import { MapPin, Calendar, MessageSquare, ArrowLeftRight } from "lucide-react";
import Link from "next/link";
import type { User } from "@/lib/types";

interface ProfileHeaderProps {
  user: User;
  isOwnProfile?: boolean;
}

export default function ProfileHeader({
  user,
  isOwnProfile = false,
}: ProfileHeaderProps) {
  const [showSwapModal, setShowSwapModal] = useState(false);

  // Find a skill the user can teach that the current user wants to learn
  const firstTeachableSkill = user.skillsTeach[0];

  return (
    <>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-emerald-400 to-emerald-600" />

        {/* Profile info */}
        <div className="px-6 md:px-8 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 mb-6">
            <Avatar
              src={user.avatar}
              alt={user.fullName}
              size="xl"
              className="border-4 border-white shadow-md"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {user.fullName}
              </h1>
              <p className="text-gray-500">@{user.username}</p>
            </div>
            {!isOwnProfile && (
              <div className="flex gap-3">
                <Button
                  icon={<ArrowLeftRight className="w-4 h-4" />}
                  onClick={() => setShowSwapModal(true)}
                >
                  Request Swap
                </Button>
                <Link href="/chat">
                  <Button
                    variant="outline"
                    icon={<MessageSquare className="w-4 h-4" />}
                  >
                    Message
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <p className="text-gray-600 mb-4 max-w-2xl">{user.bio}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>
                Joined{" "}
                {new Date(user.joinedDate).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <GrowthLevel
              level={user.growthLevel}
              size="sm"
              showProgress
              completedSwaps={user.completedSwaps}
            />
            <StarRating rating={user.rating} size="sm" />
            <span className="text-gray-400">({user.reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      {/* Swap request modal */}
      {showSwapModal && firstTeachableSkill && (
        <SwapRequestModal
          isOpen={showSwapModal}
          onClose={() => setShowSwapModal(false)}
          receiverId={user.id}
          skillId={firstTeachableSkill.skill.id}
        />
      )}
    </>
  );
}
