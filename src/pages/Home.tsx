import React, { useState, useMemo } from 'react';
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
import { MOCK_CHARACTERS } from '../data/mockCharacters';
import { Character, FilterOptions } from '../types';

const ITEMS_PER_PAGE = 4;

export const Home: React.FC = () => {
  // State Management
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    species: '',
    homeworld: '',
    film: '',
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // Filter Handler
  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      species: '',
      homeworld: '',
      film: '',
    });
    setCurrentPage(1);
  };

  // Filtered Characters Memoization
  const filteredCharacters = useMemo(() => {
    return MOCK_CHARACTERS.filter((char) => {
      const matchesSearch =
        !filters.search ||
        char.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        char.species.toLowerCase().includes(filters.search.toLowerCase()) ||
        char.homeworld.toLowerCase().includes(filters.search.toLowerCase());

      const matchesSpecies = !filters.species || char.species === filters.species;
      const matchesHomeworld = !filters.homeworld || char.homeworld === filters.homeworld;
      const matchesFilm = !filters.film || char.films.includes(filters.film);

      return matchesSearch && matchesSpecies && matchesHomeworld && matchesFilm;
    });
  }, [filters]);

  // Pagination Logic
  const totalPages = Math.max(1, Math.ceil(filteredCharacters.length / ITEMS_PER_PAGE));

  const paginatedCharacters = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCharacters.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCharacters, currentPage]);

  // Modal Handlers
  const handleViewDetails = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

  // Quick Demo Controls
  const toggleSimulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-amber-400 selection:text-slate-950">
      <div>
        {/* Navigation Bar (No Search) */}
        <Navbar />

        {/* Hero Section (Reduced Height) */}
        <HeroSection totalCharacters={filteredCharacters.length} />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Controls Bar: Search & Filter Panel (Responsive Grid/Flex) */}
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* Single Search Bar */}
              <div className="flex-1 max-w-xl">
                <SearchBar
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>

              {/* Demo Controls */}
              <div className="flex items-center space-x-2 self-end lg:self-auto">
                <button
                  type="button"
                  onClick={toggleSimulateLoading}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 text-slate-300 hover:text-amber-400 text-xs font-mono transition shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  title="Simulate Skeleton Loading"
                >
                  ⏳ Simulate Loading
                </button>
                <button
                  type="button"
                  onClick={() => setIsError(!isError)}
                  className={`px-3 py-2 rounded-xl border text-xs font-mono transition shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    isError
                      ? 'bg-red-500/20 border-red-500 text-red-300'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-red-400'
                  }`}
                  title="Toggle Error State"
                >
                  ⚠️ {isError ? 'Clear Error' : 'Test Error State'}
                </button>
              </div>
            </div>

            {/* Reusable Filter Panel */}
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Conditional Rendering: Error State vs Loading vs Character Grid */}
          <div aria-live="polite">
            {isError ? (
              <ErrorState onRetry={() => setIsError(false)} />
            ) : isLoading ? (
              <SkeletonLoader count={4} />
            ) : paginatedCharacters.length === 0 ? (
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
                  No Star Wars characters match your current search and filter parameters.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono text-xs font-bold uppercase transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  Clear Active Filters
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Responsive Character Grid (Mobile 1 col, Tablet 2 cols, Laptop 3 cols, Desktop 4 cols) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage + JSON.stringify(filters)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {paginatedCharacters.map((character) => (
                      <CharacterCard
                        key={character.id}
                        character={character}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Pagination Component */}
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
