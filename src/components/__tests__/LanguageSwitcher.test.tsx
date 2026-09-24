import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LanguageSwitcher from '../LanguageSwitcher';
import LanguageProvider from '../../i18n/LanguageProvider';
import { STORAGE_KEY } from '../../i18n/config';

function renderWithProvider(ui: React.ReactElement, { initialLanguage = 'en' } = {}) {
  const storage: Record<string, string> = {};
  if (initialLanguage) {
    storage[STORAGE_KEY] = initialLanguage;
  }

  vi.stubGlobal('localStorage', {
    getItem: vi.fn((key: string) => storage[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { storage[key] = value; }),
    removeItem: vi.fn((key: string) => { delete storage[key]; }),
    clear: vi.fn(),
    length: 0,
    key: vi.fn(),
  });

  return render(<LanguageProvider>{ui}</LanguageProvider>);
}

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders both language options with correct labels', () => {
    renderWithProvider(<LanguageSwitcher variant="desktop" />);

    expect(screen.getByRole('button', { name: 'EN' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '中文' })).toBeInTheDocument();
  });

  it('marks the active language option with aria-current="true"', () => {
    renderWithProvider(<LanguageSwitcher variant="desktop" />, { initialLanguage: 'en' });

    const enButton = screen.getByRole('button', { name: 'EN' });
    const zhButton = screen.getByRole('button', { name: '中文' });

    expect(enButton).toHaveAttribute('aria-current', 'true');
    expect(zhButton).not.toHaveAttribute('aria-current');
  });

  it('clicking the inactive option changes the language', async () => {
    const user = userEvent.setup();
    renderWithProvider(<LanguageSwitcher variant="desktop" />, { initialLanguage: 'en' });

    const zhButton = screen.getByRole('button', { name: '中文' });
    await user.click(zhButton);

    // After clicking Chinese, it should become active
    expect(zhButton).toHaveAttribute('aria-current', 'true');
    const enButton = screen.getByRole('button', { name: 'EN' });
    expect(enButton).not.toHaveAttribute('aria-current');
  });

  it('clicking the active option does not trigger a language change', async () => {
    const user = userEvent.setup();
    renderWithProvider(<LanguageSwitcher variant="desktop" />, { initialLanguage: 'en' });

    const enButton = screen.getByRole('button', { name: 'EN' });
    await user.click(enButton);

    // Language should remain English — EN stays active
    expect(enButton).toHaveAttribute('aria-current', 'true');
    const zhButton = screen.getByRole('button', { name: '中文' });
    expect(zhButton).not.toHaveAttribute('aria-current');
  });
});
