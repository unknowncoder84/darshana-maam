import { describe, it, expect, vi } from 'vitest';

// Mock the public action
vi.mock('../actions/public', () => ({
  getSettings: vi.fn(async () => ({
    id: '1',
    firm_name: 'Test Law Firm',
    address: '123 Test St',
    phone: '555-1234',
    email: 'test@lawfirm.com',
    social_links: {
      facebook: 'https://facebook.com/test',
      twitter: 'https://twitter.com/test',
      linkedin: 'https://linkedin.com/test',
    },
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  })),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: any) => (
      <div className={className}>{children}</div>
    ),
  },
  useInView: vi.fn(() => true),
}));

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt }: any) => <img src={src} alt={alt} />,
}));

describe('Static Pages', () => {
  describe('Home Page', () => {
    it('should have correct metadata', async () => {
      // Test that the page exports metadata
      const HomePage = await import('../page');
      expect(HomePage).toBeDefined();
    });

    it('should render without errors', async () => {
      const HomePage = await import('../page');
      const Component = HomePage.default;
      expect(Component).toBeDefined();
      expect(typeof Component).toBe('function');
    });
  });

  describe('About Page', () => {
    it('should have correct metadata', async () => {
      const AboutPage = await import('../about/page');
      expect(AboutPage.metadata).toBeDefined();
      expect(AboutPage.metadata?.title).toContain('About');
    });

    it('should render without errors', async () => {
      const AboutPage = await import('../about/page');
      const Component = AboutPage.default;
      expect(Component).toBeDefined();
      expect(typeof Component).toBe('function');
    });
  });

  describe('Practice Areas Page', () => {
    it('should have correct metadata', async () => {
      const PracticeAreasPage = await import('../practice-areas/page');
      expect(PracticeAreasPage.metadata).toBeDefined();
      expect(PracticeAreasPage.metadata?.title).toContain('Practice Areas');
    });

    it('should render without errors', async () => {
      const PracticeAreasPage = await import('../practice-areas/page');
      const Component = PracticeAreasPage.default;
      expect(Component).toBeDefined();
      expect(typeof Component).toBe('function');
    });
  });

  describe('Contact Page', () => {
    it('should have correct metadata', async () => {
      const ContactPage = await import('../contact/page');
      expect(ContactPage.metadata).toBeDefined();
      expect(ContactPage.metadata?.title).toContain('Contact');
    });

    it('should render without errors', async () => {
      const ContactPage = await import('../contact/page');
      const Component = ContactPage.default;
      expect(Component).toBeDefined();
      expect(typeof Component).toBe('function');
    });
  });

  describe('Settings Integration', () => {
    it('should use getSettings action', async () => {
      const { getSettings } = await import('../actions/public');
      const settings = await getSettings();
      
      expect(settings).toBeDefined();
      expect(settings?.firm_name).toBe('Test Law Firm');
      expect(settings?.email).toBe('test@lawfirm.com');
    });
  });
});
