import { useCallback, useEffect, useMemo, useState } from "react";
import { Cart } from "./components/Cart";
import { Dropdown } from "./components/Dropdown";
import { Navbar } from "./components/Navbar";
import { PokemonCard as PokemonCardComponent } from "./components/PokemonCard";
import { useCart } from "./hooks/useCart";
import { PokemonApiService } from "./services/pokemonApi";
import type { FilterOptions, FilteredPokemonCard, Set } from "./types/pokemon";

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
  const [cards, setCards] = useState<FilteredPokemonCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOptionsLoading, setFilterOptionsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
      page: 1,
      pageSize: 20,
      q: debouncedFilters.name ? `name:"${debouncedFilters.name}"` : undefined,
      types: debouncedFilters.type || undefined,
      rarities: debouncedFilters.rarity || undefined,
      set: debouncedFilters.set || undefined,
    }),
    [debouncedFilters]
  );

  const fetchCards = useCallback(
    async (retryCount = 0) => {
      setLoading(true);
      setError(null);

      try {
        const response = await PokemonApiService.getCards(filterParams);

        setCards(response.data);
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

  const filteredSets = useMemo(() => {
    return sets.filter((set) => set.name && set.id);
  }, [sets]);

  return (
    <div className="min-h-screen bg-primary mt-2">
      {/* Header */}
      <Navbar
        filters={filters}
        onFilterChange={handleFilterChange}
        onToggleCart={toggleCart}
        loading={loading}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
        <div className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-semibold text-primary">Choose Card</h2>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <Dropdown
                value={filters.set}
                onChange={(value) =>
                  handleFilterChange({ ...filters, set: value })
                }
                options={filteredSets}
                placeholder="Set"
                disabled={filterOptionsLoading}
              />

              <Dropdown
                value={filters.rarity}
                onChange={(value) =>
                  handleFilterChange({ ...filters, rarity: value })
                }
                options={rarities.map((rarity) => ({
                  id: rarity,
                  name: rarity,
                }))}
                placeholder="Rarity"
                disabled={filterOptionsLoading}
              />

              <Dropdown
                value={filters.type}
                onChange={(value) =>
                  handleFilterChange({ ...filters, type: value })
                }
                options={types.map((type) => ({ id: type, name: type }))}
                placeholder="Type"
                disabled={filterOptionsLoading}
              />
            </div>
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="p-12 text-center">
              <h3 className="text-primary text-xl font-semibold mb-2">
                Loading Pokemon cards...
              </h3>
              <p className="text-secondary mb-6">
                Please wait while we fetch your cards...
              </p>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
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
            <div className="p-12 text-center">
              <h3 className="text-primary text-xl font-semibold mb-2">
                No cards found
              </h3>
              <p className="text-secondary">
                Try adjusting your filters or search terms
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-4 items-center justify-center">
              {cards.map((card) => (
                <PokemonCardComponent
                  key={card.id}
                  card={card}
                  onAddToCart={addToCart}
                  isInCart={isInCart(card.id)}
                />
              ))}
            </div>
          )}
        </div>

        {showCart && (
          <>
            <div
              className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
                cartAnimation ? "bg-opacity-50" : "bg-opacity-0"
              }`}
              onClick={toggleCart}
            />
            <div
              className={`fixed top-0 right-0 h-full w-80 bg-card shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
                sm:w-80 w-full
                ${cartAnimation ? "translate-x-0" : "translate-x-full"}
              `}
            >
              <Cart
                cartItems={cartItems}
                onIncreaseQuantity={increaseQuantity}
                onDecreaseQuantity={decreaseQuantity}
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
