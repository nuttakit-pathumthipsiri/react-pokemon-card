import { Cart } from "./components/Cart";
import { Dropdown } from "./components/Dropdown";
import { Navbar } from "./components/Navbar";
import { PokemonCard as PokemonCardComponent } from "./components/PokemonCard";
import { useApp } from "./hooks/useApp";

function App() {
  const {
    // State
    cards,
    loading,
    filterOptionsLoading,
    error,
    filters,
    types,
    rarities,
    sets,

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
  } = useApp();

  return (
    <div className="min-h-screen bg-primary mt-2">
      <Navbar
        filters={filters}
        onFilterChange={handleFilterChange}
        onToggleCart={toggleCart}
        loading={loading}
      />

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
                options={sets}
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
