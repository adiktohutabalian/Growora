import { cn, getGrowthRank, getNextGrowthRank } from "@/lib/utils";
import type { GrowthLevel as GrowthLevelType } from "@/lib/types";

interface GrowthLevelProps {
  level: GrowthLevelType;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  showProgress?: boolean;
  completedSwaps?: number;
  className?: string;
}

export default function GrowthLevel({
  level,
  size = "md",
  showLabel = true,
  showProgress = false,
  completedSwaps = 0,
  className,
}: GrowthLevelProps) {
  const rank = getGrowthRank(level);
  const nextRank = getNextGrowthRank(level);

  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  const emojiSizes = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-3xl",
  };

  const progress = nextRank
    ? ((completedSwaps - rank.requirement) /
        (nextRank.requirement - rank.requirement)) *
      100
    : 100;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={emojiSizes[size]}>{rank.emoji}</span>
      {showLabel && (
        <div className="flex flex-col">
          <span className={cn("font-semibold text-gray-900", sizes[size])}>
            Level {level} — {rank.name}
          </span>
          {showProgress && nextRank && (
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden min-w-[80px]">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">
                {completedSwaps}/{nextRank.requirement}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
