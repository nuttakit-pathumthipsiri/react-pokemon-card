import type { FilterOptions } from "../types/pokemon";
import { CartIcon } from "./icons/CartIcon";
import { SearchIcon } from "./icons/SearchIcon";

interface NavbarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onToggleCart: () => void;
  loading: boolean;
}

export function Navbar({
  filters,
  onFilterChange,
  onToggleCart,
  loading,
}: NavbarProps) {
  return (
    <header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex items-center">
          <div className="grow items-center">
            <h1 className="text-2xl font-bold text-primary">Pokémon market</h1>
          </div>
          <div className="flex-none justify-end relative mr-4 hidden sm:block">
            <input
              type="text"
              value={filters.name}
              onChange={(e) =>
                onFilterChange({ ...filters, name: e.target.value })
              }
              placeholder="Search by Name"
              className="search-input w-64 pl-10 pr-4 py-2 rounded-lg"
              disabled={loading}
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon size={18} />
            </div>
          </div>

          <div className="flex-none items-center space-x-4">
            <button
              onClick={onToggleCart}
              className="bg-accent text-white p-3 rounded-lg hover:bg-accent/90 transition-colors"
            >
              <CartIcon size={20} />
            </button>
          </div>
        </div>
        <div className="justify-end relative mr-4 block sm:hidden mt-4">
          <input
            type="text"
            value={filters.name}
            onChange={(e) =>
              onFilterChange({ ...filters, name: e.target.value })
            }
            placeholder="Search by Name"
            className="search-input w-64 pl-10 pr-4 py-2 rounded-lg"
            disabled={loading}
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon size={18} />
          </div>
        </div>
        <hr className="border-t border-gray-700 mt-6" />
      </div>
    </header>
  );
}
