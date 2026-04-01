'use client';

import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  selectedSort: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
  onReset: () => void;
}

const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
  { value: 'grade-best', label: 'Nutrition Grade Best First' },
  { value: 'grade-worst', label: 'Nutrition Grade Worst First' },
];

export function FilterBar({
  categories,
  selectedCategory,
  selectedSort,
  onCategoryChange,
  onSortChange,
  onReset,
}: FilterBarProps) {
  const handleReset = useCallback(() => {
    onReset();
  }, [onReset]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      {/* Category filter */}
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full sm:w-52 h-11 rounded-xl border-2 border-primary/20 hover:border-primary transition-colors shadow-sm">
          <SelectValue placeholder="📂 Select category" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sort filter */}
      <Select value={selectedSort} onValueChange={onSortChange}>
        <SelectTrigger className="w-full sm:w-56 h-11 rounded-xl border-2 border-accent/20 hover:border-accent transition-colors shadow-sm">
          <SelectValue placeholder="📊 Sort by" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Reset button */}
      <Button
        onClick={handleReset}
        className="w-full sm:w-auto h-11 bg-gradient-to-r from-destructive/80 to-red-500 hover:shadow-lg hover:shadow-red-500/50 text-white font-semibold transition-all duration-300 rounded-xl"
      >
        🔄 Reset Filters
      </Button>
    </div>
  );
}
