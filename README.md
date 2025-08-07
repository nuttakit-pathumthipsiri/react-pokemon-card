# Pokemon Card Market

A modern, responsive Pokemon card marketplace built with React, TypeScript, and Tailwind CSS. This application allows users to browse, search, filter, and purchase Pokemon cards with a fully functional shopping cart.

## Features

### 🎴 Card Display

- **20 cards per page** with pagination
- **Card information** including name, set, rarity, type, and price
- **Price display** using CardMarket average sell price
- **Quantity information** from set total
- **Beautiful card images** with hover effects

### 🔍 Search & Filtering

- **Search by name** - Real-time search functionality
- **Filter by Type** - Fire, Water, Grass, Electric, Psychic, etc.
- **Filter by Rarity** - Common, Uncommon, Rare, Holo Rare, etc.
- **Filter by Set** - Base Set, Jungle, Fossil, etc.
- **Clear filters** option for easy reset

### 🛒 Shopping Cart

- **Right-side cart** that stays visible while browsing
- **Add/remove items** with quantity controls
- **Real-time total calculation** for items and price
- **Clear all** functionality
- **Sticky positioning** for better UX

### 🎨 Modern UI/UX

- **Responsive design** that works on all devices
- **Beautiful gradients** and modern styling
- **Loading states** with spinners
- **Error handling** with user-friendly messages
- **Smooth animations** and transitions

## Technology Stack

- **React 19** - Latest React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Pokemon TCG API** - Official Pokemon card data

## Project Structure

```
src/
├── components/          # React components
│   ├── PokemonCard.tsx  # Individual card display
│   ├── Cart.tsx         # Shopping cart component
│   ├── FilterBar.tsx    # Search and filter controls
│   ├── Pagination.tsx   # Page navigation
│   └── LoadingSpinner.tsx # Loading indicator
├── hooks/               # Custom React hooks
│   └── useCart.ts       # Cart management logic
├── services/            # API services
│   └── pokemonApi.ts    # Pokemon TCG API integration
├── types/               # TypeScript type definitions
│   └── pokemon.ts       # Pokemon card types
└── App.tsx              # Main application component
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd react-pokemon-card
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### API Configuration

To use real Pokemon TCG API data:

1. Get an API key from [Pokemon TCG Developer Portal](https://dev.pokemontcg.io/)
2. Update the `API_KEY` constant in `src/services/pokemonApi.ts`
3. Uncomment the API calls in `src/App.tsx`

Currently, the app uses mock data for development purposes.

## Mock Data System

The application includes a comprehensive mock data system for development and testing purposes. This allows you to work with realistic Pokemon card data without requiring an API key.

### Included Mock Data

#### Pokemon Cards

- **7 Pokemon cards** with complete data including:
  - Basic card information (name, HP, types, attacks, etc.)
  - Set information (series, release date, legalities)
  - Pricing data from TCGPlayer and Cardmarket
  - Images and artwork details
  - Rarity and collector information

#### Sets

- **25+ Pokemon card sets** including:
  - **Base Series**: Base Set, Jungle, Fossil, Base Set 2, Team Rocket
  - **Gym Series**: Gym Heroes, Gym Challenge
  - **Neo Series**: Neo Genesis, Neo Discovery, Neo Revelation, Neo Destiny
  - **E-Card Series**: Expedition Base Set, Aquapolis, Skyridge
  - **EX Series**: Ruby & Sapphire through Power Keepers (16 sets)
  - **Diamond & Pearl Series**: Diamond & Pearl through Stormfront (7 sets)
  - **Platinum Series**: Platinum through Arceus (4 sets)
  - **HeartGold & SoulSilver Series**: HeartGold & SoulSilver through Call of Legends (5 sets)

#### Types & Rarities

- **11 Pokemon types**: Colorless, Darkness, Dragon, Fairy, Fighting, Fire, Grass, Lightning, Metal, Psychic, Water
- **35 Rarities**: Including Common, Uncommon, Rare, Rare Holo, Rare Holo GX, Rare Holo V, Rare Holo VMAX, Rare Holo VSTAR, Rare Secret, Ultra Rare, Hyper Rare, Illustration Rare, Special Illustration Rare, and many more special rarities from different Pokemon TCG eras

### Using Mock Data

The mock data system is controlled by the `USE_MOCK_DATA` flag in `src/services/pokemonApi.ts`:

```typescript
const USE_MOCK_DATA = true; // Set to false to use real API
```

When enabled, the API service will:

- Return mock data instead of making real API calls
- Simulate network delays (300-500ms) for realistic behavior
- Support all filtering and pagination features
- Maintain the same data structure as the real API

### Mock Data Features

- **Realistic data structure** matching the Pokemon TCG API
- **Complete card information** with all required fields
- **Proper TypeScript types** for type safety
- **Filtering support** for name, type, rarity, and set
- **Pagination support** with proper page counts
- **Price data** from multiple sources (TCGPlayer, Cardmarket)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

The application integrates with the [Pokemon TCG API](https://pokemontcg.io/) to fetch:

- **Cards** - Pokemon card data with prices and details
- **Sets** - Available card sets for filtering
- **Types** - Pokemon types for filtering
- **Rarities** - Card rarities for filtering

### API Endpoints Used

- `GET /cards` - Fetch cards with pagination and filters
- `GET /sets` - Get all available sets
- `GET /types` - Get all Pokemon types
- `GET /rarities` - Get all card rarities

## Features Implementation

### Card Display

- Cards are displayed in a responsive grid
- Each card shows image, name, set, rarity, type, price, and quantity
- Hover effects and smooth transitions
- Loading states for better UX

### Search & Filtering

- Real-time search by card name
- Dropdown filters for type, rarity, and set
- Combined filtering (multiple filters work together)
- Clear filters functionality

### Shopping Cart

- Add cards to cart with one click
- Increase/decrease quantities
- Remove individual items
- Clear entire cart
- Real-time total calculation
- Sticky positioning for easy access

### Pagination

- 20 cards per page
- Smart pagination with ellipsis for large page counts
- Previous/Next navigation
- Current page highlighting

## Design Decisions

### TypeScript

- Full type safety for better development experience
- Interface definitions for all data structures
- Type-safe API responses

### Tailwind CSS

- Utility-first approach for rapid development
- Responsive design with mobile-first approach
- Consistent spacing and color system
- Beautiful gradients and modern styling

### Component Architecture

- Modular component design
- Custom hooks for state management
- Separation of concerns
- Reusable components

### State Management

- React hooks for local state
- Custom `useCart` hook for cart functionality
- Optimized re-renders with `useCallback`

## Future Enhancements

- [ ] User authentication
- [ ] Wishlist functionality
- [ ] Card details modal
- [ ] Advanced filtering options
- [ ] Price history charts
- [ ] Card condition selection
- [ ] Checkout process
- [ ] Order history
- [ ] User reviews and ratings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Pokemon TCG API](https://pokemontcg.io/) for providing the card data
- [Figma Design](https://www.figma.com/file/OvbAJ7yvTzB3Yk8oIwSycd/Pokemon-Card-Market) for design inspiration
- React and Tailwind CSS communities for excellent documentation
