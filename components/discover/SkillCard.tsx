import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import StarRating from "@/components/ui/StarRating";
import GrowthLevel from "@/components/ui/GrowthLevel";
import { MapPin, Users } from "lucide-react";
import Link from "next/link";
import type { User, Skill } from "@/lib/types";

interface SkillCardProps {
  user: User;
  skill: Skill;
}

export default function SkillCard({ user, skill }: SkillCardProps) {
  const userSkill = user.skillsTeach.find((s) => s.skill.id === skill.id);

  return (
    <Link href={`/profile/${user.username}`}>
      <Card hover className="group h-full">
        <div className="flex items-start gap-4">
          <Avatar src={user.avatar} alt={user.fullName} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors truncate">
                {user.fullName}
              </h3>
              <GrowthLevel
                level={user.growthLevel}
                size="sm"
                showLabel={false}
              />
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span className="truncate">{user.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <StarRating rating={user.rating} size="sm" />
              <span className="text-xs text-gray-400">
                ({user.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-900">
              {skill.name}
            </h4>
            {userSkill && (
              <Badge variant="success" size="sm">
                {userSkill.level}
              </Badge>
            )}
          </div>
          {userSkill?.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {userSkill.description}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <Users className="w-3.5 h-3.5" />
            <span>{user.completedSwaps} swaps</span>
          </div>
          <span className="text-sm font-medium text-emerald-600 group-hover:underline">
            View profile →
          </span>
        </div>
      </Card>
    </Link>
  );
}
