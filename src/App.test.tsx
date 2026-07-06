import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

vi.mock('./lib/supabase', () => ({
  isSupabaseConfigured: true,
  supabaseProjectUrl: 'https://gcgedkovyaedjhbnntjw.supabase.co',
  supabase: {
    auth: {
      getSession: vi.fn(async () => ({ data: { session: null } })),
      onAuthStateChange: vi.fn(() => ({ data: { listener: { subscription: { unsubscribe: vi.fn() } }, subscription: { unsubscribe: vi.fn() } } })),
      signUp: vi.fn(async () => ({ data: { user: null }, error: null })),
      signInWithPassword: vi.fn(async () => ({ data: { user: null }, error: null })),
      signOut: vi.fn(async () => ({ error: null }))
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({ order: vi.fn(async () => ({ data: [], error: null })) })),
      upsert: vi.fn(async () => ({ error: null })),
      insert: vi.fn(() => ({ select: vi.fn(() => ({ single: vi.fn(async () => ({ data: null, error: null })) })) }))
    }))
  }
}));

const visibleText = () => document.body.textContent ?? '';

describe('PetMemory 1c desktop and 1g mobile implementation', () => {
  beforeEach(() => {
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'blob:pet-photo-preview'),
      revokeObjectURL: vi.fn()
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('implements the selected 1c premium desktop landing direction', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /a memorial worthy of a life well loved/i })).toBeInTheDocument();
    expect(screen.getByText(/handcrafted remembrance/i)).toBeInTheDocument();
    expect(screen.getAllByText(/hand-cast/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/7–10 days/i)).toBeInTheDocument();
    expect(screen.getByText(/lifetime/i)).toBeInTheDocument();
    expect(screen.getAllByText(/the oakford plaque/i)[0]).toBeInTheDocument();
  });

  it('connects keepsake/plaque buttons to the dropship order flow', () => {
    render(<App />);

    const customizeLinks = screen.getAllByRole('link', { name: /customize/i });
    expect(customizeLinks).toHaveLength(3);
    expect(customizeLinks[0]).toHaveAttribute('href', expect.stringContaining('https://dropship.petmemory.app/order'));
    expect(customizeLinks[0]).toHaveAttribute('href', expect.stringContaining('product=oakford-plaque'));
    expect(customizeLinks[0]).toHaveAttribute('target', '_blank');

    expect(screen.getByRole('link', { name: /continue to dropship checkout/i })).toHaveAttribute('href', expect.stringContaining('dropship.petmemory.app/order'));
  });

  it('adds the selected 1g mobile memorial card with timeline and respects', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /^biscuit$/i })).toBeInTheDocument();
    expect(screen.getByText(/golden retriever · portland, or/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /timeline · 12 moments/i })).toBeInTheDocument();
    expect(screen.getAllByText(/gotcha day/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/first snow/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/last summer/i)[0]).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /respects · 82/i })).toBeInTheDocument();
    expect(screen.getAllByText(/candles/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/flowers/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/pawprints/i)[0]).toBeInTheDocument();
  });

  it('keeps Supabase signup/login portal visible and connected', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /sign in to save the memorial/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('type', 'password');
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    expect(visibleText()).toMatch(/connected to supabase/i);
  });

  it('shows read-only example account data before login', () => {
    render(<App />);

    expect(screen.getByText(/example memorial account/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /example animals/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /example timeline/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /example respects/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /example basket/i })).toBeInTheDocument();
    expect(screen.getByText(/the oakford plaque, the portrait frame/i)).toBeInTheDocument();
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
});
