import { useEffect, useState, type ChangeEvent } from 'react';
import { Camera, ChevronLeft, Heart, LockKeyhole, PawPrint, Share2, ShoppingBag, Sparkles } from 'lucide-react';
import AccountPortal from './components/AccountPortal';

const heroProof = [
  ['Hand-cast', 'solid bronze & oak'],
  ['7–10 days', 'made to order'],
  ['Lifetime', 'memorial hosting']
];

const products = [
  {
    id: 'oakford-plaque',
    name: 'The Oakford Plaque',
    description: 'Hand-cast bronze mounted on oak.',
    price: '$98',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80',
    checkout: 'https://dropship.petmemory.app/order?product=oakford-plaque&source=petmemory'
  },
  {
    id: 'portrait-frame',
    name: 'The Portrait Frame',
    description: 'Museum-mounted, in solid walnut.',
    price: '$74',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80',
    checkout: 'https://dropship.petmemory.app/order?product=portrait-frame&source=petmemory'
  },
  {
    id: 'garden-stone',
    name: 'The Garden Stone',
    description: 'Weatherproof, engraved by hand.',
    price: '$86',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=900&q=80',
    checkout: 'https://dropship.petmemory.app/order?product=garden-stone&source=petmemory'
  }
];

const moments = [
  { title: 'Gotcha day', date: 'March 2011', color: 'clay' },
  { title: 'First snow', date: 'December 2014', color: 'gold' },
  { title: 'Last summer', date: 'August 2024', color: 'sage' }
];

