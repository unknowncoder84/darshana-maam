import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AnimatedSection from './AnimatedSection';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} data-testid="animated-section" {...props}>
        {children}
      </div>
    ),
  },
  useInView: vi.fn(() => true),
}));

describe('AnimatedSection Component', () => {
  it('renders children correctly', () => {
    render(
      <AnimatedSection>
        <p>Test Content</p>
      </AnimatedSection>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <AnimatedSection className="custom-class">
        <p>Test Content</p>
      </AnimatedSection>
    );
    
    const section = screen.getByTestId('animated-section');
    expect(section).toHaveClass('custom-class');
  });

  it('renders with fade animation by default', () => {
    const { container } = render(
      <AnimatedSection>
        <p>Test Content</p>
      </AnimatedSection>
    );
    
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with slide animation', () => {
    const { container } = render(
      <AnimatedSection animation="slide">
        <p>Test Content</p>
      </AnimatedSection>
    );
    
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with angle animation', () => {
    const { container } = render(
      <AnimatedSection animation="angle">
        <p>Test Content</p>
      </AnimatedSection>
    );
    
    expect(container.firstChild).toBeInTheDocument();
  });

  it('accepts delay prop', () => {
    const { container } = render(
      <AnimatedSection delay={0.5}>
        <p>Test Content</p>
      </AnimatedSection>
    );
    
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <AnimatedSection>
        <h1>Title</h1>
        <p>Paragraph</p>
        <button>Button</button>
      </AnimatedSection>
    );
    
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
    expect(screen.getByText('Button')).toBeInTheDocument();
  });
});
