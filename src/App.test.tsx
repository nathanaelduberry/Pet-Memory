import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const visibleText = () => document.body.textContent ?? '';

describe('PetMemory living memory garden experience', () => {
  beforeEach(() => {
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'blob:pet-photo-preview'),
      revokeObjectURL: vi.fn()
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('leads with an emotional living-memory-garden promise', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /for the pets who never really leave us/i })).toBeInTheDocument();
    expect(screen.getByText(/a living memory garden for beloved pets/i)).toBeInTheDocument();
    expect(screen.getByText(/give all that love somewhere gentle to live/i)).toBeInTheDocument();
  });

  it('uses gentle user-facing calls to action and navigation into distinct areas', () => {
    render(<App />);

    expect(screen.getAllByRole('link', { name: /begin their memorial/i })[0]).toHaveAttribute('href', '#studio');
    expect(screen.getByRole('link', { name: /visit memorials/i })).toHaveAttribute('href', '#explore');
    expect(screen.getAllByRole('link', { name: /create a keepsake plaque/i })[0]).toHaveAttribute('href', '#products');
    expect(screen.getByRole('link', { name: /products/i })).toHaveAttribute('href', '#products');
    expect(screen.getByRole('link', { name: /^checkout$/i })).toHaveAttribute('href', '#checkout');
  });

  it('explains the ways people can remember without internal product language', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /ways to remember/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /tell their story/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /quiet acts of love/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /shared memories/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /lasting keepsakes/i })).toBeInTheDocument();
  });

  it('keeps respects and tributes emotionally distinct', () => {
    render(<App />);

    expect(screen.getByText(/light a candle/i)).toBeInTheDocument();
    expect(screen.getByText(/leave a flower/i)).toBeInTheDocument();
    expect(screen.getByText(/send a pawprint/i)).toBeInTheDocument();
    expect(screen.getByText(/family and friends can add the memories only they carry/i)).toBeInTheDocument();
  });

  it('turns the site into a multi-area product experience', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /memorial studio/i })).toBeInTheDocument();
    expect(screen.getByText(/name, photo, story, moments, privacy, and invitations/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /explore the memory garden/i })).toBeInTheDocument();
    expect(screen.getByText(/browse public memorials, species gardens, and community rituals/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /keepsake shop/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /checkout preview/i })).toBeInTheDocument();
  });

  it('shows products with prices and a checkout path while preserving the dropship handoff', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /garden marker/i })).toBeInTheDocument();
    expect(screen.getByText(/£39/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /framed memory plaque/i })).toBeInTheDocument();
    expect(screen.getByText(/£59/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /urn plate/i })).toBeInTheDocument();
    expect(screen.getByText(/£29/i)).toBeInTheDocument();

    const checkoutLinks = screen.getAllByRole('link', { name: /continue to dropship checkout/i });
    expect(checkoutLinks[0]).toHaveAttribute('href', expect.stringContaining('dropship.petmemory.app/order'));
    expect(checkoutLinks[0]).toHaveAttribute('href', expect.stringContaining('product='));
    expect(checkoutLinks[0]).toHaveAttribute('target', '_blank');
    expect(checkoutLinks[0]).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('reframes plaques as keepsakes while preserving the dropship handoff', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /a keepsake for the places they loved/i })).toBeInTheDocument();
    expect(screen.getByText(/garden marker, urn plate, or framed plaque/i)).toBeInTheDocument();

    const keepsakeLinks = screen.getAllByRole('link', { name: /create a keepsake plaque/i });
    expect(keepsakeLinks[0]).toHaveAttribute('href', '#products');
  });

  it('reassures families that memorials are private and owner-controlled', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /your memorial, shared only how you choose/i })).toBeInTheDocument();
    expect(screen.getByText(/private by default/i)).toBeInTheDocument();
    expect(screen.getByText(/shareable by link/i)).toBeInTheDocument();
    expect(screen.getByText(/moderate tributes/i)).toBeInTheDocument();
  });

  it('previews uploaded pet photos immediately and revokes the blob when replaced', async () => {
    const user = userEvent.setup();
    render(<App />);

    const upload = screen.getByLabelText(/add their photo/i);
    const firstFile = new File(['first'], 'first-pet.png', { type: 'image/png' });
    await user.upload(upload, firstFile);

    const preview = screen.getByRole('img', { name: /uploaded pet preview/i });
    expect(preview).toHaveAttribute('src', 'blob:pet-photo-preview');
    expect(screen.getByText(/first-pet.png/i)).toBeInTheDocument();
    expect(URL.createObjectURL).toHaveBeenCalledWith(firstFile);

    const secondFile = new File(['second'], 'second-pet.jpg', { type: 'image/jpeg' });
    await user.upload(upload, secondFile);

    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:pet-photo-preview');
    expect(screen.getByText(/second-pet.jpg/i)).toBeInTheDocument();
  });

  it('keeps internal roadmap and vendor language out of visible copy', () => {
    render(<App />);

    expect(visibleText()).not.toMatch(/MVP|Dropship-ready|payload|Create\/Edit flow|photo preview reliability|supplier integration/i);
  });
});
