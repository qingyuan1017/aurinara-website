import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import LanguageProvider from '../LanguageProvider';
import { STORAGE_KEY } from '../config';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';

function renderApp() {
  return render(
    <MemoryRouter>
      <LanguageProvider>
        <Header />
        <Footer />
      </LanguageProvider>
    </MemoryRouter>
  );
}

describe('Language switching integration', () => {
  let storage: Record<string, string>;
  let mockGetItem: ReturnType<typeof vi.fn>;
  let mockSetItem: ReturnType<typeof vi.fn>;
  let mockRemoveItem: ReturnType<typeof vi.fn>;
  let mockClear: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    storage = {};
    mockGetItem = vi.fn((key: string) => storage[key] ?? null);
    mockSetItem = vi.fn((key: string, value: string) => { storage[key] = value; });
    mockRemoveItem = vi.fn((key: string) => { delete storage[key]; });
    mockClear = vi.fn(() => { storage = {}; });

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: mockGetItem,
        setItem: mockSetItem,
        removeItem: mockRemoveItem,
        clear: mockClear,
      },
      writable: true,
      configurable: true,
    });

    Object.defineProperty(window.navigator, 'languages', {
      value: ['en-US'],
      writable: true,
      configurable: true,
    });

    document.documentElement.lang = '';
  });

  it('re-renders all text on language change without full reload', async () => {
    const user = userEvent.setup();
    const { container } = renderApp();

    // English strings present initially (nav has "Solutions", footer has "Security")
    expect(screen.getAllByText('Platform').length).toBeGreaterThan(0);
    expect(screen.getByText('Solutions')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();

    // Switch to Chinese
    const zhButton = screen.getByRole('button', { name: '中文' });
    await user.click(zhButton);

    // English strings should be gone
    expect(screen.queryAllByText('Platform')).toHaveLength(0);
    expect(screen.queryByText('Solutions')).not.toBeInTheDocument();
    expect(screen.queryByText('Security')).not.toBeInTheDocument();

    // Chinese strings should appear
    expect(screen.getAllByText('平台').length).toBeGreaterThan(0);
    expect(screen.getByText('解决方案')).toBeInTheDocument();
    expect(screen.getByText('安全')).toBeInTheDocument();

    // Component is still mounted (no full reload) — container still in document
    expect(document.body.contains(container)).toBe(true);
  });

  it('updates document lang attribute on language change', async () => {
    const user = userEvent.setup();
    renderApp();

    // Initial state should be "en"
    expect(document.documentElement.lang).toBe('en');

    // Switch to Chinese
    const zhButton = screen.getByRole('button', { name: '中文' });
    await user.click(zhButton);

    expect(document.documentElement.lang).toBe('zh');
  });

  it('synchronously resolves stored preference on first render', () => {
    // Set storage to "zh" before rendering
    storage[STORAGE_KEY] = 'zh';

    renderApp();

    // First render should show Chinese strings, not English
    expect(screen.queryAllByText('Platform')).toHaveLength(0);
    expect(screen.getAllByText('平台').length).toBeGreaterThan(0);
    expect(screen.getByText('解决方案')).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('zh');
  });

  it('persists language preference to localStorage on switch', async () => {
    const user = userEvent.setup();
    renderApp();

    // Initial: getItem should have been called to check for stored preference
    expect(mockGetItem).toHaveBeenCalledWith(STORAGE_KEY);

    // Switch to Chinese
    const zhButton = screen.getByRole('button', { name: '中文' });
    await user.click(zhButton);

    // localStorage.setItem should have been called with (STORAGE_KEY, "zh")
    expect(mockSetItem).toHaveBeenCalledWith(STORAGE_KEY, 'zh');
  });
});
