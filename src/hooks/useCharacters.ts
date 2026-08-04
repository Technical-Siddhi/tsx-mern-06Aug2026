import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { peopleService } from '../services';
import { PaginatedCharacters } from '../types';

export const useCharacters = (page: number) => {
  return useQuery<PaginatedCharacters, Error>({
    queryKey: ['characters', page],
    queryFn: () => peopleService.getCharacters(page),
    staleTime: 5 * 60 * 1000,
    retry: 1,
    placeholderData: keepPreviousData,
  });
};
