"use client";

import { use, useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import StarRating from "@/components/ui/StarRating";
import GrowthLevel from "@/components/ui/GrowthLevel";
import SwapRequestModal from "@/components/swaps/SwapRequestModal";
import {
  ArrowLeft,
  MapPin,
  Users,
  Clock,
  Star,
} from "lucide-react";
import Link from "next/link";
import type { User, Skill } from "@/lib/types";

export default function SkillDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [skill, setSkill] = useState<Skill | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/skills").then((res) => res.json()),
      fetch("/api/users").then((res) => res.json()),
    ])
      .then(([skillsData, usersData]) => {
        const s = skillsData.find((sk: Skill) => sk.id === id);
        setSkill(s || null);
        setUsers(usersData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Skill not found</h1>
        <Link href="/discover" className="text-emerald-600 mt-4 inline-block">
          Back to discover
        </Link>
      </div>
    );
  }

  const mentors = users.filter((u) =>
    u.skillsTeach.some((s) => s.skill.id === skill.id)
  );

  return (
    <ProtectedRoute>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back link */}
      <Link
        href="/discover"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to discover
      </Link>

      {/* Skill header */}
      <div className="bg-gradient-to-br from-emerald-50 to-white rounded-3xl border border-emerald-100 p-8 md:p-12 mb-8">
        <Badge variant="success" size="md" className="mb-4">
          {skill.category}
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {skill.name}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-6">
          {skill.description}
        </p>
        <div className="flex flex-wrap gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>
              <strong className="text-gray-900">{skill.mentorCount}</strong>{" "}
              mentors available
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            <span>
              <strong className="text-gray-900">4.8</strong> average rating
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Online & in-person sessions</span>
          </div>
        </div>
      </div>

      {/* Mentors */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Available Mentors
      </h2>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {mentors.map((mentor) => {
          const mentorSkill = mentor.skillsTeach.find(
            (s) => s.skill.id === skill.id
          );
          return (
            <Card key={mentor.id} hover className="group">
              <div className="flex items-start gap-4">
                <Avatar
                  src={mentor.avatar}
                  alt={mentor.fullName}
                  size="lg"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {mentor.fullName}
                    </h3>
                    <GrowthLevel
                      level={mentor.growthLevel}
                      size="sm"
                      showLabel={false}
                    />
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{mentor.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <StarRating rating={mentor.rating} size="sm" />
                    <span className="text-xs text-gray-400">
                      ({mentor.reviewCount})
                    </span>
                  </div>
                </div>
              </div>

              {mentorSkill?.description && (
                <p className="mt-3 text-sm text-gray-600">
                  {mentorSkill.description}
                </p>
              )}

              <div className="mt-4 flex items-center gap-3">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setSelectedMentor(mentor.id);
                    setShowSwapModal(true);
                  }}
                >
                  Request Skill Swap
                </Button>
                <Link href={`/profile/${mentor.username}`}>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Reviews */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review: any) => (
            <Card key={review.id}>
              <div className="flex items-start gap-4">
                <Avatar
                  src={review.reviewerAvatar || review.author?.avatar}
                  alt={review.reviewerName || review.author?.fullName}
                  size="md"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900">
                      {review.reviewerName || review.author?.fullName}
                    </h4>
                    <span className="text-xs text-gray-400">{review.date || review.createdAt}</span>
                  </div>
                  <StarRating rating={review.rating} size="sm" className="mb-2" />
                  <p className="text-sm text-gray-600">{review.comment}</p>
                  <div className="mt-3 flex gap-4 text-xs text-gray-500">
                    <span>Communication: {review.communication}/5</span>
                    <span>Teaching: {review.teachingQuality}/5</span>
                    <span>Reliability: {review.reliability}/5</span>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No reviews yet</p>
        )}
      </div>

      {/* Swap request modal */}
      {showSwapModal && selectedMentor && (
        <SwapRequestModal
          isOpen={showSwapModal}
          onClose={() => {
            setShowSwapModal(false);
            setSelectedMentor(null);
          }}
          receiverId={selectedMentor}
          skillId={skill.id}
        />
      )}
    </div>
    </ProtectedRoute>
  );
}
