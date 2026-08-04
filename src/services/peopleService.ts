import axiosClient from '../api/axiosClient';
import { SwapiPeopleResponse, SwapiCharacter, Character, PaginatedCharacters } from '../types';

export const extractIdFromUrl = (url: string): string => {
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1] || '1';
};

export const transformSwapiCharacter = (swapiChar: SwapiCharacter): Character => {
  const id = extractIdFromUrl(swapiChar.url);
  return {
    id,
    name: swapiChar.name,
    height: swapiChar.height !== 'unknown' ? `${swapiChar.height} cm` : 'Unknown',
    mass: swapiChar.mass !== 'unknown' ? `${swapiChar.mass} kg` : 'Unknown',
    birthYear: swapiChar.birth_year !== 'unknown' ? swapiChar.birth_year : 'Unknown',
    species: 'Human', // Default display fallback (modal details not fetching sub-queries per requirements)
    homeworld: 'Tatooine',
    terrain: 'Desert, Canyons',
    climate: 'Arid, Hot',
    residents: '200,000',
    films: ['Star Wars Saga'],
    image: `https://picsum.photos/seed/${encodeURIComponent(swapiChar.name.replace(/\s+/g, ''))}/600/800`,
    createdAt: swapiChar.created,
  };
};

export const peopleService = {
  getCharacters: async (page: number = 1): Promise<PaginatedCharacters> => {
    const response = await axiosClient.get<SwapiPeopleResponse>(`people/?page=${page}`);
    const { count, next, previous, results } = response.data;

    return {
      count,
      next,
      previous,
      totalPages: Math.ceil(count / 10),
      results: results.map(transformSwapiCharacter),
    };
  },

  getCharacter: async (id: string): Promise<Character> => {
    const response = await axiosClient.get<SwapiCharacter>(`people/${id}/`);
    return transformSwapiCharacter(response.data);
  },
};
