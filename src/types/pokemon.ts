export interface PokemonCard {
  id: string;
  name: string;
  supertype?: string;
  subtypes?: string[];
  level?: string;
  hp: string;
  types: string[];
  evolvesFrom?: string;
  evolvesTo?: string[];
  attacks: Array<{
    name: string;
    cost: string[];
    convertedEnergyCost: number;
    damage: string;
    text: string;
  }>;
  abilities?: Array<{
    name: string;
    text: string;
    type: string;
  }>;
  weaknesses: Array<{
    type: string;
    value: string;
  }>;
  resistances?: Array<{
    type: string;
    value: string;
  }>;
  retreatCost?: string[];
  convertedRetreatCost: number;
  set: {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    legalities?: {
      unlimited: string;
      expanded?: string;
    };
    ptcgoCode: string;
    releaseDate: string;
    updatedAt: string;
    images: {
      symbol: string;
      logo: string;
    };
  };
  number: string;
  artist: string;
  rarity: string;
  flavorText?: string;
  nationalPokedexNumbers: number[];
  legalities: {
    unlimited: string;
    standard?: string;
    expanded?: string;
  };
  images: {
    small: string;
    large: string;
  };
  tcgplayer: {
    url: string;
    updatedAt: string;
    prices: {
      holofoil?: {
        low: number;
        mid: number;
        high: number;
        market: number;
        directLow: number | null;
      };
      normal?: {
        low: number;
        mid: number;
        high: number;
        market: number;
        directLow: number | null;
      };
      reverseHolofoil?: {
        low: number;
        mid: number;
        high: number;
        market: number;
        directLow: number | null;
      };
      "1stEditionHolofoil"?: {
        low: number;
        mid: number;
        high: number;
        market: number;
        directLow: number | null;
      };
      unlimitedHolofoil?: {
        low: number;
        mid: number;
        high: number;
        market: number;
        directLow: number | null;
      };
    };
  };
  cardmarket: {
    url: string;
    updatedAt: string;
    prices: {
      averageSellPrice: number;
      lowPrice: number;
      trendPrice: number;
      germanProLow: number;
      suggestedPrice: number;
      reverseHoloSell: number;
      reverseHoloLow: number;
      reverseHoloTrend: number;
      lowPriceExPlus: number;
      avg1: number;
      avg7: number;
      avg30: number;
      reverseHoloAvg1: number;
      reverseHoloAvg7: number;
      reverseHoloAvg30: number;
    };
  };
  rules?: string[];
  regulationMark?: string;
}

export interface PokemonApiResponse {
  data: PokemonCard[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}

export interface CartItem {
  card: PokemonCard;
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
