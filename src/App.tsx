import { Flower2, HeartHandshake, Images, MessageCircleHeart, PawPrint, QrCode, Sparkles } from 'lucide-react';

const featurePillars = [
  {
    title: 'Moments',
    icon: Images,
    copy: 'Build a gentle memory timeline with photos, dates, and the little stories that made each pet unforgettable.'
  },
  {
    title: 'Respects',
    icon: Flower2,
    copy: 'Let visitors light a candle, leave a flower, or send a quiet paw of love when words are hard.'
  },
  {
    title: 'Tributes',
    icon: MessageCircleHeart,
    copy: 'Collect written memories from family and friends, with owner moderation for a safe memorial space.'
  },
  {
    title: 'Memorial Plaques',
    icon: QrCode,
    copy: 'Connect each digital memorial to an optional physical QR keepsake plaque prepared for dropship checkout.'
  }
];

const previewStats = [
  ['12', 'respects'],
  ['5', 'moments'],
  ['3', 'tributes']
];

export default function App() {
  return (
    <main className="site-shell">
      <header className="topbar" aria-label="PetMemory navigation">
        <a className="brand" href="#top" aria-label="PetMemory home">
          <span className="brand-mark"><PawPrint size={20} aria-hidden="true" /></span>
          <span>PetMemory</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#browse">Browse</a>
          <a href="#features">Features</a>
          <a href="#plaque">Plaques</a>
        </nav>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={16} aria-hidden="true" /> Sister program to Memoria</p>
          <h1>PetMemory</h1>
          <p className="hero-lede">
            Pet Memory is the pet-oriented memorial application we are creating as a sister program to Memoria,
            shaped around beloved pets, living stories, gentle respects, and physical QR keepsake plaques.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <a className="button primary" href="#create">Create a Memorial</a>
            <a className="button secondary" href="#browse">Browse Memorials</a>
            <a className="button ghost" href="#plaque">Order a Memorial Plaque</a>
          </div>
        </div>

        <aside className="memorial-preview" aria-label="Memorial profile card preview">
          <div className="photo-frame">
            <span className="paw-orb"><PawPrint size={42} aria-hidden="true" /></span>
          </div>
          <div className="preview-body">
            <p className="label">Featured memorial</p>
            <h2>Bailey</h2>
            <p className="dates">2012 — 2025</p>
            <p>
              A loyal friend, porch sunbather, and forever part of the family garden.
            </p>
            <div className="stat-row">
              {previewStats.map(([value, label]) => (
                <span key={label}>
                  <strong>{value}</strong>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section id="features" className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Approved MVP pillars</p>
          <h2>A memorial that feels alive, warm, and pet-specific.</h2>
        </div>
        <div className="feature-grid">
          {featurePillars.map(({ title, icon: Icon, copy }) => (
            <article className="feature-card" key={title}>
              <span className="feature-icon"><Icon size={24} aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="plaque" className="plaque-section">
        <div>
          <p className="eyebrow"><QrCode size={16} aria-hidden="true" /> Dropship-ready path</p>
          <h2>Physical plaques connect the home, garden, and memorial page.</h2>
          <p>
            The first build should support a mock plaque checkout that passes pet name, memorial URL,
            profile photo, dates, and QR code data. Once confirmed, we can connect the supplier/dropship flow.
          </p>
        </div>
        <div className="plaque-card" aria-label="Plaque preview">
          <HeartHandshake size={38} aria-hidden="true" />
          <strong>QR Memorial Plaque</strong>
          <span>Garden stake · framed plaque · urn plate</span>
        </div>
      </section>

      <section id="create" className="section-block compact">
        <p className="eyebrow">Next build step</p>
        <h2>Create/Edit flow comes first, theme polish comes after structure.</h2>
        <p>
          The app will start with structure, memorial profiles, photo preview reliability, and rich cards.
          Then the warm PetMemory visual redesign will be applied across stable components.
        </p>
      </section>

      <section id="browse" className="section-block compact">
        <p className="eyebrow">Browse preview</p>
        <h2>Memorial cards will show latest moment, respects, tributes, and plaque actions.</h2>
        <p>
          This keeps browse and dashboard pages from feeling static, while giving owners useful next actions.
        </p>
      </section>
    </main>
  );
}
