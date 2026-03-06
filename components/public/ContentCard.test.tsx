import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContentCard from './ContentCard';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
  },
}));

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt }: any) => <img src={src} alt={alt} />,
}));

describe('ContentCard Component', () => {
  const mockProps = {
    title: 'Test Article Title',
    excerpt: 'This is a test excerpt for the article.',
    date: new Date('2024-01-15'),
    slug: 'test-article-title',
    type: 'article' as const,
  };

  it('renders title correctly', () => {
    render(<ContentCard {...mockProps} />);
    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
  });

  it('renders excerpt correctly', () => {
    render(<ContentCard {...mockProps} />);
    expect(screen.getByText('This is a test excerpt for the article.')).toBeInTheDocument();
  });

  it('renders formatted date', () => {
    render(<ContentCard {...mockProps} />);
    expect(screen.getByText('January 15, 2024')).toBeInTheDocument();
  });

  it('renders type badge', () => {
    render(<ContentCard {...mockProps} />);
    expect(screen.getByText('article')).toBeInTheDocument();
  });

  it('renders "Read More" link', () => {
    render(<ContentCard {...mockProps} />);
    expect(screen.getByText('Read More')).toBeInTheDocument();
  });

  it('links to correct article path', () => {
    const { container } = render(<ContentCard {...mockProps} />);
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/articles/test-article-title');
  });

  it('links to correct news path for news type', () => {
    const newsProps = { ...mockProps, type: 'news' as const };
    const { container } = render(<ContentCard {...newsProps} />);
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/news/test-article-title');
  });

  it('links to correct video path for video type', () => {
    const videoProps = { ...mockProps, type: 'video' as const };
    const { container } = render(<ContentCard {...videoProps} />);
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/videos/test-article-title');
  });

  it('renders image when provided', () => {
    const propsWithImage = {
      ...mockProps,
      image: 'https://example.com/image.jpg',
    };
    
    render(<ContentCard {...propsWithImage} />);
    const image = screen.getByAltText('Test Article Title');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('renders placeholder when no image provided', () => {
    const { container } = render(<ContentCard {...mockProps} />);
    const placeholder = container.querySelector('.bg-gradient-to-br');
    expect(placeholder).toBeInTheDocument();
  });

  it('renders video icon for video type without image', () => {
    const videoProps = { ...mockProps, type: 'video' as const };
    const { container } = render(<ContentCard {...videoProps} />);
    
    // Check for video icon SVG path
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('truncates long excerpts with line-clamp', () => {
    const longExcerpt = 'This is a very long excerpt that should be truncated. '.repeat(10);
    const propsWithLongExcerpt = { ...mockProps, excerpt: longExcerpt };
    
    const { container } = render(<ContentCard {...propsWithLongExcerpt} />);
    const excerptElement = container.querySelector('.line-clamp-3');
    expect(excerptElement).toBeInTheDocument();
  });

  it('truncates long titles with line-clamp', () => {
    const longTitle = 'This is a very long title that should be truncated with line clamp';
    const propsWithLongTitle = { ...mockProps, title: longTitle };
    
    const { container } = render(<ContentCard {...propsWithLongTitle} />);
    const titleElement = container.querySelector('.line-clamp-2');
    expect(titleElement).toBeInTheDocument();
  });
});
