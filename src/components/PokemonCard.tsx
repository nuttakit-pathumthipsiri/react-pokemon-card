import React from "react";
import type { PokemonCard as PokemonCardType } from "../types/pokemon";
import { CartIcon } from "./CartIcon";

interface PokemonCardProps {
  card: PokemonCardType;
  onAddToCart: (card: PokemonCardType) => void;
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
    <div className="card-hover rounded-lg mb-4">
      <div className="relative flex justify-center items-center">
        <img
          src={card.images.small}
          alt={card.name}
          className="w-32 h-50 object-cover rounded-t-lg"
          loading="lazy"
        />
      </div>
      <div className="bg-card overflow-hidden rounded-lg pt-12 mt-[-40px]">
        {/* Card Content */}
        <div className="p-3">
          {/* Card Name - centered */}
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
    </div>
  );
};
