import { useState, useCallback } from "react";
import type { CartItem, PokemonCard } from "../types/pokemon";

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((card: PokemonCard) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.card.id === card.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.card.id === card.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { card, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((cardId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.card.id !== cardId)
    );
  }, []);

  const updateQuantity = useCallback(
    (cardId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(cardId);
        return;
      }

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.card.id === cardId ? { ...item, quantity } : item
        )
      );
    },
    [removeFromCart]
  );

  const increaseQuantity = useCallback(
    (cardId: string) => {
      const currentItem = cartItems.find((item) => item.card.id === cardId);
      if (currentItem) {
        updateQuantity(cardId, currentItem.quantity + 1);
      } else {
        updateQuantity(cardId, 1);
      }
    },
    [cartItems, updateQuantity]
  );

  const decreaseQuantity = useCallback(
    (cardId: string) => {
      const currentItem = cartItems.find((item) => item.card.id === cardId);
      if (currentItem) {
        updateQuantity(cardId, currentItem.quantity - 1);
      }
    },
    [cartItems, updateQuantity]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const price = item.card.cardmarket.prices.averageSellPrice || 0;
      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const isInCart = useCallback(
    (cardId: string) => {
      return cartItems.some((item) => item.card.id === cardId);
    },
    [cartItems]
  );

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isInCart,
  };
};
