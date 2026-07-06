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
    storage: { from: vi.fn(() => ({ upload: vi.fn(async () => ({ data: null, error: { message: 'bucket missing in test' } })) })) },
    from: vi.fn(() => ({
      select: vi.fn(() => ({ order: vi.fn(async () => ({ data: [], error: null })) })),
      upsert: vi.fn(async () => ({ error: null })),
      insert: vi.fn(() => ({ select: vi.fn(() => ({ single: vi.fn(async () => ({ data: null, error: null })) })) }))
    }))
  }
}));

const visibleText = () => document.body.textContent ?? '';

describe('PetMemory commerce and memorial builder', () => {
  beforeEach(() => {
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'blob:pet-photo-preview'),
      revokeObjectURL: vi.fn()
    });
    localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('implements the selected 1c premium desktop landing direction', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /a memorial worthy of a life well loved/i })).toBeInTheDocument();
    expect(screen.getByText(/handcrafted remembrance/i)).toBeInTheDocument();
    expect(screen.getAllByText(/hand-cast/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/7–10 days/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/lifetime/i)).toBeInTheDocument();
    expect(screen.getAllByText(/the oakford plaque/i)[0]).toBeInTheDocument();
  });

  it('lands customize buttons on real in-app white-label item pages instead of external handoff links', () => {
    render(<App />);

    const customizeLinks = screen.getAllByRole('link', { name: /customize/i });
    expect(customizeLinks).toHaveLength(6);
    expect(customizeLinks[0]).toHaveAttribute('href', '#customize/oakford-plaque');
    expect(customizeLinks[1]).toHaveAttribute('href', '#customize/portrait-frame');
    expect(customizeLinks[2]).toHaveAttribute('href', '#customize/garden-stone');

    expect(screen.getAllByRole('heading', { name: /customize the oakford plaque/i })[0]).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /white-label checkout/i })).toBeInTheDocument();
  });

  it('creates an itemized purchasable memorial inventory with add-to-basket controls', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole('heading', { name: /inventory memorials/i })).toBeInTheDocument();
    expect(screen.getByText(/bronze plaque/i)).toBeInTheDocument();
    expect(screen.getByText(/museum portrait frame/i)).toBeInTheDocument();
    expect(screen.getAllByText(/garden stone/i)[0]).toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: /add to basket/i })[0]);
    expect(screen.getByText(/basket · 1 item/i)).toBeInTheDocument();
    expect(screen.getByText(/guest checkout available/i)).toBeInTheDocument();
  });

  it('supports importing pictures and videos into the customizer with live previews', async () => {
    const user = userEvent.setup();
    render(<App />);

    const image = new File(['pet-image'], 'milo.jpg', { type: 'image/jpeg' });
    const video = new File(['pet-video'], 'milo-run.mp4', { type: 'video/mp4' });

    await user.upload(screen.getByLabelText(/import memorial photo/i), image);
    await user.upload(screen.getByLabelText(/import memorial video/i), video);

    expect(screen.getByAltText(/custom memorial photo preview/i)).toHaveAttribute('src', 'blob:pet-photo-preview');
    expect(screen.getByText(/milo.jpg/i)).toBeInTheDocument();
    expect(screen.getByText(/milo-run.mp4/i)).toBeInTheDocument();
  });

  it('captures item customization, dates, times, and memories for checkout', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.clear(screen.getByLabelText(/^pet name$/i));
    await user.type(screen.getByLabelText(/^pet name$/i), 'Milo');
    await user.type(screen.getByLabelText(/^life dates$/i), '2015 - 2026');
    await user.clear(screen.getByLabelText(/^favorite memory$/i));
    await user.type(screen.getByLabelText(/^favorite memory$/i), 'Always sleeping in the sun.');
    await user.type(screen.getByLabelText(/^moment date$/i), '2026-07-06');
    await user.type(screen.getByLabelText(/^moment time$/i), '09:41');
    await user.selectOptions(screen.getByLabelText(/^finish$/i), 'Walnut frame');

    expect(screen.getAllByText(/Milo/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/2015 - 2026/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Always sleeping in the sun/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Walnut frame/i)[0]).toBeInTheDocument();
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

  it('keeps Supabase signup/login portal visible and ready for deeper saved memorials', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /sign in to save the memorial/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('type', 'password');
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /signed-in memory vault/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/saved pet photo/i)).toHaveAttribute('accept', 'image/*');
    expect(screen.getByLabelText(/saved memory video/i)).toHaveAttribute('accept', 'video/*');
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
});
