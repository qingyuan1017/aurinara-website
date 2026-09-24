import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LanguageProvider from '../../i18n/LanguageProvider';
import { STORAGE_KEY } from '../../i18n/config';
import Header from '../Header';
import Footer from '../Footer';

function renderWithProviders(ui: React.ReactElement, { language = 'en' } = {}) {
  const storage: Record<string, string> = { [STORAGE_KEY]: language };
  vi.stubGlobal('localStorage', {
    getItem: vi.fn((key: string) => storage[key] ?? null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    length: 0,
    key: vi.fn(),
  });
  return render(
    <LanguageProvider>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </LanguageProvider>
  );
}

describe('Header', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders correct strings in English', () => {
    renderWithProviders(<Header />, { language: 'en' });

    expect(screen.getByText('Aurinara Clinical AI')).toBeInTheDocument();
    expect(screen.getByText('Platform')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Request demo')).toBeInTheDocument();
  });

  it('renders correct strings in Chinese', () => {
    renderWithProviders(<Header />, { language: 'zh' });

    expect(screen.getByText('Aurinara 临床AI')).toBeInTheDocument();
    expect(screen.getByText('平台')).toBeInTheDocument();
    expect(screen.getByText('登录')).toBeInTheDocument();
    expect(screen.getByText('预约演示')).toBeInTheDocument();
  });

  it('contains LanguageSwitcher with EN and 中文 buttons', () => {
    renderWithProviders(<Header />, { language: 'en' });

    expect(screen.getByRole('button', { name: 'EN' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '中文' })).toBeInTheDocument();
  });
});

describe('Footer', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders correct strings in English', () => {
    renderWithProviders(<Footer />, { language: 'en' });

    expect(screen.getByText('© 2026 Aurinara Clinical AI. All rights reserved.')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
    expect(screen.getByText('Platform')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders correct strings in Chinese', () => {
    renderWithProviders(<Footer />, { language: 'zh' });

    expect(screen.getByText('© 2026 Aurinara Clinical AI 版权所有。')).toBeInTheDocument();
    expect(screen.getByText('安全')).toBeInTheDocument();
    expect(screen.getByText('平台')).toBeInTheDocument();
    expect(screen.getByText('联系我们')).toBeInTheDocument();
  });
});
