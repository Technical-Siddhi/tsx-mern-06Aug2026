import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Navbar,
  HeroSection,
  SearchBar,
  FilterPanel,
  CharacterCard,
  CharacterModal,
  Pagination,
  SkeletonLoader,
  ErrorState,
  EmptyState,
  Footer,
} from '../components';
import { useCharacters, useDebounce, useFilteredCharacters } from '../hooks';
import { Character, FilterOptions } from '../types';

export const Home: React.FC = () => {
  // Page State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Search Input State (Immediate response for fluid input typing)
  const [searchInput, setSearchInput] = useState<string>('');

  // Debounce search input by 300ms
  const debouncedSearch = useDebounce(searchInput, 300);

  // Filter Dropdown Options State
  const [filters, setFilters] = useState<Omit<FilterOptions, 'search'>>({
    species: '',
    homeworld: '',
    film: '',
  });

  // Combined Active Filters Object (using 300ms debounced search)
  const activeFilters: FilterOptions = {
    search: debouncedSearch,
    species: filters.species,
    homeworld: filters.homeworld,
    film: filters.film,
  };

  // React Query SWAPI Live Data Integration
  const { data, isLoading, isError, error, refetch, isFetching } = useCharacters(currentPage);

  const rawCharacters = data?.results || [];
  const totalPages = data?.totalPages || 1;
  const totalCharacters = data?.count || 0;

  // Custom hook for memoized filtering & dynamic dropdown lists
  const { filteredCharacters, availableSpecies, availableHomeworlds, availableFilms } =
    useFilteredCharacters(rawCharacters, activeFilters);

  // Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setCurrentPage(1); // Reset page on search change
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setCurrentPage(1);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    if (key === 'search') {
      setSearchInput(value);
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
    setCurrentPage(1); // Reset page on filter change
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setFilters({
      species: '',
      homeworld: '',
      film: '',
    });
    setCurrentPage(1);
  };

  const handleViewDetails = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-amber-400 selection:text-slate-950">
      <div>
        {/* Navigation Bar */}
        <Navbar />

        {/* Hero Section */}
        <HeroSection totalCharacters={totalCharacters} />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Controls Bar: Search & Filter Panel */}
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              <div className="flex-1 max-w-xl">
                <SearchBar
                  value={searchInput}
                  onChange={handleSearchChange}
                  onClear={handleClearSearch}
                />
              </div>

              {/* Status Indicator */}
              {isFetching && !isLoading && (
                <div className="self-end lg:self-auto text-xs font-mono text-amber-400 animate-pulse flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>Fetching Galactic Codex...</span>
                </div>
              )}
            </div>

            {/* Reusable Filter Panel with Dynamic Options */}
            <FilterPanel
              filters={activeFilters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              speciesList={availableSpecies}
              homeworldList={availableHomeworlds}
              filmsList={availableFilms}
            />
          </div>

          {/* Conditional Rendering: Error State vs Loading vs Live SWAPI Character Grid vs EmptyState */}
          <div aria-live="polite">
            {isError ? (
              <ErrorState
                message={error?.message || 'Failed to establish SWAPI hyperdrive connection.'}
                onRetry={() => refetch()}
              />
            ) : isLoading ? (
              <SkeletonLoader count={8} />
            ) : filteredCharacters.length === 0 ? (
              <EmptyState onResetFilters={handleResetFilters} />
            ) : (
              <div className="space-y-8">
                {/* Responsive Live SWAPI Character Grid */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentPage}-${searchInput}-${filters.species}-${filters.homeworld}-${filters.film}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {filteredCharacters.map((character) => (
                      <CharacterCard
                        key={character.id}
                        character={character}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* SWAPI Paginated Navigation */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Character Details Modal */}
      <CharacterModal
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Application Footer */}
      <Footer />
    </div>
  );
};

export default Home;
