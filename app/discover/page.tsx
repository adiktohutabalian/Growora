"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/discover/SearchBar";
import FilterPanel from "@/components/discover/FilterPanel";
import SkillCard from "@/components/discover/SkillCard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { X, Filter } from "lucide-react";
import Badge from "@/components/ui/Badge";
import type { User, Skill } from "@/lib/types";

export default function DiscoverPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedAvailability, setSelectedAvailability] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Build a flat list of (user, skill) pairs
  const allPairs = users.flatMap((user) =>
    user.skillsTeach.map((us) => ({ user, skill: us.skill, level: us.level }))
  );

  const filtered = allPairs.filter(({ user, skill, level }) => {
    const matchesSearch =
      !search ||
      skill.name.toLowerCase().includes(search.toLowerCase()) ||
      user.fullName.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      !selectedCategory || skill.category === selectedCategory;

    const matchesLevel =
      !selectedLevel || level === selectedLevel.toLowerCase();

    const matchesAvailability =
      !selectedAvailability ||
      user.availability.includes(selectedAvailability as any);

    const matchesMode = !selectedMode || true;

    const matchesRating = !minRating || user.rating >= minRating;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesLevel &&
      matchesAvailability &&
      matchesMode &&
      matchesRating
    );
  });

  const activeFilterCount = [
    selectedCategory,
    selectedLevel,
    selectedAvailability,
    selectedMode,
    minRating,
  ].filter(Boolean).length;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Discover Skills</h1>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Discover Skills</h1>
        <p className="mt-2 text-gray-600">
          Find mentors and swap skills with people around the world
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          onFilterToggle={() => setShowFilters(!showFilters)}
        />
      </div>

      {/* Active filters display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm text-gray-500">Active filters:</span>
          {selectedCategory && (
            <Badge variant="success" size="md" className="gap-1">
              {selectedCategory}
              <button onClick={() => setSelectedCategory(null)}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {selectedLevel && (
            <Badge variant="success" size="md" className="gap-1">
              {selectedLevel}
              <button onClick={() => setSelectedLevel(null)}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {selectedMode && (
            <Badge variant="success" size="md" className="gap-1">
              {selectedMode === "online" ? "Online" : "In Person"}
              <button onClick={() => setSelectedMode(null)}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {selectedAvailability && (
            <Badge variant="success" size="md" className="gap-1">
              {selectedAvailability}
              <button onClick={() => setSelectedAvailability(null)}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {minRating && (
            <Badge variant="success" size="md" className="gap-1">
              {minRating}+ stars
              <button onClick={() => setMinRating(null)}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      <div className="flex gap-8">
        {/* Filters sidebar - desktop */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 p-5 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Filters</h2>
              {activeFilterCount > 0 && (
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                  {activeFilterCount}
                </span>
              )}
            </div>
            <FilterPanel
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedLevel={selectedLevel}
              onLevelChange={setSelectedLevel}
              selectedAvailability={selectedAvailability}
              onAvailabilityChange={setSelectedAvailability}
              selectedMode={selectedMode}
              onModeChange={setSelectedMode}
              minRating={minRating}
              onMinRatingChange={setMinRating}
            />
          </div>
        </div>

        {/* Mobile filters */}
        {showFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowFilters(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-600" />
                  <h2 className="text-lg font-semibold">Filters</h2>
                  {activeFilterCount > 0 && (
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterPanel
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedLevel={selectedLevel}
                onLevelChange={setSelectedLevel}
                selectedAvailability={selectedAvailability}
                onAvailabilityChange={setSelectedAvailability}
                selectedMode={selectedMode}
                onModeChange={setSelectedMode}
                minRating={minRating}
                onMinRatingChange={setMinRating}
              />
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full bg-emerald-500 text-white py-2.5 rounded-xl font-medium hover:bg-emerald-600 transition-colors"
                >
                  Show {filtered.length} results
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">
                {filtered.length}
              </span>{" "}
              mentors found
            </p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(({ user, skill }) => (
                <SkillCard
                  key={`${user.id}-${skill.id}`}
                  user={user}
                  skill={skill}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No mentors found matching your criteria.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your filters or search term.
              </p>
              {activeFilterCount > 0 && (
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedLevel(null);
                    setSelectedAvailability(null);
                    setSelectedMode(null);
                    setMinRating(null);
                  }}
                  className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
