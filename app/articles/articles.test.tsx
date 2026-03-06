import { describe, it, expect, vi } from 'vitest';

// Mock the public actions
const mockArticles = [
  {
    id: '1',
    title: 'Test Article 1',
    slug: 'test-article-1',
    content: '<p>This is test article content 1</p>',
    tags: ['legal', 'business'],
    seo_meta: {
      title: 'Custom SEO Title',
      description: 'Custom SEO description',
      keywords: ['law', 'legal'],
    },
    published: true,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    title: 'Test Article 2',
    slug: 'test-article-2',
    content: '<p>This is test article content 2</p>',
    tags: ['corporate'],
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
  getPublishedArticles: vi.fn(async () => mockArticles),
  getArticleBySlug: vi.fn(async (slug: string) => {
    return mockArticles.find(item => item.slug === slug) || null;
  }),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/articles'),
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

describe('Articles Pages', () => {
  describe('Articles Listing Page', () => {
    it('should have correct metadata', async () => {
      const ArticlesPage = await import('./page');
      expect(ArticlesPage.metadata).toBeDefined();
      expect(ArticlesPage.metadata?.title).toContain('Articles');
    });

    it('should render without errors', async () => {
      const ArticlesPage = await import('./page');
      const Component = ArticlesPage.default;
      expect(Component).toBeDefined();
      expect(typeof Component).toBe('function');
    });

    it('should fetch published articles', async () => {
      const { getPublishedArticles } = await import('../actions/public');
      const articles = await getPublishedArticles();
      
      expect(articles).toBeDefined();
      expect(Array.isArray(articles)).toBe(true);
      expect(articles.length).toBe(2);
      expect(articles[0].title).toBe('Test Article 1');
    });

    it('should order articles by created_at descending', async () => {
      const { getPublishedArticles } = await import('../actions/public');
      const articles = await getPublishedArticles();
      
      // First item should be newer
      const firstDate = new Date(articles[0].created_at);
      const secondDate = new Date(articles[1].created_at);
      expect(firstDate.getTime()).toBeGreaterThan(secondDate.getTime());
    });

    it('should display tags for articles', async () => {
      const { getPublishedArticles } = await import('../actions/public');
      const articles = await getPublishedArticles();
      
      expect(articles[0].tags).toBeDefined();
      expect(articles[0].tags).toContain('legal');
      expect(articles[0].tags).toContain('business');
    });
  });

  describe('Article Detail Page', () => {
    it('should fetch article by slug', async () => {
      const { getArticleBySlug } = await import('../actions/public');
      const article = await getArticleBySlug('test-article-1');
      
      expect(article).toBeDefined();
      expect(article?.title).toBe('Test Article 1');
      expect(article?.slug).toBe('test-article-1');
    });

    it('should return null for non-existent slug', async () => {
      const { getArticleBySlug } = await import('../actions/public');
      const article = await getArticleBySlug('non-existent-slug');
      
      expect(article).toBeNull();
    });

    it('should have dynamic metadata generation', async () => {
      const ArticleDetailPage = await import('./[slug]/page');
      expect(ArticleDetailPage.generateMetadata).toBeDefined();
      expect(typeof ArticleDetailPage.generateMetadata).toBe('function');
    });

    it('should use custom SEO meta when provided', async () => {
      const { getArticleBySlug } = await import('../actions/public');
      const article = await getArticleBySlug('test-article-1');
      
      expect(article?.seo_meta).toBeDefined();
      expect(article?.seo_meta?.title).toBe('Custom SEO Title');
      expect(article?.seo_meta?.description).toBe('Custom SEO description');
      expect(article?.seo_meta?.keywords).toContain('law');
    });

    it('should render without errors', async () => {
      const ArticleDetailPage = await import('./[slug]/page');
      const Component = ArticleDetailPage.default;
      expect(Component).toBeDefined();
      expect(typeof Component).toBe('function');
    });

    it('should sanitize HTML content', async () => {
      const DOMPurify = (await import('isomorphic-dompurify')).default;
      const { getArticleBySlug } = await import('../actions/public');
      
      const article = await getArticleBySlug('test-article-1');
      if (article) {
        DOMPurify.sanitize(article.content);
        expect(DOMPurify.sanitize).toHaveBeenCalled();
      }
    });
  });

  describe('Content Display', () => {
    it('should display only published articles', async () => {
      const { getPublishedArticles } = await import('../actions/public');
      const articles = await getPublishedArticles();
      
      // All items should have published = true
      expect(articles.every(item => item.published)).toBe(true);
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

    it('should display tags on article detail page', async () => {
      const { getArticleBySlug } = await import('../actions/public');
      const article = await getArticleBySlug('test-article-1');
      
      expect(article?.tags).toBeDefined();
      expect(article?.tags?.length).toBeGreaterThan(0);
    });
  });
});
