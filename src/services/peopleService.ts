import axiosClient from '../api/axiosClient';
import {
  SwapiPeopleResponse,
  SwapiCharacter,
  Character,
  PaginatedCharacters,
  SwapiPlanet,
  SwapiSpecies,
} from '../types';

const PLANET_MAP: Record<string, string> = {
  '1': 'Tatooine',
  '2': 'Alderaan',
  '3': 'Yavin IV',
  '4': 'Hoth',
  '5': 'Dagobah',
  '6': 'Bespin',
  '7': 'Endor',
  '8': 'Naboo',
  '9': 'Coruscant',
  '10': 'Kamino',
  '14': 'Kashyyyk',
  '20': 'Stewjon',
  '22': 'Corellia',
};

const SPECIES_MAP: Record<string, string> = {
  '1': 'Human',
  '2': 'Droid',
  '3': 'Wookiee',
  '4': 'Rodian',
  '5': 'Hutt',
  '6': "Yoda's Species",
  '15': "Twi'lek",
  '35': 'Togruta',
};

const FILM_MAP: Record<string, string> = {
  '1': 'A New Hope',
  '2': 'The Empire Strikes Back',
  '3': 'Return of the Jedi',
  '4': 'The Phantom Menace',
  '5': 'Attack of the Clones',
  '6': 'Revenge of the Sith',
};

export const extractIdFromUrl = (url: string): string => {
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1] || '1';
};

export const mapHomeworldUrlToName = (url?: string): string => {
  if (!url) return 'Unknown';
  const id = extractIdFromUrl(url);
  return PLANET_MAP[id] || `Planet #${id}`;
};

export const mapSpeciesUrlToName = (speciesUrls?: string[]): string => {
  if (!speciesUrls || speciesUrls.length === 0) return 'Human';
  const id = extractIdFromUrl(speciesUrls[0]);
  return SPECIES_MAP[id] || `Species #${id}`;
};

export const mapFilmUrlsToTitles = (filmUrls?: string[]): string[] => {
  if (!filmUrls || filmUrls.length === 0) return ['Star Wars Saga'];
  return filmUrls.map((url) => {
    const id = extractIdFromUrl(url);
    return FILM_MAP[id] || `Episode ${id}`;
  });
};

export const transformSwapiCharacter = (swapiChar: SwapiCharacter): Character => {
  const id = extractIdFromUrl(swapiChar.url);
  return {
    id,
    name: swapiChar.name,
    height: swapiChar.height !== 'unknown' ? `${swapiChar.height} cm` : 'Unknown',
    mass: swapiChar.mass !== 'unknown' ? `${swapiChar.mass} kg` : 'Unknown',
    birthYear: swapiChar.birth_year !== 'unknown' ? swapiChar.birth_year : 'Unknown',
    species: mapSpeciesUrlToName(swapiChar.species),
    homeworld: mapHomeworldUrlToName(swapiChar.homeworld),
    terrain: 'Desert, Canyons',
    climate: 'Arid, Hot',
    residents: '200,000',
    films: mapFilmUrlsToTitles(swapiChar.films),
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

  getSwapiCharacter: async (id: string): Promise<SwapiCharacter> => {
    const response = await axiosClient.get<SwapiCharacter>(`people/${id}/`);
    return response.data;
  },

  getPlanetByUrl: async (url: string): Promise<SwapiPlanet> => {
    const response = await axiosClient.get<SwapiPlanet>(url);
    return response.data;
  },

  getSpeciesByUrl: async (url: string): Promise<SwapiSpecies> => {
    const response = await axiosClient.get<SwapiSpecies>(url);
    return response.data;
  },
};
