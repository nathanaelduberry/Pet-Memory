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

const renderRoute = (hash = '#/social') => {
  window.location.hash = hash;
  return render(<App />);
};

describe('PetMemory deeplinked pages', () => {
  beforeEach(() => {
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'blob:pet-photo-preview'),
      revokeObjectURL: vi.fn()
    });
    localStorage.clear();
    window.location.hash = '#/social';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('uses Jordan header tabs and changes Begin a Memorial to Post', () => {
    renderRoute('#/social');

    const nav = screen.getByRole('navigation', { name: /primary navigation/i });
    expect(nav).toHaveTextContent(/social/i);
    expect(nav).toHaveTextContent(/memorials/i);
    expect(nav).toHaveTextContent(/keepsakes/i);
    expect(nav).toHaveTextContent(/sign in/i);
    expect(screen.getByRole('link', { name: /basket with 0 items/i })).toHaveAttribute('href', '#/checkout');
    expect(screen.getAllByRole('link', { name: /^post$/i })[0]).toHaveAttribute('href', '#/post');
    expect(screen.queryByText(/begin a memorial/i)).not.toBeInTheDocument();
  });

  it('keeps the index/social page useful with popular keepsakes while keeping sign-in separate', async () => {
    const user = userEvent.setup();
    renderRoute('#/social');

    expect(screen.getByRole('heading', { name: /a gentle place to post/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /keepsakes made to last/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /all keepsakes/i })).toHaveAttribute('href', '#/keepsakes');
    expect(screen.getByText(/the oakford plaque/i)).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /sign in to save the memorial/i })).not.toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: /add to basket/i })[0]);
    expect(screen.getByRole('link', { name: /basket with 1 items/i })).toHaveTextContent(/basket · 1/i);
  });

  it('deep-links to independent memorials, keepsakes, sign-in, checkout, and customizer pages', () => {
    const { unmount } = renderRoute('#/memorials');
    expect(screen.getByRole('heading', { name: /^biscuit$/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /keepsakes made to last/i })).not.toBeInTheDocument();
    unmount();

    renderRoute('#/keepsakes');
    expect(screen.getByRole('heading', { name: /keepsakes made to last/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /basket \/ checkout/i })).toHaveAttribute('href', '#/checkout');
    unmount();

    renderRoute('#/signin');
    expect(screen.getByRole('heading', { name: /sign in to save the memorial/i })).toBeInTheDocument();
    unmount();

    renderRoute('#/checkout');
    expect(screen.getByRole('heading', { name: /white-label checkout/i })).toBeInTheDocument();
    unmount();

    renderRoute('#/customize/portrait-frame');
    expect(screen.getByRole('heading', { name: /customize the portrait frame/i })).toBeInTheDocument();
  });

  it('post page categorizes content as memorial or general post', async () => {
    const user = userEvent.setup();
    renderRoute('#/post');

    expect(screen.getByRole('heading', { name: /create a post/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/post category/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /publish memorial post/i })).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText(/post category/i), 'general');
    expect(screen.getByRole('button', { name: /publish general post/i })).toBeInTheDocument();
  });

  it('supports picture and video import on the post and customizer pages', async () => {
    const user = userEvent.setup();
    const image = new File(['pet-image'], 'milo.jpg', { type: 'image/jpeg' });
    const video = new File(['pet-video'], 'milo-run.mp4', { type: 'video/mp4' });

    const { unmount } = renderRoute('#/post');
    await user.upload(screen.getByLabelText(/import pictures/i), image);
    await user.upload(screen.getByLabelText(/import videos/i), video);
    expect(screen.getByText(/milo.jpg/i)).toBeInTheDocument();
    expect(screen.getByText(/milo-run.mp4/i)).toBeInTheDocument();
    unmount();

    renderRoute('#/customize/oakford-plaque');
    await user.upload(screen.getByLabelText(/import memorial photo/i), image);
    await user.upload(screen.getByLabelText(/import memorial video/i), video);
    expect(screen.getByAltText(/custom memorial photo preview/i)).toHaveAttribute('src', 'blob:pet-photo-preview');
    expect(screen.getByText(/milo.jpg/i)).toBeInTheDocument();
    expect(screen.getByText(/milo-run.mp4/i)).toBeInTheDocument();
  });
});
