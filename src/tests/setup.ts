import '@testing-library/jest-dom/vitest';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mocks/server';

// Polyfill localStorage in JSDOM / Node environment if methods are missing
const memoryStorage: Record<string, string> = {};

const mockLocalStorage = {
  getItem: (key: string) => (key in memoryStorage ? memoryStorage[key] : null),
  setItem: (key: string, value: string) => {
    memoryStorage[key] = String(value);
  },
  removeItem: (key: string) => {
    delete memoryStorage[key];
  },
  clear: () => {
    Object.keys(memoryStorage).forEach((key) => delete memoryStorage[key]);
  },
  length: 0,
  key: (index: number) => Object.keys(memoryStorage)[index] || null,
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

if (typeof globalThis.localStorage === 'undefined' || typeof globalThis.localStorage.removeItem !== 'function') {
  Object.defineProperty(globalThis, 'localStorage', {
    value: mockLocalStorage,
    writable: true,
  });
}

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));

afterEach(() => {
  server.resetHandlers();
  mockLocalStorage.clear();
});

afterAll(() => server.close());
