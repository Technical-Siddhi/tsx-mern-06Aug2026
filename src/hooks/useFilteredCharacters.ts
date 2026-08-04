import { useMemo } from 'react';
import { Character, FilterOptions } from '../types';

export const useFilteredCharacters = (
  characters: Character[],
  filters: FilterOptions
) => {
  // Extract dynamic unique species list from loaded characters
  const availableSpecies = useMemo(() => {
    const set = new Set<string>();
    characters.forEach((char) => {
      if (char.species) set.add(char.species);
    });
    return Array.from(set).sort();
  }, [characters]);

  // Extract dynamic unique homeworld list from loaded characters
  const availableHomeworlds = useMemo(() => {
    const set = new Set<string>();
    characters.forEach((char) => {
      if (char.homeworld) set.add(char.homeworld);
    });
    return Array.from(set).sort();
  }, [characters]);

  // Extract dynamic unique films list from loaded characters
  const availableFilms = useMemo(() => {
    const set = new Set<string>();
    characters.forEach((char) => {
      if (Array.isArray(char.films)) {
        char.films.forEach((film) => set.add(film));
      }
    });
    return Array.from(set).sort();
  }, [characters]);

  // Combined filtering logic optimized with useMemo
  const filteredCharacters = useMemo(() => {
    const searchNormalized = filters.search.trim().toLowerCase();

    return characters.filter((char) => {
      // 1. Search by character name (case-insensitive partial match)
      if (searchNormalized && !char.name.toLowerCase().includes(searchNormalized)) {
        return false;
      }

      // 2. Filter by Species
      if (filters.species && char.species.toLowerCase() !== filters.species.toLowerCase()) {
        return false;
      }

      // 3. Filter by Homeworld
      if (filters.homeworld && char.homeworld.toLowerCase() !== filters.homeworld.toLowerCase()) {
        return false;
      }

      // 4. Filter by Film
      if (
        filters.film &&
        !char.films.some((f) => f.toLowerCase() === filters.film.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [characters, filters]);

  return {
    filteredCharacters,
    availableSpecies,
    availableHomeworlds,
    availableFilms,
  };
};

export default useFilteredCharacters;
