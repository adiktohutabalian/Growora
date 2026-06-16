"use client";

import { use, useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ProfileHeader from "@/components/profile/ProfileHeader";
import SkillBadges from "@/components/profile/SkillBadges";
import Portfolio from "@/components/profile/Portfolio";
import Availability from "@/components/profile/Availability";
import Button from "@/components/ui/Button";
import { Settings } from "lucide-react";
import Link from "next/link";
import type { User } from "@/lib/types";

export default function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  const { user: currentUser } = useApp();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/users/${username}`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not found");
      })
      .then((data) => {
        setProfileUser(data);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (notFound || !profileUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">User not found</h1>
        <p className="text-gray-500">The user &ldquo;{username}&rdquo; doesn&apos;t exist.</p>
        <Link href="/discover" className="mt-4 inline-block">
          <Button>Discover Skills</Button>
        </Link>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === profileUser.id;

  return (
    <ProtectedRoute>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Edit button for own profile */}
      {isOwnProfile && (
        <div className="flex justify-end">
          <Link href="/profile/edit">
            <Button variant="outline" size="sm" icon={<Settings className="w-4 h-4" />}>
              Edit Profile
            </Button>
          </Link>
        </div>
      )}

      <ProfileHeader user={profileUser} isOwnProfile={isOwnProfile} />
      <SkillBadges
        skillsTeach={profileUser.skillsTeach}
        skillsLearn={profileUser.skillsLearn}
      />
      <Portfolio items={profileUser.portfolio} />
      <Availability availability={profileUser.availability} />
    </div>
    </ProtectedRoute>
  );
}
