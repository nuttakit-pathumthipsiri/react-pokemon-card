import React from "react";
import type { FilteredPokemonCard } from "../types/pokemon";
import { CartIcon } from "./icons/CartIcon";

interface PokemonCardProps {
  card: FilteredPokemonCard;
  onAddToCart: (card: FilteredPokemonCard) => void;
  isInCart: boolean;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  card,
  onAddToCart,
  isInCart,
}) => {
  const price = card.cardmarket.prices.averageSellPrice || 0;
  const quantity = card.set.total;

  return (
    <div className="col-span-1 card-hover rounded-xl mb-4 max-w-64">
      <div className="relative flex justify-center items-center">
        <img
          src={card.images.small}
          alt={card.name}
          className="w-32 h-50 object-cover rounded-t-lg"
          loading="lazy"
        />
      </div>
      <div className="bg-card overflow-hidden rounded-xl pt-12 mt-[-40px] p-3">
        <h3 className="text-sm font-medium text-primary mb-3 text-center line-clamp-1">
          {card.name}
        </h3>

        {/* Price and Quantity on same line */}
        <div className="flex justify-center items-center mb-3 space-x-2">
          <span className="text-secondary text-sm">$ {price.toFixed(2)}</span>
          <span className="text-secondary text-xs">•</span>
          <span className="text-secondary text-sm">{quantity} Cards</span>
        </div>

        {/* Add to Cart Button - gray with cart icon */}
        <button
          onClick={() => onAddToCart(card)}
          disabled={isInCart}
          className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
            isInCart
              ? "bg-[#FFFFFF0A] text-gray-400 cursor-not-allowed"
              : "bg-[#FFFFFF14] text-white hover:bg-white hover:text-black"
          }`}
        >
          <span className="flex items-center justify-center">
            <CartIcon className="mr-2" />
            Add to cart
          </span>
        </button>
      </div>
    </div>
  );
};
