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

  it('presents the main features as separate page-like areas', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: /^studio$/i })).toHaveAttribute('href', '#studio');
    expect(screen.getByRole('link', { name: /^products$/i })).toHaveAttribute('href', '#products');
    expect(screen.getByRole('link', { name: /^customize$/i })).toHaveAttribute('href', '#customize');
    expect(screen.getByRole('link', { name: /^preview$/i })).toHaveAttribute('href', '#preview');
    expect(screen.getByRole('link', { name: /^checkout$/i })).toHaveAttribute('href', '#checkout');
    expect(screen.getByRole('link', { name: /^account$/i })).toHaveAttribute('href', '#account');
  });

  it('introduces a Supabase-ready login portal for personalized memorials and baskets', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /your petmemory portal/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('type', 'password');
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByText(/supabase project url saved/i)).toBeInTheDocument();
    expect(screen.getByText(/gcgedkovyaedjhbnntjw\.supabase\.co/i)).toBeInTheDocument();
  });

  it('shows account-owned pets, memorial drafts, saved products, and basket summary', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /my animals/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Bailey/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/memorial draft/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /saved keepsakes/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Memory Locket/i)[0]).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /basket/i })).toBeInTheDocument();
    expect(screen.getByText(/2 remembrance items/i)).toBeInTheDocument();
  });

  it('shows products with prices and a checkout path while preserving the dropship handoff', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /garden marker/i })).toBeInTheDocument();
    expect(screen.getAllByText(/£39/i)[0]).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /framed memory plaque/i })).toBeInTheDocument();
    expect(screen.getAllByText(/£59/i)[0]).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /mini memorial stone/i })).toBeInTheDocument();
    expect(screen.getAllByText(/£79/i)[0]).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /photo keepsake print/i })).toBeInTheDocument();
    expect(screen.getAllByText(/£24/i)[0]).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /memory locket/i })).toBeInTheDocument();
    expect(screen.getAllByText(/£49/i)[0]).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /urn plate/i })).toBeInTheDocument();
    expect(screen.getAllByText(/£29/i)[0]).toBeInTheDocument();

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

  it('has a minimal studio for memorial copy, tone, product customization, preview, and ordering', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole('heading', { name: /create studio/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/pet name/i)).toHaveValue('Bailey');
    expect(screen.getByLabelText(/memorial message/i)).toHaveValue('A loyal friend, porch sunbather, and forever part of the family garden.');
    expect(screen.getByLabelText(/tone/i)).toHaveValue('peaceful');

    await user.clear(screen.getByLabelText(/pet name/i));
    await user.type(screen.getByLabelText(/pet name/i), 'Milo');
    await user.clear(screen.getByLabelText(/memorial message/i));
    await user.type(screen.getByLabelText(/memorial message/i), 'Forever chasing sunlight in the hallway.');
    await user.selectOptions(screen.getByLabelText(/tone/i), 'joyful');

    expect(screen.getByRole('heading', { name: /live keepsake preview/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Milo/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Forever chasing sunlight in the hallway/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Joyful/i)[0]).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /review and order/i })).toHaveAttribute('href', '#checkout');
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
