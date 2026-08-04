export interface SwapiCharacter {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface SwapiPeopleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SwapiCharacter[];
}

export interface Character {
  id: string;
  name: string;
  species: string;
  birthYear: string;
  height: string;
  mass: string;
  homeworld: string;
  terrain: string;
  climate: string;
  residents: string;
  films: string[];
  image: string;
  createdAt: string;
}

export interface PaginatedCharacters {
  count: number;
  next: string | null;
  previous: string | null;
  totalPages: number;
  results: Character[];
}

export interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
}

export interface Species {
  name: string;
  classification: string;
  designation: string;
  language: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}

export interface FilterOptions {
  search: string;
  species: string;
  homeworld: string;
  film: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
