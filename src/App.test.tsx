import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('PetMemory landing experience', () => {
  beforeEach(() => {
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'blob:pet-photo-preview'),
      revokeObjectURL: vi.fn()
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

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

  it('connects the memorial plaque order button to a dropship handoff URL', () => {
    render(<App />);

    const plaqueLinks = screen.getAllByRole('link', { name: /order a memorial plaque/i });
    expect(plaqueLinks[0]).toHaveAttribute('href', expect.stringContaining('dropship'));
    expect(plaqueLinks[0]).toHaveAttribute('target', '_blank');
    expect(plaqueLinks[0]).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('previews uploaded pet photos immediately and revokes the blob when replaced', async () => {
    const user = userEvent.setup();
    render(<App />);

    const upload = screen.getByLabelText(/upload pet photo/i);
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

  it('adds timeline moments and respect activity to memorial profile cards', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /bailey's timeline/i })).toBeInTheDocument();
    expect(screen.getByText(/first beach day/i)).toBeInTheDocument();
    expect(screen.getByText(/latest respect/i)).toBeInTheDocument();
    expect(screen.getByText(/left a flower/i)).toBeInTheDocument();
  });
});
