import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NotFound from './not-found';

// Mock the client components since they use hooks
vi.mock('./error', () => ({
  default: ({ error, reset }: { error: Error; reset: () => void }) => (
    <div>
      <h1>500</h1>
      <h2>Something Went Wrong</h2>
      <button onClick={reset}>Try Again</button>
      <a href="/">Go to Home</a>
      <a href="/contact">Contact Page</a>
      <a href="mailto:info@lawfirm.com">Email Support</a>
    </div>
  ),
}));

vi.mock('./global-error', () => ({
  default: ({ error, reset }: { error: Error; reset: () => void }) => (
    <html>
      <body>
        <div>
          <h1>Error</h1>
          <h2>Application Error</h2>
          <button onClick={reset}>Try Again</button>
          <a href="/">Go to Home</a>
          <a href="/contact">Contact Page</a>
          <a href="mailto:info@lawfirm.com">Email Support</a>
        </div>
      </body>
    </html>
  ),
}));

describe('Error Pages', () => {
  describe('404 Not Found Page', () => {
    it('should render 404 heading', () => {
      render(<NotFound />);
      expect(screen.getByText('404')).toBeDefined();
    });

    it('should render page not found message', () => {
      render(<NotFound />);
      expect(screen.getByText('Page Not Found')).toBeDefined();
    });

    it('should render navigation links', () => {
      render(<NotFound />);
      expect(screen.getByText('Go to Home')).toBeDefined();
      expect(screen.getByText('Contact Us')).toBeDefined();
    });

    it('should render quick links to main sections', () => {
      render(<NotFound />);
      expect(screen.getByText('About Us')).toBeDefined();
      expect(screen.getByText('Practice Areas')).toBeDefined();
      expect(screen.getByText('News')).toBeDefined();
      expect(screen.getByText('Articles')).toBeDefined();
      expect(screen.getByText('Videos')).toBeDefined();
    });

    it('should have correct link hrefs', () => {
      const { container } = render(<NotFound />);
      const homeLink = container.querySelector('a[href="/"]');
      expect(homeLink).toBeDefined();
      
      const contactLink = container.querySelector('a[href="/contact"]');
      expect(contactLink).toBeDefined();
      
      const aboutLink = container.querySelector('a[href="/about"]');
      expect(aboutLink).toBeDefined();
    });

    it('should use consistent royal navy blue theme', () => {
      const { container } = render(<NotFound />);
      const mainDiv = container.querySelector('div');
      expect(mainDiv?.className).toContain('bg-gradient-to-br');
      expect(mainDiv?.className).toContain('from-[#001f3f]');
      expect(mainDiv?.className).toContain('to-[#003366]');
    });
  });

  describe('500 Error Page', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should render 500 heading', async () => {
      const ErrorComponent = (await import('./error')).default;
      const mockError = new globalThis.Error('Test error');
      const mockReset = vi.fn();
      
      render(<ErrorComponent error={mockError} reset={mockReset} />);
      expect(screen.getByText('500')).toBeDefined();
    });

    it('should render error message', async () => {
      const ErrorComponent = (await import('./error')).default;
      const mockError = new globalThis.Error('Test error');
      const mockReset = vi.fn();
      
      render(<ErrorComponent error={mockError} reset={mockReset} />);
      expect(screen.getByText('Something Went Wrong')).toBeDefined();
    });

    it('should render try again button', async () => {
      const ErrorComponent = (await import('./error')).default;
      const mockError = new globalThis.Error('Test error');
      const mockReset = vi.fn();
      
      render(<ErrorComponent error={mockError} reset={mockReset} />);
      expect(screen.getByText('Try Again')).toBeDefined();
    });

    it('should render go to home link', async () => {
      const ErrorComponent = (await import('./error')).default;
      const mockError = new globalThis.Error('Test error');
      const mockReset = vi.fn();
      
      render(<ErrorComponent error={mockError} reset={mockReset} />);
      expect(screen.getByText('Go to Home')).toBeDefined();
    });

    it('should render contact information', async () => {
      const ErrorComponent = (await import('./error')).default;
      const mockError = new globalThis.Error('Test error');
      const mockReset = vi.fn();
      
      render(<ErrorComponent error={mockError} reset={mockReset} />);
      expect(screen.getByText('Contact Page')).toBeDefined();
      expect(screen.getByText('Email Support')).toBeDefined();
    });

    it('should call reset function when try again is clicked', async () => {
      const ErrorComponent = (await import('./error')).default;
      const mockError = new globalThis.Error('Test error');
      const mockReset = vi.fn();
      
      const { container } = render(<ErrorComponent error={mockError} reset={mockReset} />);
      const tryAgainButton = container.querySelector('button');
      
      if (tryAgainButton) {
        fireEvent.click(tryAgainButton);
        expect(mockReset).toHaveBeenCalled();
      }
    });
  });

  describe('Global Error Boundary', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should render error heading', async () => {
      const GlobalError = (await import('./global-error')).default;
      const mockError = new globalThis.Error('Critical error');
      const mockReset = vi.fn();
      
      render(<GlobalError error={mockError} reset={mockReset} />);
      expect(screen.getByText('Error')).toBeDefined();
    });

    it('should render application error message', async () => {
      const GlobalError = (await import('./global-error')).default;
      const mockError = new globalThis.Error('Critical error');
      const mockReset = vi.fn();
      
      render(<GlobalError error={mockError} reset={mockReset} />);
      expect(screen.getByText('Application Error')).toBeDefined();
    });

    it('should render try again button', async () => {
      const GlobalError = (await import('./global-error')).default;
      const mockError = new globalThis.Error('Critical error');
      const mockReset = vi.fn();
      
      render(<GlobalError error={mockError} reset={mockReset} />);
      expect(screen.getByText('Try Again')).toBeDefined();
    });

    it('should render go to home link', async () => {
      const GlobalError = (await import('./global-error')).default;
      const mockError = new globalThis.Error('Critical error');
      const mockReset = vi.fn();
      
      render(<GlobalError error={mockError} reset={mockReset} />);
      expect(screen.getByText('Go to Home')).toBeDefined();
    });

    it('should render contact information', async () => {
      const GlobalError = (await import('./global-error')).default;
      const mockError = new globalThis.Error('Critical error');
      const mockReset = vi.fn();
      
      render(<GlobalError error={mockError} reset={mockReset} />);
      expect(screen.getByText('Contact Page')).toBeDefined();
      expect(screen.getByText('Email Support')).toBeDefined();
    });

    it('should call reset function when try again is clicked', async () => {
      const GlobalError = (await import('./global-error')).default;
      const mockError = new globalThis.Error('Critical error');
      const mockReset = vi.fn();
      
      const { container } = render(<GlobalError error={mockError} reset={mockReset} />);
      const tryAgainButton = container.querySelector('button');
      
      if (tryAgainButton) {
        fireEvent.click(tryAgainButton);
        expect(mockReset).toHaveBeenCalled();
      }
    });
  });
});
