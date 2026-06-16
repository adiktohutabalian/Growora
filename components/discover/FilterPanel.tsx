"use client";

import Badge from "@/components/ui/Badge";
import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import {
  Code,
  Palette,
  Languages,
  Sparkles,
  Briefcase,
  Music,
  Dumbbell,
  ChefHat,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Code,
  Palette,
  Languages,
  Sparkles,
  Briefcase,
  Music,
  Dumbbell,
  ChefHat,
};

interface FilterPanelProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedLevel: string | null;
  onLevelChange: (level: string | null) => void;
  selectedAvailability: string | null;
  onAvailabilityChange: (availability: string | null) => void;
  selectedMode: string | null;
  onModeChange: (mode: string | null) => void;
  minRating: number | null;
  onMinRatingChange: (rating: number | null) => void;
}

export default function FilterPanel({
  selectedCategory,
  onCategoryChange,
  selectedLevel,
  onLevelChange,
  selectedAvailability,
  onAvailabilityChange,
  selectedMode,
  onModeChange,
  minRating,
  onMinRatingChange,
}: FilterPanelProps) {
  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  const availabilityOptions = [
    { id: "morning", label: "Morning", time: "8 AM — 12 PM" },
    { id: "afternoon", label: "Afternoon", time: "12 PM — 5 PM" },
    { id: "evening", label: "Evening", time: "5 PM — 9 PM" },
    { id: "weekend", label: "Weekend", time: "Sat & Sun" },
  ];

  const modeOptions = [
    { id: "online", label: "Online" },
    { id: "in_person", label: "In Person" },
  ];

  const ratingOptions = [4, 3, 2];

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Category</h3>
        <div className="space-y-1.5">
          <button
            onClick={() => onCategoryChange(null)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left",
              !selectedCategory
                ? "bg-emerald-50 text-emerald-700 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            All Skills
          </button>
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Code;
            return (
              <button
                key={cat.id}
                onClick={() =>
                  onCategoryChange(selectedCategory === cat.id ? null : cat.id)
                }
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left",
                  selectedCategory === cat.id
                    ? "bg-emerald-50 text-emerald-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1">{cat.name}</span>
                <span className="text-xs text-gray-400">{cat.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Level */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Skill Level
        </h3>
        <div className="flex flex-wrap gap-2">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() =>
                onLevelChange(selectedLevel === level ? null : level)
              }
            >
              <Badge
                variant={selectedLevel === level ? "success" : "outline"}
                size="md"
                className="cursor-pointer hover:border-emerald-300"
              >
                {level}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Mode: Online / Offline */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Mode</h3>
        <div className="flex flex-wrap gap-2">
          {modeOptions.map((mode) => (
            <button
              key={mode.id}
              onClick={() =>
                onModeChange(selectedMode === mode.id ? null : mode.id)
              }
            >
              <Badge
                variant={selectedMode === mode.id ? "success" : "outline"}
                size="md"
                className="cursor-pointer hover:border-emerald-300"
              >
                {mode.label}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Availability
        </h3>
        <div className="space-y-2">
          {availabilityOptions.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-2.5 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedAvailability === option.id}
                onChange={() =>
                  onAvailabilityChange(
                    selectedAvailability === option.id ? null : option.id
                  )
                }
                className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-gray-600">{option.label}</span>
              <span className="text-xs text-gray-400 ml-auto">
                {option.time}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Minimum Rating
        </h3>
        <div className="space-y-2">
          {ratingOptions.map((rating) => (
            <button
              key={rating}
              onClick={() =>
                onMinRatingChange(minRating === rating ? null : rating)
              }
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors text-left",
                minRating === rating
                  ? "bg-amber-50 text-amber-700 font-medium border border-amber-200"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-3.5 h-3.5",
                      i < rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-gray-200 text-gray-200"
                    )}
                  />
                ))}
              </div>
              <span>& up</span>
            </button>
          ))}
        </div>
      </div>

      {/* Clear all filters */}
      {(selectedCategory ||
        selectedLevel ||
        selectedAvailability ||
        selectedMode ||
        minRating) && (
        <button
          onClick={() => {
            onCategoryChange(null);
            onLevelChange(null);
            onAvailabilityChange(null);
            onModeChange(null);
            onMinRatingChange(null);
          }}
          className="w-full text-sm text-red-500 hover:text-red-600 font-medium py-2 rounded-lg hover:bg-red-50 transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
