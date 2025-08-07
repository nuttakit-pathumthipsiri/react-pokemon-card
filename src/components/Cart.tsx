import React from "react";
import type { CartItem } from "../types/pokemon";
import { CartIcon } from "./CartIcon";

interface CartProps {
  cartItems: CartItem[];
  onIncreaseQuantity: (cardId: string) => void;
  onDecreaseQuantity: (cardId: string) => void;
  onRemoveFromCart: (cardId: string) => void;
  onClearCart: () => void;
  onCloseCart?: () => void;
  totalItems: number;
  totalPrice: number;
}

export const Cart: React.FC<CartProps> = ({
  cartItems,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveFromCart,
  onClearCart,
  onCloseCart,
  totalItems,
  totalPrice,
}) => {
  return (
    <div className="h-full flex flex-col">
      {/* Cart Header */}
      <div className="flex justify-between items-center p-4 border-b border-accent/10">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-lg font-bold text-primary font-poppins">Cart</h2>
          <div className="flex items-center space-x-4">
            {cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-accent hover:text-accent/80 text-xs font-medium transition-colors font-poppins"
              >
                Clear all
              </button>
            )}
            {onCloseCart && (
              <button
                onClick={onCloseCart}
                className="text-accent hover:text-accent/80 transition-colors p-1 text-lg font-poppins"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <div className="flex-1 flex flex-col">
        {cartItems.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center py-8">
              <div className="text-secondary mb-3 flex justify-center">
                <CartIcon size={48} />
              </div>
              <h3 className="text-primary text-sm font-semibold mb-1 font-poppins">
                Your cart is empty
              </h3>
              <p className="text-secondary text-xs font-poppins">
                Start building your Pokemon collection!
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.card.id}
                    className="bg-card rounded-lg p-3 border border-accent/10"
                  >
                    <div className="flex items-center space-x-2">
                      {/* Card Image */}
                      <div className="relative">
                        <img
                          src={item.card.images.small}
                          alt={item.card.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </div>

                      {/* Card Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-primary font-medium text-xs truncate font-poppins">
                          {item.card.name}
                        </h4>
                        <p className="text-accent font-bold text-xs font-poppins">
                          $
                          {(
                            item.card.cardmarket.prices.averageSellPrice *
                            item.quantity
                          ).toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => onDecreaseQuantity(item.card.id)}
                          className="w-5 h-5 bg-card border border-accent/30 text-primary rounded flex items-center justify-center hover:bg-accent/20 transition-colors text-xs font-bold font-poppins"
                        >
                          -
                        </button>

                        <span className="text-primary font-semibold text-xs min-w-[16px] text-center font-poppins">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => onIncreaseQuantity(item.card.id)}
                          className="w-5 h-5 bg-accent text-white rounded flex items-center justify-center hover:bg-accent/80 transition-colors text-xs font-bold font-poppins"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveFromCart(item.card.id)}
                        className="text-accent hover:text-accent/80 transition-colors p-1 text-xs font-poppins"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="border-t border-accent/20 p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-secondary text-xs font-poppins">
                  Total card amount:
                </span>
                <span className="text-primary font-semibold text-sm font-poppins">
                  {totalItems}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-primary text-sm font-bold font-poppins">
                  Total price:
                </span>
                <span className="price px-3 py-1 rounded text-sm font-bold font-poppins">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <button className="w-full bg-accent text-white py-3 px-4 rounded-lg font-semibold hover:bg-accent/90 transition-all duration-200 font-poppins text-sm">
                <span className="flex items-center justify-center">
                  <span className="mr-2">💳</span>
                  Continue to Payment
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
