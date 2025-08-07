import type { PokemonApiResponse, Set } from "../types/pokemon";
import {
  mockPokemonCards,
  mockSets,
  mockTypes,
  mockRarities,
} from "./mockData";

const API_BASE_URL = "https://api.pokemontcg.io/v2";
const API_KEY = "your-api-key-here"; // You'll need to get an API key from https://dev.pokemontcg.io/

// Set this to true to use mock data instead of real API calls
const USE_MOCK_DATA = true;

// Custom error class for API errors
export class PokemonApiError extends Error {
  public status?: number;
  public statusText?: string;

  constructor(message: string, status?: number, statusText?: string) {
    super(message);
    this.name = "PokemonApiError";
    this.status = status;
    this.statusText = statusText;
  }
}

export class PokemonApiService {
  private static async makeRequest<T>(
    endpoint: string,
    params?: Record<string, string>,
    timeout: number = 10000
  ): Promise<T> {
    const url = new URL(`${API_BASE_URL}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          url.searchParams.append(key, value);
        }
      });
    }

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url.toString(), {
        headers: {
          "X-Api-Key": API_KEY,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new PokemonApiError(
          `API request failed: ${response.statusText}`,
          response.status,
          response.statusText
        );
      }

      return response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof PokemonApiError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new PokemonApiError("Request timeout. Please try again.");
        }
        throw new PokemonApiError(`Network error: ${error.message}`);
      }

      throw new PokemonApiError("An unexpected error occurred");
    }
  }

  static async getCards(
    params: {
      page?: number;
      pageSize?: number;
      q?: string;
      types?: string;
      rarities?: string;
      set?: string;
    } = {}
  ): Promise<PokemonApiResponse> {
    if (USE_MOCK_DATA) {
      // Simulate API delay with some randomness
      await new Promise((resolve) =>
        setTimeout(resolve, 300 + Math.random() * 400)
      );

      // Return mock data with basic filtering
      let filteredData = [...mockPokemonCards.data];

      // Filter by name if search query is provided
      if (params.q) {
        const searchTerm = params.q
          .replace(/name:"([^"]*)"/, "$1")
          .toLowerCase();
        filteredData = filteredData.filter((card) =>
          card.name.toLowerCase().includes(searchTerm)
        );
      }

      // Filter by type if provided
      if (params.types) {
        filteredData = filteredData.filter((card) =>
          card.types.some(
            (type) => type.toLowerCase() === params.types!.toLowerCase()
          )
        );
      }

      // Filter by rarity if provided
      if (params.rarities) {
        filteredData = filteredData.filter(
          (card) => card.rarity.toLowerCase() === params.rarities!.toLowerCase()
        );
      }

      // Filter by set if provided
      if (params.set) {
        filteredData = filteredData.filter(
          (card) => card.set.id.toLowerCase() === params.set!.toLowerCase()
        );
      }

      const page = params.page || 1;
      const pageSize = params.pageSize || 20;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedData = filteredData.slice(startIndex, endIndex);

      return {
        data: paginatedData,
        page,
        pageSize,
        count: paginatedData.length,
        totalCount: filteredData.length,
      };
    }

    const queryParams: Record<string, string> = {};

    if (params.page) queryParams.page = params.page.toString();
    if (params.pageSize) queryParams.pageSize = params.pageSize.toString();
    if (params.q) queryParams.q = params.q;
    if (params.types) queryParams.types = params.types;
    if (params.rarities) queryParams.rarities = params.rarities;
    if (params.set) queryParams.set = params.set;

    return this.makeRequest<PokemonApiResponse>("/cards", queryParams);
  }

  static async getSets(): Promise<{ data: Set[] }> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) =>
        setTimeout(resolve, 200 + Math.random() * 200)
      );
      return mockSets;
    }
    return this.makeRequest<{ data: Set[] }>("/sets");
  }

  static async getTypes(): Promise<{ data: string[] }> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) =>
        setTimeout(resolve, 200 + Math.random() * 200)
      );
      return mockTypes;
    }
    return this.makeRequest<{ data: string[] }>("/types");
  }

  static async getRarities(): Promise<{ data: string[] }> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) =>
        setTimeout(resolve, 200 + Math.random() * 200)
      );
      return mockRarities;
    }
    return this.makeRequest<{ data: string[] }>("/rarities");
  }
}
