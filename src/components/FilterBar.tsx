import React from "react";
import type { FilterOptions, Set } from "../types/pokemon";

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  types: string[];
  rarities: string[];
  sets: Set[];
  isLoading: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  types,
  rarities,
  sets,
  isLoading,
}) => {
  const handleInputChange = (field: keyof FilterOptions, value: string) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  const hasActiveFilters = filters.name || filters.type || filters.rarity || filters.set;

  return (
    <div className="bg-card rounded-xl p-6 border border-accent/10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-primary font-poppins">Filters</h3>
          <p className="text-secondary text-sm font-poppins">Refine your search</p>
        </div>
        {hasActiveFilters && (
          <button
            onClick={() =>
              onFilterChange({ name: "", type: "", rarity: "", set: "" })
            }
            className="text-secondary hover:text-primary text-sm font-medium transition-colors font-poppins"
            disabled={isLoading}
          >
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search by name */}
        <div>
          <label className="block text-primary font-medium text-sm mb-2 font-poppins">
            Search by Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter card name..."
              className="search-input w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-200 font-poppins"
              disabled={isLoading}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-secondary">🔍</span>
            </div>
          </div>
        </div>

        {/* Filter by Type */}
        <div>
          <label className="block text-primary font-medium text-sm mb-2 font-poppins">
            Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => handleInputChange("type", e.target.value)}
            className="filter-dropdown w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-200 font-poppins"
            disabled={isLoading}
          >
            <option value="" className="bg-card text-primary">All Types</option>
            {types.map((type) => (
              <option key={type} value={type} className="bg-card text-primary">
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Rarity */}
        <div>
          <label className="block text-primary font-medium text-sm mb-2 font-poppins">
            Rarity
          </label>
          <select
            value={filters.rarity}
            onChange={(e) => handleInputChange("rarity", e.target.value)}
            className="filter-dropdown w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-200 font-poppins"
            disabled={isLoading}
          >
            <option value="" className="bg-card text-primary">All Rarities</option>
            {rarities.map((rarity) => (
              <option key={rarity} value={rarity} className="bg-card text-primary">
                {rarity}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Set */}
        <div>
          <label className="block text-primary font-medium text-sm mb-2 font-poppins">
            Set
          </label>
          <select
            value={filters.set}
            onChange={(e) => handleInputChange("set", e.target.value)}
            className="filter-dropdown w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-200 font-poppins"
            disabled={isLoading}
          >
            <option value="" className="bg-card text-primary">All Sets</option>
            {sets.map((set) => (
              <option key={set.id} value={set.id} className="bg-card text-primary">
                {set.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-accent/20">
          <div className="flex flex-wrap gap-2">
            {filters.name && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent border border-accent/30 font-poppins">
                Name: {filters.name}
                <button
                  onClick={() => handleInputChange("name", "")}
                  className="ml-2 text-accent hover:text-accent/80"
                >
                  ×
                </button>
              </span>
            )}
            {filters.type && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent border border-accent/30 font-poppins">
                Type: {filters.type}
                <button
                  onClick={() => handleInputChange("type", "")}
                  className="ml-2 text-accent hover:text-accent/80"
                >
                  ×
                </button>
              </span>
            )}
            {filters.rarity && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent border border-accent/30 font-poppins">
                Rarity: {filters.rarity}
                <button
                  onClick={() => handleInputChange("rarity", "")}
                  className="ml-2 text-accent hover:text-accent/80"
                >
                  ×
                </button>
              </span>
            )}
            {filters.set && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent border border-accent/30 font-poppins">
                Set: {sets.find(s => s.id === filters.set)?.name}
                <button
                  onClick={() => handleInputChange("set", "")}
                  className="ml-2 text-accent hover:text-accent/80"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
