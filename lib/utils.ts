import { GROWTH_RANKS, type GrowthLevel, type SkillLevel } from "./types";

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getGrowthRank(level: GrowthLevel) {
  return GROWTH_RANKS.find((r) => r.level === level) || GROWTH_RANKS[0];
}

export function getNextGrowthRank(level: GrowthLevel) {
  return GROWTH_RANKS.find((r) => r.level === level + 1) || null;
}

export function getLevelColor(level: SkillLevel): string {
  const colors: Record<SkillLevel, string> = {
    beginner: "bg-blue-100 text-blue-700",
    intermediate: "bg-emerald-100 text-emerald-700",
    advanced: "bg-purple-100 text-purple-700",
    expert: "bg-amber-100 text-amber-700",
  };
  return colors[level];
}

export function getLevelLabel(level: SkillLevel): string {
  return level.charAt(0).toUpperCase() + level.slice(1);
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

export function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
}

export function getMatchColor(percentage: number): string {
  if (percentage >= 90) return "text-emerald-600 bg-emerald-50";
  if (percentage >= 75) return "text-blue-600 bg-blue-50";
  return "text-gray-600 bg-gray-50";
}
