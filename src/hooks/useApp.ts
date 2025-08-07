import { useCallback, useEffect, useMemo, useState } from "react";
import { PokemonApiService } from "../services/pokemonApi";
import type { FilteredPokemonCard, FilterOptions, Set } from "../types/pokemon";
import { useDebounce } from "../utils/useDebounce";
import { useCart } from "./useCart";

export const useApp = () => {
  const [cards, setCards] = useState<FilteredPokemonCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOptionsLoading, setFilterOptionsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    name: "",
    type: "",
    rarity: "",
    set: "",
  });
  const [types, setTypes] = useState<string[]>([]);
  const [rarities, setRarities] = useState<string[]>([]);
  const [sets, setSets] = useState<Set[]>([]);

  const {
    cartItems,
    showCart,
    cartAnimation,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isInCart,
    toggleCart,
  } = useCart();

  const debouncedFilters = useDebounce(filters, 500);

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
    async (params?: any) => {
      setLoading(true);
      setError(null);

      try {
        const response = await PokemonApiService.getCards(
          params || filterParams
        );
        setCards(response.data);
      } catch (err) {
        console.error("Error fetching cards:", err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to fetch cards. Please try again.";
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
    } finally {
      setFilterOptionsLoading(false);
    }
  }, []);

  const handleFilterChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
  }, []);

  const handleRetry = useCallback(() => {
    fetchCards();
  }, [fetchCards]);

  const filteredSets = useMemo(() => {
    return sets.filter((set) => set.name && set.id);
  }, [sets]);

  useEffect(() => {
    fetchFilterOptions();
    fetchCards();
  }, []);

  useEffect(() => {
    if (
      debouncedFilters.name ||
      debouncedFilters.type ||
      debouncedFilters.rarity ||
      debouncedFilters.set
    ) {
      fetchCards(filterParams);
    }
  }, [filterParams, fetchCards]);

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

  return {
    // State
    cards,
    loading,
    filterOptionsLoading,
    error,
    filters,
    types,
    rarities,
    sets: filteredSets,

    // Cart
    cartItems,
    showCart,
    cartAnimation,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isInCart,
    toggleCart,

    // Actions
    handleFilterChange,
    handleRetry,
  };
};
