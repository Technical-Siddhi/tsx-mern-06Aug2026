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
