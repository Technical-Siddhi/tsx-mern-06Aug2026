import { useQuery } from '@tanstack/react-query';
import { peopleService } from '../services';
import { SwapiCharacter, SwapiPlanet, SwapiSpecies } from '../types';

export const useCharacterDetails = (id: string | null) => {
  return useQuery<SwapiCharacter, Error>({
    queryKey: ['character', id],
    queryFn: () => peopleService.getSwapiCharacter(id!),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
};

export const usePlanetDetails = (url: string | null) => {
  return useQuery<SwapiPlanet, Error>({
    queryKey: ['planet', url],
    queryFn: () => peopleService.getPlanetByUrl(url!),
    enabled: Boolean(url),
    staleTime: 10 * 60 * 1000,
  });
};

export const useSpeciesDetails = (url: string | null) => {
  return useQuery<SwapiSpecies, Error>({
    queryKey: ['species', url],
    queryFn: () => peopleService.getSpeciesByUrl(url!),
    enabled: Boolean(url),
    staleTime: 10 * 60 * 1000,
  });
};
