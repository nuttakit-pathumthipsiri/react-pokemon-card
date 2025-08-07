export interface FilteredPokemonCard {
  id: string;
  name: string;
  hp: string;
  types: string[];
  rarity: string;
  set: {
    id: string;
    name: string;
    series: string;
    total: number;
  };
  number: string;
  artist: string;
  images: {
    small: string;
    large: string;
  };
  cardmarket: {
    url: string;
    updatedAt: string;
    prices: {
      averageSellPrice: number;
      lowPrice: number;
      trendPrice: number;
      suggestedPrice: number;
    };
  };
}

export interface PokemonApiResponse {
  data: FilteredPokemonCard[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}

export interface CartItem {
  card: FilteredPokemonCard;
  quantity: number;
}

export interface FilterOptions {
  name: string;
  type: string;
  rarity: string;
  set: string;
}

export interface Set {
  id: string;
  name: string;
  series: string;
}
