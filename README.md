# Pokemon Card Market

A Pokemon card marketplace application built with React, TypeScript, and Tailwind CSS.

## How to Run the Project

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory by copying from `.env.example`:

```bash
cp .env.example .env
```

Or create `.env` manually with these variables:

```env
# Set to true to use mock data instead of real API calls (default: true)
VITE_USE_MOCK_DATA=true

# Pokemon TCG API base URL (default: https://api.pokemontcg.io/v2)
VITE_POKEMON_API_BASE_URL=https://api.pokemontcg.io/v2

# Your Pokemon TCG API key from https://dev.pokemontcg.io/
VITE_POKEMON_API_KEY=your-api-key-here
```

#### API Key Setup

To use real Pokemon TCG API data:

1. Get an API key from [Pokemon TCG Developer Portal](https://dev.pokemontcg.io/)
2. Set `VITE_POKEMON_API_KEY=your-actual-api-key` in your `.env` file
3. Set `VITE_USE_MOCK_DATA=false` in your `.env` file

**Note**: The app uses mock data by default for development purposes.

### 3. Run the Project in Development Mode

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## How to Build the Project

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

### Preview Built Files

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Run development server
- `npm run build` - Build for production
- `npm run preview` - Preview built files
- `npm run lint` - Check code with ESLint

## Technologies Used

- React 19
- TypeScript
- Tailwind CSS
- Vite
