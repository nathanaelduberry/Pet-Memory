import { render, screen } from '@testing-library/react';
import App from './App';

describe('PetMemory landing experience', () => {
  it('positions PetMemory as a pet-oriented sister product to Memoria', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /petmemory/i })).toBeInTheDocument();
    expect(screen.getAllByText(/sister program to memoria/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/pet-oriented memorial application/i)).toBeInTheDocument();
  });

  it('surfaces the approved MVP feature pillars', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /moments/i })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: /respects/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('heading', { name: /tributes/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: /memorial plaques/i })).toBeInTheDocument();
  });

  it('includes primary calls to create, browse, and order a plaque', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: /create a memorial/i })).toHaveAttribute('href', '#create');
    expect(screen.getByRole('link', { name: /browse memorials/i })).toHaveAttribute('href', '#browse');
    expect(screen.getByRole('link', { name: /order a memorial plaque/i })).toHaveAttribute('href', '#plaque');
  });
});
