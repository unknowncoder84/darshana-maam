import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

// Mock next/navigation
const mockUsePathname = vi.fn(() => '/');

vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

describe('Header Component', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });
  it('renders the firm name/logo', () => {
    render(<Header />);
    expect(screen.getByText('Law Firm')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<Header />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Practice Areas')).toBeInTheDocument();
    expect(screen.getByText('News')).toBeInTheDocument();
    expect(screen.getByText('Articles')).toBeInTheDocument();
    expect(screen.getByText('Videos')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('highlights the active page', () => {
    mockUsePathname.mockReturnValue('/about');
    
    render(<Header />);
    
    const aboutLink = screen.getAllByText('About')[0];
    expect(aboutLink).toHaveClass('border-white');
    expect(aboutLink).toHaveClass('font-semibold');
  });

  it('toggles mobile menu when button is clicked', () => {
    render(<Header />);
    
    const menuButton = screen.getByLabelText('Toggle mobile menu');
    
    // Mobile menu should not be visible initially
    const mobileLinks = screen.queryAllByText('Home');
    expect(mobileLinks.length).toBe(1); // Only desktop link
    
    // Click to open mobile menu
    fireEvent.click(menuButton);
    
    // Now mobile menu should be visible
    const mobileLinksAfter = screen.queryAllByText('Home');
    expect(mobileLinksAfter.length).toBe(2); // Desktop + mobile link
  });

  it('closes mobile menu when a link is clicked', () => {
    render(<Header />);
    
    const menuButton = screen.getByLabelText('Toggle mobile menu');
    
    // Open mobile menu
    fireEvent.click(menuButton);
    
    // Click a mobile link
    const mobileLinks = screen.getAllByText('About');
    fireEvent.click(mobileLinks[1]); // Click the mobile version
    
    // Mobile menu should be closed
    const linksAfterClose = screen.queryAllByText('Home');
    expect(linksAfterClose.length).toBe(1); // Only desktop link
  });

  it('has proper accessibility attributes', () => {
    render(<Header />);
    
    const menuButton = screen.getByLabelText('Toggle mobile menu');
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  });
});
