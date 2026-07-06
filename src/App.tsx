import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import {
  CalendarHeart,
  Camera,
  Flower2,
  HeartHandshake,
  Images,
  MessageCircleHeart,
  PawPrint,
  QrCode,
  ShoppingBag,
  Sparkles,
  Upload
} from 'lucide-react';

const memorial = {
  name: 'Bailey',
  dates: '2012 — 2025',
  slug: 'bailey-forever-garden',
  story: 'A loyal friend, porch sunbather, and forever part of the family garden.',
  photoAlt: 'Uploaded pet preview'
};

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

const timelineMoments = [
  {
    date: 'May 2012',
    title: 'Came home',
    copy: 'Curled up in the laundry basket and claimed the whole house by bedtime.'
  },
  {
    date: 'Aug 2018',
    title: 'First beach day',
    copy: 'Chased tide foam, made friends with every kid, and slept the whole ride home.'
  },
  {
    date: 'Jun 2025',
    title: 'Garden farewell',
    copy: 'Family shared stories beside the porch where Bailey watched every sunset.'
  }
];

const respects = [
  { name: 'Jordan', action: 'left a flower', detail: 'For every tail wag at the gate.' },
  { name: 'Nate', action: 'lit a candle', detail: 'Still saving your sunny porch spot.' }
];

function buildDropshipUrl() {
  const params = new URLSearchParams({
    source: 'petmemory',
    dropship: 'qr-memorial-plaque',
    petName: memorial.name,
    memorialUrl: `https://nathanaelduberry.github.io/Pet-Memory/#memorial-${memorial.slug}`,
    product: 'garden-stake-framed-plaque-urn-plate',
    qrCode: `https://nathanaelduberry.github.io/Pet-Memory/#memorial-${memorial.slug}`
  });

  return `https://dropship.petmemory.app/order?${params.toString()}`;
}

export default function App() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState('No photo selected yet');
  const dropshipOrderUrl = useMemo(buildDropshipUrl, []);

  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = Array.from(event.target.files ?? []);

    if (!file) {
      return;
    }

    const nextPreview = URL.createObjectURL(file);
    setPhotoPreview((currentPreview) => {
      if (currentPreview) {
        URL.revokeObjectURL(currentPreview);
      }
      return nextPreview;
    });
    setPhotoName(file.name);

    // Allows choosing the same file again after deleting/replacing in the real create flow.
    event.target.value = '';
  };

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
          <a href="#timeline">Timeline</a>
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
            <a className="button ghost" href={dropshipOrderUrl} target="_blank" rel="noopener noreferrer">
              Order a Memorial Plaque
            </a>
          </div>
        </div>

        <aside className="memorial-preview" aria-label="Memorial profile card preview" id={`memorial-${memorial.slug}`}>
          <div className="photo-frame">
            {photoPreview ? (
              <img src={photoPreview} alt={memorial.photoAlt} className="pet-photo-preview" />
            ) : (
              <span className="paw-orb"><PawPrint size={42} aria-hidden="true" /></span>
            )}
            <label className="upload-chip">
              <Upload size={15} aria-hidden="true" />
              Upload pet photo
              <input type="file" accept="image/*" onChange={handlePhotoUpload} />
            </label>
          </div>
          <div className="preview-body">
            <p className="label">Featured memorial</p>
            <h2>{memorial.name}</h2>
            <p className="dates">{memorial.dates}</p>
            <p>{memorial.story}</p>
            <p className="upload-status"><Camera size={15} aria-hidden="true" /> {photoName}</p>
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

      <section id="timeline" className="timeline-section section-block">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow"><CalendarHeart size={16} aria-hidden="true" /> Timeline on memorial cards</p>
            <h2>Bailey&apos;s timeline</h2>
          </div>
          <p>
            Moments and respects now live directly on the memorial profile card structure, so each card feels active
            instead of static.
          </p>
        </div>
        <div className="timeline-layout">
          <ol className="timeline-list" aria-label="Bailey timeline moments">
            {timelineMoments.map((moment) => (
              <li key={moment.title}>
                <span>{moment.date}</span>
                <strong>{moment.title}</strong>
                <p>{moment.copy}</p>
              </li>
            ))}
          </ol>
          <aside className="respect-card" aria-label="Latest respect activity">
            <p className="label">Latest respect</p>
            {respects.map((respect) => (
              <article key={respect.name}>
                <strong>{respect.name}</strong>
                <span>{respect.action}</span>
                <p>{respect.detail}</p>
              </article>
            ))}
          </aside>
        </div>
      </section>

      <section id="plaque" className="plaque-section">
        <div>
          <p className="eyebrow"><QrCode size={16} aria-hidden="true" /> Dropship-ready path</p>
          <h2>Physical plaques connect the home, garden, and memorial page.</h2>
          <p>
            The plaque button now opens a dropship handoff URL carrying the pet name, memorial URL, product family,
            and QR code target. That gives the MVP a clean supplier integration point once the final vendor/API key is chosen.
          </p>
          <a className="button primary plaque-order" href={dropshipOrderUrl} target="_blank" rel="noopener noreferrer">
            <ShoppingBag size={17} aria-hidden="true" /> Order a Memorial Plaque
          </a>
        </div>
        <div className="plaque-card" aria-label="Plaque preview">
          <HeartHandshake size={38} aria-hidden="true" />
          <strong>QR Memorial Plaque</strong>
          <span>Garden stake · framed plaque · urn plate</span>
          <small>Dropship payload ready</small>
        </div>
      </section>

      <section id="create" className="section-block compact create-panel">
        <p className="eyebrow">Create flow structure</p>
        <h2>Photo preview reliability is built into the memorial create/edit path.</h2>
        <p>
          The upload control now creates a safe browser preview immediately, revokes old preview URLs when photos are replaced,
          and resets the file input so owners can reselect the same image without getting stuck.
        </p>
      </section>

      <section id="browse" className="section-block compact browse-panel">
        <p className="eyebrow">Browse preview</p>
        <h2>Memorial cards show latest moment, respects, tributes, and plaque actions.</h2>
        <p>
          This keeps browse and dashboard pages from feeling static, while giving owners useful next actions.
        </p>
      </section>
    </main>
  );
}
