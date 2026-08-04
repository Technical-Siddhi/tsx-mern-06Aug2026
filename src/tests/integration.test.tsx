import { describe, it, expect } from 'vitest';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { server } from './mocks/server';
import { renderWithProviders } from './test-utils';
import { Home } from '../pages/Home';

describe('Star Wars Application Integration Tests', () => {
  // Test 1: Character list renders successfully
  it('1. renders character list successfully after fetching', async () => {
    renderWithProviders(<Home />);

    const luke = await screen.findByText('Luke Skywalker');
    expect(luke).toBeInTheDocument();
    expect(screen.getByText('C-3PO')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });

  // Test 2: Loading skeleton appears while fetching
  it('2. displays loading skeleton while fetching character data', () => {
    renderWithProviders(<Home />);

    const skeletonRegion = screen.getByLabelText('Loading characters...');
    expect(skeletonRegion).toBeInTheDocument();
  });

  // Test 3: Error state appears when API fails
  it('3. displays error state when API request fails', async () => {
    server.use(
      http.get('*/people*', () => {
        return HttpResponse.json({ detail: 'SWAPI Error' }, { status: 500 });
      })
    );

    renderWithProviders(<Home />);

    const errorMessage = await screen.findByText('SWAPI Error', {}, { timeout: 3500 });
    expect(errorMessage).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /re-establish connection/i })).toBeInTheDocument();
  });

  // Test 4: Pagination changes the displayed characters
  it('4. pagination changes the displayed characters', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Home />);

    await screen.findByText('Luke Skywalker');

    const nextButton = screen.getByRole('button', { name: /next page/i });
    await user.click(nextButton);

    const obiWan = await screen.findByText('Obi-Wan Kenobi');
    expect(obiWan).toBeInTheDocument();
  });

  // Test 5: Clicking a character card opens the modal
  it('5. clicking a character card opens the character modal', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Home />);

    const lukeCard = await screen.findByRole('button', { name: /view details for luke skywalker/i });
    await user.click(lukeCard);

    const modalHeading = await screen.findByRole('heading', { level: 2, name: 'Luke Skywalker' });
    expect(modalHeading).toBeInTheDocument();
  });

  // Test 6: Modal displays character details
  it('6. modal displays complete character demographic details', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Home />);

    const lukeCard = await screen.findByRole('button', { name: /view details for luke skywalker/i });
    await user.click(lukeCard);

    // Character Name
    expect(await screen.findByRole('heading', { level: 2, name: 'Luke Skywalker' })).toBeInTheDocument();

    // Height & Mass
    const heightElements = await screen.findAllByText(/1.72 m/i);
    expect(heightElements.length).toBeGreaterThan(0);

    const massElements = await screen.findAllByText(/77 kg/i);
    expect(massElements.length).toBeGreaterThan(0);

    // Birth Year
    const birthYearElements = await screen.findAllByText('19BBY');
    expect(birthYearElements.length).toBeGreaterThan(0);

    // Created Date (Formatted via dd-MM-yyyy)
    const createdDateElements = await screen.findAllByText('09-12-2014');
    expect(createdDateElements.length).toBeGreaterThan(0);

    // Number of Films
    const filmElements = await screen.findAllByText(/2 Films/i);
    expect(filmElements.length).toBeGreaterThan(0);
  });

  // Test 7: Homeworld information loads correctly
  it('7. loads homeworld information correctly in the modal', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Home />);

    const lukeCard = await screen.findByRole('button', { name: /view details for luke skywalker/i });
    await user.click(lukeCard);

    // Homeworld details
    const homeworldElements = await screen.findAllByText('Tatooine');
    expect(homeworldElements.length).toBeGreaterThan(0);
    expect(await screen.findByText(/desert/i)).toBeInTheDocument();
    expect(await screen.findByText(/arid/i)).toBeInTheDocument();
  });

  // Test 8: Species information loads correctly
  it('8. loads species information correctly in the modal', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Home />);

    const lukeCard = await screen.findByRole('button', { name: /view details for luke skywalker/i });
    await user.click(lukeCard);

    // Species details
    const speciesElements = await screen.findAllByText('Human');
    expect(speciesElements.length).toBeGreaterThan(0);
  });

  // Test 9a: Closing modal via Close button
  it('9a. closes modal via Close button', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Home />);

    const lukeCard = await screen.findByRole('button', { name: /view details for luke skywalker/i });
    await user.click(lukeCard);

    const closeBtn = await screen.findByRole('button', { name: /close character details modal/i });
    await user.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByRole('heading', { level: 2, name: 'Luke Skywalker' })).not.toBeInTheDocument();
    });
  });

  // Test 9b: Closing modal via ESC key
  it('9b. closes modal via ESC key', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Home />);

    const lukeCard = await screen.findByRole('button', { name: /view details for luke skywalker/i });
    await user.click(lukeCard);
    await screen.findByRole('heading', { level: 2, name: 'Luke Skywalker' });

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });

    await waitFor(
      () => {
        expect(screen.queryByRole('heading', { level: 2, name: 'Luke Skywalker' })).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  // Test 9c: Closing modal via Backdrop click
  it('9c. closes modal via Backdrop click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Home />);

    const lukeCard = await screen.findByRole('button', { name: /view details for luke skywalker/i });
    await user.click(lukeCard);
    await screen.findByRole('heading', { level: 2, name: 'Luke Skywalker' });

    const backdrop = screen.getByTestId('modal-backdrop');
    fireEvent.click(backdrop);

    await waitFor(() => {
      expect(screen.queryByRole('heading', { level: 2, name: 'Luke Skywalker' })).not.toBeInTheDocument();
    });
  });

  // Test 10: Search filters the character list
  it('10. search input filters character list', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Home />);

    await screen.findByText('Luke Skywalker');

    const searchInput = screen.getByRole('textbox', { name: /search star wars characters/i });

    // Type search query
    await user.type(searchInput, 'Luke');

    // Wait for 300ms debounce
    await waitFor(
      () => {
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
        expect(screen.queryByText('C-3PO')).not.toBeInTheDocument();
        expect(screen.queryByText('Darth Vader')).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  // Test 11: Filters update the displayed results
  it('11. dropdown filters update the displayed results', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Home />);

    await screen.findByText('Luke Skywalker');

    const speciesFilter = screen.getByRole('combobox', { name: /filter by species/i });

    // Select Droid species filter
    await user.selectOptions(speciesFilter, 'Droid');

    await waitFor(() => {
      expect(screen.getByText('C-3PO')).toBeInTheDocument();
      expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
    });
  });
});
