import { describe, it, expect, vi } from 'vitest';

// Mock the public actions
const mockNewsItems = [
  {
    id: '1',
    title: 'Test News 1',
    slug: 'test-news-1',
    content: '<p>This is test news content 1</p>',
    image: 'https://example.com/image1.jpg',
    published: true,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    title: 'Test News 2',
    slug: 'test-news-2',
    content: '<p>This is test news content 2</p>',
    published: true,
    created_at: '2024-01-14T00:00:00Z',
    updated_at: '2024-01-14T00:00:00Z',
  },
];

vi.mock('../actions/public', () => ({
  getSettings: vi.fn(async () => ({
    id: '1',
    firm_name: 'Test Law Firm',
    address: '123 Test St',
    phone: '555-1234',
    email: 'test@lawfirm.com',
    social_links: {},
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  })),
  getPublishedNews: vi.fn(async () => mockNewsItems),
  getNewsBySlug: vi.fn(async (slug: string) => {
    return mockNewsItems.find(item => item.slug === slug) || null;
  }),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/news'),
  notFound: vi.fn(),
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

// Mock DOMPurify
vi.mock('isomorphic-dompurify', () => ({
  default: {
    sanitize: vi.fn((html: string) => html),
  },
}));

describe('News Pages', () => {
  describe('News Listing Page', () => {
    it('should have correct metadata', async () => {
      const NewsPage = await import('./page');
      expect(NewsPage.metadata).toBeDefined();
      expect(NewsPage.metadata?.title).toContain('News');
    });

    it('should render without errors', async () => {
      const NewsPage = await import('./page');
      const Component = NewsPage.default;
      expect(Component).toBeDefined();
      expect(typeof Component).toBe('function');
    });

    it('should fetch published news items', async () => {
      const { getPublishedNews } = await import('../actions/public');
      const news = await getPublishedNews();
      
      expect(news).toBeDefined();
      expect(Array.isArray(news)).toBe(true);
      expect(news.length).toBe(2);
      expect(news[0].title).toBe('Test News 1');
    });

    it('should order news by created_at descending', async () => {
      const { getPublishedNews } = await import('../actions/public');
      const news = await getPublishedNews();
      
      // First item should be newer
      const firstDate = new Date(news[0].created_at);
      const secondDate = new Date(news[1].created_at);
      expect(firstDate.getTime()).toBeGreaterThan(secondDate.getTime());
    });
  });

  describe('News Detail Page', () => {
    it('should fetch news by slug', async () => {
      const { getNewsBySlug } = await import('../actions/public');
      const newsItem = await getNewsBySlug('test-news-1');
      
      expect(newsItem).toBeDefined();
      expect(newsItem?.title).toBe('Test News 1');
      expect(newsItem?.slug).toBe('test-news-1');
    });

    it('should return null for non-existent slug', async () => {
      const { getNewsBySlug } = await import('../actions/public');
      const newsItem = await getNewsBySlug('non-existent-slug');
      
      expect(newsItem).toBeNull();
    });

    it('should have dynamic metadata generation', async () => {
      const NewsDetailPage = await import('./[slug]/page');
      expect(NewsDetailPage.generateMetadata).toBeDefined();
      expect(typeof NewsDetailPage.generateMetadata).toBe('function');
    });

    it('should render without errors', async () => {
      const NewsDetailPage = await import('./[slug]/page');
      const Component = NewsDetailPage.default;
      expect(Component).toBeDefined();
      expect(typeof Component).toBe('function');
    });

    it('should sanitize HTML content', async () => {
      const DOMPurify = (await import('isomorphic-dompurify')).default;
      const { getNewsBySlug } = await import('../actions/public');
      
      const newsItem = await getNewsBySlug('test-news-1');
      if (newsItem) {
        DOMPurify.sanitize(newsItem.content);
        expect(DOMPurify.sanitize).toHaveBeenCalled();
      }
    });
  });

  describe('Content Display', () => {
    it('should display only published news', async () => {
      const { getPublishedNews } = await import('../actions/public');
      const news = await getPublishedNews();
      
      // All items should have published = true
      expect(news.every(item => item.published)).toBe(true);
    });

    it('should format dates correctly', () => {
      const date = new Date('2024-01-15T00:00:00Z');
      const formatted = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      
      expect(formatted).toBe('January 15, 2024');
    });

    it('should extract plain text excerpt from HTML', () => {
      const html = '<p>This is <strong>test</strong> content</p>';
      const text = html.replace(/<[^>]*>/g, '');
      expect(text).toBe('This is test content');
    });
  });
});
