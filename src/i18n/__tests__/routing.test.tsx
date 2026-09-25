import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import LanguageProvider from '../LanguageProvider';
import { STORAGE_KEY } from '../config';
import App from '../../App';
import Header from '../../layout/Header';

// Mock framer-motion to avoid animation issues in tests. A generic proxy renders
// any motion.<tag> (div, span, svg, path, circle, ...) as its plain element and
// strips animation-only props so React doesn't warn.
vi.mock('framer-motion', async () => {
  const React = await import('react');

  const passthrough = (tag: string) =>
    ({ children, ...props }: any) => {
      const {
        initial, animate, whileInView, whileHover, whileTap, exit,
        transition, viewport, variants, ...rest
      } = props;
      void initial; void animate; void whileInView; void whileHover;
      void whileTap; void exit; void transition; void viewport; void variants;
      return React.createElement(tag, rest, children);
    };

  const motion = new Proxy(
    {},
    { get: (_target, tag: string) => passthrough(tag) }
  );

  return {
    motion,
    AnimatePresence: ({ children }: any) => children,
    useInView: () => true,
    useReducedMotion: () => false,
  };
});

// Mock localStorage
let storage: Record<string, string> = {};
const mockLocalStorage = {
  getItem: vi.fn((key: string) => storage[key] ?? null),
  setItem: vi.fn((key: string, value: string) => { storage[key] = value; }),
  removeItem: vi.fn((key: string) => { delete storage[key]; }),
  clear: vi.fn(() => { storage = {}; }),
  get length() { return Object.keys(storage).length; },
  key: vi.fn((index: number) => Object.keys(storage)[index] ?? null),
};

function renderApp(initialRoute = '/') {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </MemoryRouter>
  );
}

function renderHeader(language: 'en' | 'zh') {
  // Set language preference before rendering
  storage[STORAGE_KEY] = language;
  return render(
    <MemoryRouter>
      <LanguageProvider>
        <Header />
      </LanguageProvider>
    </MemoryRouter>
  );
}

describe('Routing integration tests', () => {
  beforeEach(() => {
    storage = {};
    vi.clearAllMocks();
    document.documentElement.lang = '';

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
      configurable: true,
    });

    Object.defineProperty(window.navigator, 'languages', {
      value: ['en-US'],
      writable: true,
      configurable: true,
    });
  });

  // Validates: Requirement 7.2
  describe('Language persists across route navigation', () => {
    it('navigating from / to /platform keeps Chinese language active', async () => {
      const user = userEvent.setup();

      // Set language to Chinese via mock storage before render
      storage[STORAGE_KEY] = 'zh';

      renderApp('/');

      // Verify we're on the Home page in Chinese
      expect(screen.getByText('研究自动化控制台')).toBeInTheDocument();

      // Navigate to /platform by clicking the nav link (Chinese label: 平台)
      const platformLinks = screen.getAllByRole('link', { name: '平台' });
      // Click the nav link (first occurrence in the header nav)
      await user.click(platformLinks[0]);

      // Assert Chinese strings are showing on the Platform page
      expect(
        screen.getByText('面向临床研究交付的结构化自动化平台。')
      ).toBeInTheDocument();
      // The eyebrow on platform page in Chinese
      expect(screen.getByText('架构')).toBeInTheDocument();
    });
  });

  // Validates: Requirement 7.5
  describe('Language persists on unknown route redirect', () => {
    it('redirecting from /unknown-page to / keeps Chinese language active', () => {
      // Set language to Chinese in mock storage before render
      storage[STORAGE_KEY] = 'zh';

      renderApp('/unknown-page');

      // After redirect to /, Chinese strings should display (language wasn't reset)
      expect(screen.getByText('研究自动化控制台')).toBeInTheDocument();
      expect(
        screen.getByText('AI原生临床研究交付自动化')
      ).toBeInTheDocument();
    });
  });

  // Validates: Requirement 7.1
  describe('Route paths are identical for both languages', () => {
    it('nav links point to the same paths in English', () => {
      renderHeader('en');

      const expectedPaths = ['/platform', '/solutions', '/workflow', '/trust', '/contact'];
      const navLinks = screen.getAllByRole('link');
      const navHrefs = navLinks
        .map((link) => link.getAttribute('href'))
        .filter((href): href is string => href !== null);

      for (const path of expectedPaths) {
        expect(navHrefs).toContain(path);
      }
    });

    it('nav links point to the same paths in Chinese', () => {
      renderHeader('zh');

      const expectedPaths = ['/platform', '/solutions', '/workflow', '/trust', '/contact'];
      const navLinks = screen.getAllByRole('link');
      const navHrefs = navLinks
        .map((link) => link.getAttribute('href'))
        .filter((href): href is string => href !== null);

      for (const path of expectedPaths) {
        expect(navHrefs).toContain(path);
      }
    });

    it('route paths do not change between languages', () => {
      const expectedPaths = ['/platform', '/solutions', '/workflow', '/trust', '/contact'];

      // Render in English
      const { unmount: unmountEn } = renderHeader('en');
      const enLinks = screen.getAllByRole('link');
      const enHrefs = enLinks
        .map((link) => link.getAttribute('href'))
        .filter((href): href is string =>
          href !== null && expectedPaths.includes(href)
        );
      unmountEn();

      // Render in Chinese
      renderHeader('zh');
      const zhLinks = screen.getAllByRole('link');
      const zhHrefs = zhLinks
        .map((link) => link.getAttribute('href'))
        .filter((href): href is string =>
          href !== null && expectedPaths.includes(href)
        );

      // Both sets of nav hrefs should be identical
      expect(enHrefs.sort()).toEqual(zhHrefs.sort());
    });
  });
});
