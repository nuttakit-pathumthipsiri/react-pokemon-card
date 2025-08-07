import React from "react";
import type { CartItem } from "../types/pokemon";
import { CartIcon } from "./icons/CartIcon";
import { PlusIcon } from "./icons/PlusIcon";
import { MinusIcon } from "./icons/MinusIcon";
import { CloseIcon } from "./icons/CloseIcon";

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
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-primary font-poppins">
              Cart
            </h2>
            {cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-secondary hover:text-secondary/80 text-xs font-medium transition-colors font-poppins underline"
              >
                Clear all
              </button>
            )}
          </div>
          {onCloseCart && (
            <button
              onClick={onCloseCart}
              className="bg-accent text-white p-2 rounded-lg hover:bg-accent/90 transition-all duration-200 font-poppins text-sm"
            >
              <CloseIcon size={14} />
            </button>
          )}
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
            {/* Cart Items Table */}
            <div className="flex-1 px-4">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-2 mb-3 text-xs text-secondary font-medium font-poppins pb-2">
                <div className="col-span-3">Item</div>
                <div className="col-span-6">Qty</div>
                <div className="col-span-3 text-right">Price</div>
                <div className="col-span-12">
                  <hr className="border-t border-gray-700/30" />
                </div>
              </div>

              {/* Table Items */}
              <div className="space-y-3 overflow-y-auto max-h-96">
                {cartItems.map((item) => (
                  <div
                    key={item.card.id}
                    className="flex flex-col gap-2 items-start"
                  >
                    {/* Item Column */}
                    <div className="flex justify-between w-full items-start">
                      <div className="flex items-start space-x-2 mb-2">
                        <img
                          src={item.card.images.small}
                          alt={item.card.name}
                          className="w-14 h-18 object-cover rounded"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-primary font-medium text-xs truncate font-poppins">
                            {item.card.name}
                          </h4>
                          <p className="text-gray-600 font-bold text-xs font-poppins">
                            $
                            {item.card.cardmarket.prices.averageSellPrice.toFixed(
                              2
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Price Column */}
                      <div className="flex items-center justify-end">
                        <span className="text-white font-bold text-xs font-poppins">
                          $
                          {(
                            item.card.cardmarket.prices.averageSellPrice *
                            item.quantity
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    {/* Quantity Controls below image */}
                    <div className="grid grid-cols-12 items-center justify-start w-full gap-2">
                      <button
                        onClick={() => onDecreaseQuantity(item.card.id)}
                        className="col-span-2 h-10 bg-gray-600 border border-gray-500 text-gray-300 rounded flex items-center justify-center hover:bg-gray-500 transition-colors font-poppins"
                      >
                        <MinusIcon size={16} />
                      </button>

                      <span className="col-span-8 text-primary font-semibold text-base text-center font-poppins bg-gray-600 border border-gray-500 rounded py-2 px-2">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => onIncreaseQuantity(item.card.id)}
                        className="col-span-2 h-10 bg-gray-600 border border-gray-500 text-gray-300 rounded flex items-center justify-center hover:bg-gray-500 transition-colors font-poppins"
                      >
                        <PlusIcon size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-secondary text-xs font-poppins">
                  Total card amount:
                </span>
                <span className="text-primary font-semibold text-sm font-poppins">
                  {totalItems}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-secondary text-xs font-poppins">
                  Total price:
                </span>
                <span className="text-white font-semibold text-sm font-poppins">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <button className="w-full bg-accent text-white py-3 px-4 rounded-lg font-semibold hover:bg-accent/90 transition-all duration-200 font-poppins text-sm">
                Continue to Payment
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
