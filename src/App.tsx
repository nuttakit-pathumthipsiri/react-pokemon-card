import { useCallback, useEffect, useState, useMemo } from "react";
import { Cart } from "./components/Cart";
import { CartIcon } from "./components/CartIcon";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { Pagination } from "./components/Pagination";
import { PokemonCard as PokemonCardComponent } from "./components/PokemonCard";
import { useCart } from "./hooks/useCart";
import { PokemonApiService } from "./services/pokemonApi";
import type { FilterOptions, PokemonCard, Set } from "./types/pokemon";

// Debounce hook for search
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function App() {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOptionsLoading, setFilterOptionsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    name: "",
    type: "",
    rarity: "",
    set: "",
  });
  const [types, setTypes] = useState<string[]>([]);
  const [rarities, setRarities] = useState<string[]>([]);
  const [sets, setSets] = useState<Set[]>([]);

  // Debounce search input
  const debouncedFilters = useDebounce(filters, 500);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (showCart) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showCart]);

  const {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isInCart,
  } = useCart();

  // Memoize filter parameters to prevent unnecessary re-renders
  const filterParams = useMemo(
    () => ({
      page: currentPage,
      pageSize: 20,
      q: debouncedFilters.name ? `name:"${debouncedFilters.name}"` : undefined,
      types: debouncedFilters.type || undefined,
      rarities: debouncedFilters.rarity || undefined,
      set: debouncedFilters.set || undefined,
    }),
    [currentPage, debouncedFilters]
  );

  const fetchCards = useCallback(
    async (retryCount = 0) => {
      setLoading(true);
      setError(null);

      try {
        const response = await PokemonApiService.getCards(filterParams);

        setCards(response.data);
        setTotalPages(Math.ceil(response.totalCount / 20));
      } catch (err) {
        console.error("Error fetching cards:", err);

        // Retry logic for network errors
        if (retryCount < 2) {
          console.log(`Retrying... Attempt ${retryCount + 1}`);
          setTimeout(() => fetchCards(retryCount + 1), 1000 * (retryCount + 1));
          return;
        }

        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to fetch cards. Please check your internet connection and try again.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [filterParams]
  );

  const fetchFilterOptions = useCallback(async () => {
    setFilterOptionsLoading(true);

    try {
      const [typesResponse, raritiesResponse, setsResponse] = await Promise.all(
        [
          PokemonApiService.getTypes(),
          PokemonApiService.getRarities(),
          PokemonApiService.getSets(),
        ]
      );

      setTypes(typesResponse.data);
      setRarities(raritiesResponse.data);
      setSets(setsResponse.data);
    } catch (err) {
      console.error("Error fetching filter options:", err);
      // Don't show error for filter options, just log it
    } finally {
      setFilterOptionsLoading(false);
    }
  }, []);

  // Fetch filter options on mount
  useEffect(() => {
    fetchFilterOptions();
  }, [fetchFilterOptions]);

  // Fetch cards when filters or page changes
  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const handleFilterChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleRetry = useCallback(() => {
    fetchCards();
  }, [fetchCards]);

  const toggleCart = useCallback(() => {
    if (showCart) {
      // Closing cart - start animation
      setCartAnimation(false);
      setTimeout(() => {
        setShowCart(false);
      }, 300); // Match the transition duration
    } else {
      // Opening cart
      setShowCart(true);
      setTimeout(() => {
        setCartAnimation(true);
      }, 10); // Small delay to ensure DOM is ready
    }
  }, [showCart]);

  // Handle ESC key to close cart
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showCart) {
        toggleCart();
      }
    };

    if (showCart) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showCart, toggleCart]);

  // Memoize filtered sets for better performance
  const filteredSets = useMemo(() => {
    return sets.filter((set) => set.name && set.id);
  }, [sets]);

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="bg-card border-b border-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Title */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">
                Pokemon market
              </h1>
            </div>

            {/* Right side - Search and Cart */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  value={filters.name}
                  onChange={(e) =>
                    handleFilterChange({ ...filters, name: e.target.value })
                  }
                  placeholder="Search by Name"
                  className="search-input w-64 px-4 py-2 rounded-lg focus:outline-none transition-all duration-200"
                  disabled={loading}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-secondary">🔍</span>
                </div>
              </div>

              {/* Cart Icon Button */}
              <button
                onClick={toggleCart}
                className="bg-accent text-white p-3 rounded-lg hover:bg-accent/90 transition-colors"
              >
                <CartIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Section Title and Filter Dropdowns */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-primary">Choose Card</h2>

            {/* Filter Dropdowns */}
            <div className="flex items-center space-x-4">
              <select
                value={filters.set}
                onChange={(e) =>
                  handleFilterChange({ ...filters, set: e.target.value })
                }
                className="filter-dropdown px-4 py-2 rounded-lg focus:outline-none transition-all duration-200"
                disabled={filterOptionsLoading}
              >
                <option value="" className="bg-card text-primary">
                  Set
                </option>
                {filteredSets.map((set) => (
                  <option
                    key={set.id}
                    value={set.id}
                    className="bg-card text-primary"
                  >
                    {set.name}
                  </option>
                ))}
              </select>

              <select
                value={filters.rarity}
                onChange={(e) =>
                  handleFilterChange({ ...filters, rarity: e.target.value })
                }
                className="filter-dropdown px-4 py-2 rounded-lg focus:outline-none transition-all duration-200"
                disabled={filterOptionsLoading}
              >
                <option value="" className="bg-card text-primary">
                  Rarity
                </option>
                {rarities.map((rarity) => (
                  <option
                    key={rarity}
                    value={rarity}
                    className="bg-card text-primary"
                  >
                    {rarity}
                  </option>
                ))}
              </select>

              <select
                value={filters.type}
                onChange={(e) =>
                  handleFilterChange({ ...filters, type: e.target.value })
                }
                className="filter-dropdown px-4 py-2 rounded-lg focus:outline-none transition-all duration-200"
                disabled={filterOptionsLoading}
              >
                <option value="" className="bg-card text-primary">
                  Type
                </option>
                {types.map((type) => (
                  <option
                    key={type}
                    value={type}
                    className="bg-card text-primary"
                  >
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          {loading ? (
            <LoadingSpinner text="Loading Pokemon cards..." />
          ) : error ? (
            <div className="bg-card rounded-xl p-12 text-center border border-accent/10">
              <div className="text-accent text-6xl mb-4">⚠️</div>
              <h3 className="text-primary text-xl font-semibold mb-2">
                Oops! Something went wrong
              </h3>
              <p className="text-secondary mb-6">{error}</p>
              <button
                onClick={handleRetry}
                className="btn-primary px-6 py-3 rounded-lg"
              >
                Try Again
              </button>
            </div>
          ) : cards.length === 0 ? (
            <div className="bg-card rounded-xl p-12 text-center border border-accent/10">
              <div className="text-secondary text-6xl mb-4">🔍</div>
              <h3 className="text-primary text-xl font-semibold mb-2">
                No cards found
              </h3>
              <p className="text-secondary">
                Try adjusting your filters or search terms
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-6 gap-4 p-4">
                {cards.map((card) => (
                  <PokemonCardComponent
                    key={card.id}
                    card={card}
                    onAddToCart={addToCart}
                    isInCart={isInCart(card.id)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  isLoading={loading}
                />
              )}
            </>
          )}
        </div>

        {/* Cart Overlay */}
        {showCart && (
          <>
            {/* Backdrop */}
            <div
              className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
                cartAnimation ? "bg-opacity-50" : "bg-opacity-0"
              }`}
              onClick={toggleCart}
            />

            {/* Cart Panel */}
            <div
              className={`fixed top-0 right-0 h-full w-80 bg-card border-l border-accent/10 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
                cartAnimation ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <Cart
                cartItems={cartItems}
                onIncreaseQuantity={increaseQuantity}
                onDecreaseQuantity={decreaseQuantity}
                onRemoveFromCart={removeFromCart}
                onClearCart={clearCart}
                onCloseCart={toggleCart}
                totalItems={getTotalItems()}
                totalPrice={getTotalPrice()}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
