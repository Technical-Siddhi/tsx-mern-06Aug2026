import { http, HttpResponse } from 'msw';

export const mockPeoplePage1 = {
  count: 15,
  next: 'https://swapi.py4e.com/api/people/?page=2',
  previous: null,
  results: [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.py4e.com/api/planets/1/',
      films: ['https://swapi.py4e.com/api/films/1/', 'https://swapi.py4e.com/api/films/2/'],
      species: ['https://swapi.py4e.com/api/species/1/'],
      vehicles: [],
      starships: [],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.py4e.com/api/people/1/',
    },
    {
      name: 'C-3PO',
      height: '167',
      mass: '75',
      hair_color: 'n/a',
      skin_color: 'gold',
      eye_color: 'yellow',
      birth_year: '112BBY',
      gender: 'n/a',
      homeworld: 'https://swapi.py4e.com/api/planets/1/',
      films: ['https://swapi.py4e.com/api/films/1/'],
      species: ['https://swapi.py4e.com/api/species/2/'],
      vehicles: [],
      starships: [],
      created: '2014-12-10T15:10:51.644000Z',
      edited: '2014-12-20T21:17:50.309000Z',
      url: 'https://swapi.py4e.com/api/people/2/',
    },
    {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      hair_color: 'none',
      skin_color: 'white',
      eye_color: 'yellow',
      birth_year: '41.9BBY',
      gender: 'male',
      homeworld: 'https://swapi.py4e.com/api/planets/1/',
      films: ['https://swapi.py4e.com/api/films/1/'],
      species: ['https://swapi.py4e.com/api/species/1/'],
      vehicles: [],
      starships: [],
      created: '2014-12-10T15:18:20.704000Z',
      edited: '2014-12-20T21:17:50.313000Z',
      url: 'https://swapi.py4e.com/api/people/4/',
    },
  ],
};

export const mockPeoplePage2 = {
  count: 15,
  next: null,
  previous: 'https://swapi.py4e.com/api/people/?page=1',
  results: [
    {
      name: 'Obi-Wan Kenobi',
      height: '182',
      mass: '77',
      hair_color: 'auburn, white',
      skin_color: 'fair',
      eye_color: 'blue-gray',
      birth_year: '57BBY',
      gender: 'male',
      homeworld: 'https://swapi.py4e.com/api/planets/2/',
      films: ['https://swapi.py4e.com/api/films/1/'],
      species: ['https://swapi.py4e.com/api/species/1/'],
      vehicles: [],
      starships: [],
      created: '2014-12-10T16:16:29.192000Z',
      edited: '2014-12-20T21:17:50.325000Z',
      url: 'https://swapi.py4e.com/api/people/6/',
    },
  ],
};

export const handlers = [
  // GET /people or /people/ with query param
  http.get('*/people', ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');

    if (page === '2') {
      return HttpResponse.json(mockPeoplePage2);
    }
    return HttpResponse.json(mockPeoplePage1);
  }),

  http.get('*/people/', ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');

    if (page === '2') {
      return HttpResponse.json(mockPeoplePage2);
    }
    return HttpResponse.json(mockPeoplePage1);
  }),

  // GET /people/:id
  http.get('*/people/:id', ({ params }) => {
    const cleanId = String(params.id).replace(/\/$/, '');
    if (cleanId === '2') {
      return HttpResponse.json(mockPeoplePage1.results[1]);
    }
    return HttpResponse.json(mockPeoplePage1.results[0]);
  }),

  // GET /planets/*
  http.get('*/planets/*', ({ request }) => {
    const url = new URL(request.url);
    const parts = url.pathname.split('/').filter(Boolean);
    const id = parts[parts.length - 1] || '1';

    if (id === '2') {
      return HttpResponse.json({
        name: 'Alderaan',
        terrain: 'grasslands, mountains',
        climate: 'temperate',
        population: '2000000000',
        url: 'https://swapi.py4e.com/api/planets/2/',
      });
    }
    return HttpResponse.json({
      name: 'Tatooine',
      terrain: 'desert',
      climate: 'arid',
      population: '200000',
      url: 'https://swapi.py4e.com/api/planets/1/',
    });
  }),

  // GET /species/*
  http.get('*/species/*', ({ request }) => {
    const url = new URL(request.url);
    const parts = url.pathname.split('/').filter(Boolean);
    const id = parts[parts.length - 1] || '1';

    if (id === '2') {
      return HttpResponse.json({
        name: 'Droid',
        classification: 'artificial',
        designation: 'sentient',
        language: 'binary',
        url: 'https://swapi.py4e.com/api/species/2/',
      });
    }
    return HttpResponse.json({
      name: 'Human',
      classification: 'mammal',
      designation: 'sentient',
      language: 'Galactic Basic',
      url: 'https://swapi.py4e.com/api/species/1/',
    });
  }),
];