function DesktopLanding() {
  return (
    <section id="top" className="premium-shell" aria-label="PetMemory premium keepsake home">
      <header className="premium-nav">
        <a className="premium-brand" href="#top" aria-label="PetMemory home">
          <span className="brand-dot" />
          <span>PetMemory</span>
        </a>
        <nav className="premium-links" aria-label="Primary navigation">
          <a href="#collection">The Collection</a>
          <a href="#how-it-works">How it works</a>
          <a href="#memorial-profile">Memorials</a>
          <a href="#account">Sign in</a>
        </nav>
        <a className="outline-pill" href="#account">Begin a memorial</a>
      </header>

      <div className="premium-hero">
        <div className="hero-copy">
          <p className="gold-eyebrow">Handcrafted remembrance</p>
          <h1>A memorial worthy of a life well loved.</h1>
          <p className="hero-text">
            Preserve their story online, then hold it in your hands — plaques and portraits cast, engraved, and finished by hand.
          </p>
          <div className="hero-actions">
            <a className="gold-button" href="#collection">Explore the collection</a>
            <a className="dark-button" href="#account">Create a profile</a>
          </div>
          <div className="proof-row">
            {heroProof.map(([value, label]) => (
              <div key={value}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="plaque-hero" aria-label="The Oakford Plaque preview">
          <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=80" alt="Golden retriever memorial portrait placeholder" />
          <div className="plaque-float">
            <strong>The Oakford Plaque</strong>
            <span>Bronze on oak · from $98</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CollectionSection() {
  return (
    <section id="collection" className="collection-section">
      <div className="section-title-row">
        <div>
          <p className="brown-eyebrow">The Collection</p>
          <h2>Keepsakes made to last</h2>
        </div>
        <a href="#collection">All keepsakes →</a>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <img src={product.image} alt={`${product.name} product placeholder`} />
            <div className="product-body">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-action-row">
                <strong>from {product.price}</strong>
                <a href={product.checkout} target="_blank" rel="noreferrer noopener">Customize</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="how-section">
      <p className="brown-eyebrow">How it works</p>
      <div className="steps-grid">
        {[
          ['1', 'Create their profile', 'Name, dates, story, privacy, and the photo that feels most like them.'],
          ['2', 'Add timeline moments', 'Build a small life story from gotcha day to last summer.'],
          ['3', 'Collect respects', 'Family can leave candles, flowers, pawprints, and notes.'],
          ['4', 'Order a keepsake', 'Send plaque details to the dropship flow when you are ready.']
        ].map(([num, title, text]) => (
          <article className="step-card" key={num}>
            <span>{num}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function MobileMemorialProfile() {
  return (
    <section id="memorial-profile" className="mobile-showcase" aria-label="Mobile memorial profile layout">
      <div className="mobile-showcase-copy">
        <p className="gold-eyebrow">Mobile memorial profile</p>
        <h2>Timeline moments and respects live on the memorial card.</h2>
        <p>Design 1g becomes the phone-first experience: photo, life dates, story, timeline, respect buttons, and sharing in one warm profile.</p>
      </div>
      <div className="phone-frame">
        <div className="phone-screen">
          <div className="phone-notch" />
          <div className="mobile-photo">
            <div className="mobile-status"><span>9:41</span><span>● ● ● ▂▃▅ ▮</span></div>
            <a className="round-icon left" href="#top" aria-label="Back"><ChevronLeft size={18} /></a>
            <button className="round-icon right" aria-label="Share memorial"><Share2 size={14} /></button>
            <span className="memory-label">In loving memory</span>
          </div>
          <div className="mobile-content">
            <div className="pet-heading-row">
              <div>
                <h2>Biscuit</h2>
                <p>Golden retriever · Portland, OR</p>
              </div>
              <strong>2011 —<br />2024</strong>
            </div>
            <p className="pet-story">The best napper on the porch and greeter of every guest. Thirteen years of muddy paws and perfect mornings.</p>
            <div className="mobile-actions">
              <button>Leave a respect</button>
              <button>Share</button>
            </div>
            <div className="timeline-mini">
              <h3>Timeline · 12 moments</h3>
              <div className="timeline-rail">
                {moments.map((moment) => (
                  <article className={`moment-row ${moment.color}`} key={moment.title}>
                    <span className="moment-dot" />
                    <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=220&q=80" alt="Pet memory thumbnail" />
                    <div>
                      <strong>{moment.title}</strong>
                      <span>{moment.date}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="respect-summary">
              <h3>Respects · 82</h3>
              <div className="respect-grid">
                <article><span>🕯</span><strong>24</strong><small>Candles</small></article>
                <article><span>🌼</span><strong>18</strong><small>Flowers</small></article>
                <article><span>🐾</span><strong>40</strong><small>Pawprints</small></article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BuilderPreview() {
  const [previewUrl, setPreviewUrl] = useState('');
  const [fileName, setFileName] = useState('No photo selected yet');

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const nextPreview = URL.createObjectURL(file);
    setPreviewUrl(nextPreview);
    setFileName(file.name);
  };

  return (
    <section id="studio" className="builder-section">
      <div className="section-title-row">
        <div>
          <p className="brown-eyebrow"><Camera size={14} /> Photo upload preview</p>
          <h2>Attach the photo, story, timeline, and keepsake in one flow.</h2>
        </div>
        <p>Structure follows the mobile profile direction: image first, then life dates, story, moments, respects, and order-ready keepsakes.</p>
      </div>
      <div className="upload-panel">
        <label>
          Add their photo
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </label>
        <div className="upload-preview">
          {previewUrl ? <img src={previewUrl} alt="Uploaded pet preview" /> : <span>Photo preview appears here</span>}
        </div>
        <p>{fileName}</p>
      </div>
      <div className="builder-grid">
        <article>
          <LockKeyhole size={22} />
          <h3>Private by default</h3>
          <p>Profiles save to the signed-in owner. Public memorials can be shared when the family chooses.</p>
        </article>
        <article>
          <Heart size={22} />
          <h3>Timeline + respects</h3>
          <p>Moments and respects are designed into the memorial card instead of buried elsewhere.</p>
        </article>
        <article>
          <ShoppingBag size={22} />
          <h3>Dropship handoff</h3>
          <p>Customize buttons send the selected product and memorial context into the order flow.</p>
        </article>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main>
      <DesktopLanding />
      <CollectionSection />
      <HowItWorks />
      <MobileMemorialProfile />
      <BuilderPreview />
      <AccountPortal />
      <section className="final-band">
        <Sparkles size={18} />
        <h2>Start the memorial, then choose the keepsake when you are ready.</h2>
        <a className="gold-button" href="#account">Create a PetMemory account</a>
      </section>
    </main>
  );
}
