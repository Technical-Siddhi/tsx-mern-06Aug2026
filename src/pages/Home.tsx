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
  Footer,
} from '../components';
import { useCharacters } from '../hooks';
import { Character, FilterOptions } from '../types';

export const Home: React.FC = () => {
  // Page State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Filter Placeholder State (Unchanged per requirements)
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    species: '',
    homeworld: '',
    film: '',
  });

  // React Query SWAPI Live Data Integration
  const { data, isLoading, isError, error, refetch, isFetching } = useCharacters(currentPage);

  const characters = data?.results || [];
  const totalPages = data?.totalPages || 1;
  const totalCharacters = data?.count || 0;

  // Filter & Modal Handlers
  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      species: '',
      homeworld: '',
      film: '',
    });
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
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
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

            {/* Reusable Filter Panel */}
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Conditional Rendering: Error State vs Loading vs Live SWAPI Character Grid */}
          <div aria-live="polite">
            {isError ? (
              <ErrorState
                message={error?.message || 'Failed to establish SWAPI hyperdrive connection.'}
                onRetry={() => refetch()}
              />
            ) : isLoading ? (
              <SkeletonLoader count={8} />
            ) : characters.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-3xl backdrop-blur-md">
                <div
                  className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-mono font-bold text-xl"
                  aria-hidden="true"
                >
                  🔍
                </div>
                <h3 className="text-xl font-bold font-mono text-white mb-2">
                  No Holocron Records Found
                </h3>
                <p className="text-sm text-slate-400 mb-6">
                  No Star Wars characters returned from the Galactic Registry.
                </p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono text-xs font-bold uppercase transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  Reload SWAPI Registry
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Responsive Live SWAPI Character Grid */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {characters.map((character) => (
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
