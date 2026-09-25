import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LanguageProvider from '../../i18n/LanguageProvider';
import { STORAGE_KEY } from '../../i18n/config';
import Home from '../Home';
import Platform from '../Platform';
import Solutions from '../Solutions';
import Workflow from '../Workflow';
import Trust from '../Trust';
import Contact from '../Contact';

vi.mock('framer-motion', async () => {
  const React = await import('react');

  const passthrough = (tag: string) =>
    ({ children, ...props }: any) => {
      // Drop framer-only props so React doesn't warn about unknown attributes.
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

describe('Home page', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders English content', () => {
    renderWithProviders(<Home />, { language: 'en' });

    expect(screen.getByText(/Turn protocols into SDTM/)).toBeInTheDocument();
    expect(screen.getByText(/Study Automation Console/)).toBeInTheDocument();
    expect(screen.queryByText(/通过可追溯的智能/)).not.toBeInTheDocument();
  });

  it('renders Chinese content', () => {
    renderWithProviders(<Home />, { language: 'zh' });

    expect(screen.getByText(/通过可追溯的智能/)).toBeInTheDocument();
    expect(screen.getByText(/研究自动化控制台/)).toBeInTheDocument();
    expect(screen.queryByText(/Turn protocols into SDTM/)).not.toBeInTheDocument();
  });
});

describe('Platform page', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders English content', () => {
    renderWithProviders(<Platform />, { language: 'en' });

    expect(screen.getByText(/A structured automation platform/)).toBeInTheDocument();
    expect(screen.getByText(/Generate connected outputs/)).toBeInTheDocument();
  });

  it('renders Chinese content', () => {
    renderWithProviders(<Platform />, { language: 'zh' });

    expect(screen.getByText(/面向临床研究交付的结构化自动化平台/)).toBeInTheDocument();
    expect(screen.getByText(/生成关联的产出/)).toBeInTheDocument();
  });
});

describe('Solutions page', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders English content', () => {
    renderWithProviders(<Solutions />, { language: 'en' });

    expect(screen.getByText(/Built for the teams responsible/)).toBeInTheDocument();
    expect(screen.getByText(/Start with one workflow/)).toBeInTheDocument();
  });

  it('renders Chinese content', () => {
    renderWithProviders(<Solutions />, { language: 'zh' });

    expect(screen.getByText(/为负责研究质量的团队而建/)).toBeInTheDocument();
    expect(screen.getByText(/从一个工作流开始/)).toBeInTheDocument();
  });
});

describe('Workflow page', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders English content', () => {
    renderWithProviders(<Workflow />, { language: 'en' });

    expect(screen.getByText(/From protocol documents to controlled/)).toBeInTheDocument();
    expect(screen.getByText(/QC is built into the pipeline/)).toBeInTheDocument();
  });

  it('renders Chinese content', () => {
    renderWithProviders(<Workflow />, { language: 'zh' });

    expect(screen.getByText(/从方案文档到受控的临床交付物/)).toBeInTheDocument();
    expect(screen.getByText(/质控内建于流水线中/)).toBeInTheDocument();
  });
});

describe('Trust page', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders English content', () => {
    renderWithProviders(<Trust />, { language: 'en' });

    expect(screen.getByText(/Designed for regulated clinical work/)).toBeInTheDocument();
    expect(screen.getByText(/Keep AI assistance within/)).toBeInTheDocument();
  });

  it('renders Chinese content', () => {
    renderWithProviders(<Trust />, { language: 'zh' });

    expect(screen.getByText(/为受监管的临床工作设计/)).toBeInTheDocument();
    expect(screen.getByText(/将AI辅助保持在受控的运营模式中/)).toBeInTheDocument();
  });
});

describe('Contact page', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders English content with form labels', () => {
    renderWithProviders(<Contact />, { language: 'en' });

    expect(screen.getByText(/Let's discuss clinical automation/)).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Work email')).toBeInTheDocument();
    expect(screen.getByText('Area of interest')).toBeInTheDocument();
  });

  it('renders Chinese content', () => {
    renderWithProviders(<Contact />, { language: 'zh' });

    expect(screen.getByText(/让我们讨论适合您研究工作流的临床自动化/)).toBeInTheDocument();
    expect(screen.getByText('姓名')).toBeInTheDocument();
    expect(screen.getByText('工作邮箱')).toBeInTheDocument();
  });
});
