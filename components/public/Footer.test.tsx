import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { FirmSettings } from '@/lib/types/database';

const mockSettings: FirmSettings = {
  id: '1',
  firm_name: 'Test Law Firm',
  address: '123 Legal Street, Law City, LC 12345',
  phone: '(555) 123-4567',
  email: 'contact@testlawfirm.com',
  social_links: {
    facebook: 'https://facebook.com/testlawfirm',
    twitter: 'https://twitter.com/testlawfirm',
    linkedin: 'https://linkedin.com/company/testlawfirm',
    instagram: 'https://instagram.com/testlawfirm',
  },
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

describe('Footer Component', () => {
  it('renders firm name', () => {
    render(<Footer settings={mockSettings} />);
    expect(screen.getByText('Test Law Firm')).toBeInTheDocument();
  });

  it('renders firm contact information', () => {
    render(<Footer settings={mockSettings} />);
    
    expect(screen.getByText(/123 Legal Street/)).toBeInTheDocument();
    expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
    expect(screen.getByText('contact@testlawfirm.com')).toBeInTheDocument();
  });

  it('renders quick links', () => {
    render(<Footer settings={mockSettings} />);
    
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    const homeLinks = screen.getAllByText('Home');
    expect(homeLinks.length).toBeGreaterThan(0);
  });

  it('renders social media links when provided', () => {
    render(<Footer settings={mockSettings} />);
    
    const facebookLink = screen.getByLabelText('Facebook');
    const twitterLink = screen.getByLabelText('Twitter');
    const linkedinLink = screen.getByLabelText('LinkedIn');
    const instagramLink = screen.getByLabelText('Instagram');
    
    expect(facebookLink).toHaveAttribute('href', 'https://facebook.com/testlawfirm');
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/testlawfirm');
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/company/testlawfirm');
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/testlawfirm');
  });

  it('does not render social links section when not provided', () => {
    const settingsWithoutSocial: FirmSettings = {
      ...mockSettings,
      social_links: undefined,
    };
    
    render(<Footer settings={settingsWithoutSocial} />);
    
    expect(screen.queryByLabelText('Facebook')).not.toBeInTheDocument();
  });

  it('renders copyright with current year', () => {
    render(<Footer settings={mockSettings} />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
  });

  it('renders phone as clickable tel link', () => {
    render(<Footer settings={mockSettings} />);
    
    const phoneLink = screen.getByText('(555) 123-4567');
    expect(phoneLink).toHaveAttribute('href', 'tel:(555) 123-4567');
  });

  it('renders email as clickable mailto link', () => {
    render(<Footer settings={mockSettings} />);
    
    const emailLink = screen.getByText('contact@testlawfirm.com');
    expect(emailLink).toHaveAttribute('href', 'mailto:contact@testlawfirm.com');
  });

  it('handles missing optional fields gracefully', () => {
    const minimalSettings: FirmSettings = {
      id: '1',
      firm_name: 'Minimal Law Firm',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    };
    
    render(<Footer settings={minimalSettings} />);
    
    expect(screen.getByText('Minimal Law Firm')).toBeInTheDocument();
    expect(screen.queryByText(/Address:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Phone:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Email:/)).not.toBeInTheDocument();
  });
});
