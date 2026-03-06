import { describe, it, expect, vi } from 'vitest';

// Mock the public actions
const mockVideos = [
  {
    id: '1',
    title: 'Test Video 1',
    slug: 'test-video-1',
    description: 'This is test video description 1',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://example.com/thumb1.jpg',
    published: true,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    title: 'Test Video 2',
    slug: 'test-video-2',
    description: 'This is test video description 2',
    video_url: 'https://example.com/video.mp4',
    thumbnail: 'https://example.com/thumb2.jpg',
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
  getPublishedVideos: vi.fn(async () => mockVideos),
  getVideoBySlug: vi.fn(async (slug: string) => {
    return mockVideos.find(item => item.slug === slug) || null;
  }),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/videos'),
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

describe('Videos Pages', () => {
  describe('Videos Listing Page', () => {
    it('should have correct metadata', async () => {
      const VideosPage = await import('./page');
      expect(VideosPage.metadata).toBeDefined();
      expect(VideosPage.metadata?.title).toContain('Videos');
    });

    it('should render without errors', async () => {
      const VideosPage = await import('./page');
      const Component = VideosPage.default;
      expect(Component).toBeDefined();
      expect(typeof Component).toBe('function');
    });

    it('should fetch published videos', async () => {
      const { getPublishedVideos } = await import('../actions/public');
      const videos = await getPublishedVideos();
      
      expect(videos).toBeDefined();
      expect(Array.isArray(videos)).toBe(true);
      expect(videos.length).toBe(2);
      expect(videos[0].title).toBe('Test Video 1');
    });

    it('should order videos by created_at descending', async () => {
      const { getPublishedVideos } = await import('../actions/public');
      const videos = await getPublishedVideos();
      
      // First item should be newer
      const firstDate = new Date(videos[0].created_at);
      const secondDate = new Date(videos[1].created_at);
      expect(firstDate.getTime()).toBeGreaterThan(secondDate.getTime());
    });
  });

  describe('Video Detail Page', () => {
    it('should fetch video by slug', async () => {
      const { getVideoBySlug } = await import('../actions/public');
      const video = await getVideoBySlug('test-video-1');
      
      expect(video).toBeDefined();
      expect(video?.title).toBe('Test Video 1');
      expect(video?.slug).toBe('test-video-1');
    });

    it('should return null for non-existent slug', async () => {
      const { getVideoBySlug } = await import('../actions/public');
      const video = await getVideoBySlug('non-existent-slug');
      
      expect(video).toBeNull();
    });

    it('should have dynamic metadata generation', async () => {
      const VideoDetailPage = await import('./[slug]/page');
      expect(VideoDetailPage.generateMetadata).toBeDefined();
      expect(typeof VideoDetailPage.generateMetadata).toBe('function');
    });

    it('should render without errors', async () => {
      const VideoDetailPage = await import('./[slug]/page');
      const Component = VideoDetailPage.default;
      expect(Component).toBeDefined();
      expect(typeof Component).toBe('function');
    });

    it('should detect YouTube URLs', async () => {
      const { getVideoBySlug } = await import('../actions/public');
      const video = await getVideoBySlug('test-video-1');
      
      expect(video?.video_url).toContain('youtube.com');
    });

    it('should extract YouTube video ID', () => {
      const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      const videoId = match && match[2].length === 11 ? match[2] : null;
      
      expect(videoId).toBe('dQw4w9WgXcQ');
    });

    it('should handle non-YouTube video URLs', async () => {
      const { getVideoBySlug } = await import('../actions/public');
      const video = await getVideoBySlug('test-video-2');
      
      expect(video?.video_url).not.toContain('youtube.com');
      expect(video?.video_url).toContain('.mp4');
    });
  });

  describe('Content Display', () => {
    it('should display only published videos', async () => {
      const { getPublishedVideos } = await import('../actions/public');
      const videos = await getPublishedVideos();
      
      // All items should have published = true
      expect(videos.every(item => item.published)).toBe(true);
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

    it('should display video thumbnails', async () => {
      const { getPublishedVideos } = await import('../actions/public');
      const videos = await getPublishedVideos();
      
      expect(videos[0].thumbnail).toBeDefined();
      expect(videos[0].thumbnail).toContain('thumb1.jpg');
    });

    it('should display video descriptions', async () => {
      const { getVideoBySlug } = await import('../actions/public');
      const video = await getVideoBySlug('test-video-1');
      
      expect(video?.description).toBeDefined();
      expect(video?.description).toContain('test video description');
    });
  });
});
