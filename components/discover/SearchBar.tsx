"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import Input from "@/components/ui/Input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilterToggle?: () => void;
}

export default function SearchBar({
  value,
  onChange,
  onFilterToggle,
}: SearchBarProps) {
  return (
    <div className="flex gap-3">
      <div className="flex-1">
        <Input
          placeholder="Search skills you want to learn..."
          icon={<Search className="w-4 h-4" />}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      {onFilterToggle && (
        <button
          onClick={onFilterToggle}
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600 transition-colors flex items-center gap-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline text-sm font-medium">Filters</span>
        </button>
      )}
    </div>
  );
}
