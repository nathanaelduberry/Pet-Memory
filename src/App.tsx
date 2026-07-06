import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import { Camera, ChevronLeft, Heart, LockKeyhole, PawPrint, Share2, ShoppingBag, Sparkles, UploadCloud } from 'lucide-react';
import AccountPortal from './components/AccountPortal';

type Product = {
  id: string;
  name: string;
  plainName: string;
  description: string;
  price: number;
  priceLabel: string;
  image: string;
  material: string;
  turnaround: string;
  includes: string[];
};

type BasketLine = {
  id: string;
  productName: string;
  price: number;
  petName: string;
  finish: string;
};

const heroProof = [
  ['Hand-cast', 'solid bronze & oak'],
  ['7–10 days', 'made to order'],
  ['Lifetime', 'memorial hosting']
];

const products: Product[] = [
  {
    id: 'oakford-plaque',
    name: 'The Oakford Plaque',
    plainName: 'Bronze plaque',
    description: 'Hand-cast bronze mounted on oak with engraved dates and a scannable memorial link.',
    price: 98,
    priceLabel: '$98',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80',
    material: 'Bronze + oak',
    turnaround: '7–10 days',
    includes: ['Engraved name and dates', 'QR memorial link', 'Gift-ready box']
  },
  {
    id: 'portrait-frame',
    name: 'The Portrait Frame',
    plainName: 'Museum portrait frame',
    description: 'Museum-mounted portrait in walnut with a printed story card and optional memory QR.',
    price: 74,
    priceLabel: '$74',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80',
    material: 'Walnut frame',
    turnaround: '5–8 days',
    includes: ['Archival photo print', 'Story card', 'Wall or shelf display']
  },
  {
    id: 'garden-stone',
    name: 'The Garden Stone',
    plainName: 'Garden stone',
    description: 'Weatherproof garden memorial with deep engraving for the places they loved outside.',
    price: 86,
    priceLabel: '$86',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=900&q=80',
    material: 'Cast stone',
    turnaround: '8–12 days',
    includes: ['Outdoor-safe engraving', 'Protective seal', 'Care instructions']
  }
];

const moments = [
  { title: 'Gotcha day', date: 'March 2011', color: 'clay' },
  { title: 'First snow', date: 'December 2014', color: 'gold' },
  { title: 'Last summer', date: 'August 2024', color: 'sage' }
];

const formatCurrency = (value: number) => `$${value.toFixed(0)}`;

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
          <a href="#inventory">Inventory</a>
          <a href="#customize/oakford-plaque">Studio</a>
          <a href="#checkout">Checkout</a>
          <a href="#account">Sign in</a>
        </nav>
        <a className="outline-pill" href="#customize/oakford-plaque">Begin a memorial</a>
      </header>

      <div className="premium-hero">
        <div className="hero-copy">
          <p className="gold-eyebrow">Handcrafted remembrance</p>
          <h1>A memorial worthy of a life well loved.</h1>
          <p className="hero-text">Preserve their story online, then hold it in your hands — plaques and portraits cast, engraved, and finished by hand.</p>
          <div className="hero-actions">
            <a className="gold-button" href="#inventory">Explore the collection</a>
            <a className="dark-button" href="#account">Create a profile</a>
          </div>
          <div className="proof-row">
            {heroProof.map(([value, label]) => (
              <div key={value}><strong>{value}</strong><span>{label}</span></div>
            ))}
          </div>
        </div>
        <div className="plaque-hero" aria-label="The Oakford Plaque preview">
          <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=80" alt="Golden retriever memorial portrait placeholder" />
          <div className="plaque-float"><strong>The Oakford Plaque</strong><span>Bronze on oak · from $98</span></div>
        </div>
      </div>
    </section>
  );
}

function CollectionSection() {
  return (
    <section id="collection" className="collection-section">
      <div className="section-title-row">
        <div><p className="brown-eyebrow">The Collection</p><h2>Keepsakes made to last</h2></div>
        <a href="#inventory">All keepsakes →</a>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <img src={product.image} alt={`${product.name} product placeholder`} />
            <div className="product-body">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-action-row"><strong>from {product.priceLabel}</strong><a href={`#customize/${product.id}`}>Customize</a></div>
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
          ['1', 'Create their profile', 'Name, dates, story, privacy, photos, videos, and invitations.'],
          ['2', 'Add timeline moments', 'Save dates, times, memories, media, and respect notes.'],
          ['3', 'Customize the keepsake', 'Choose material, finish, engraving, portrait crop, and gift note.'],
          ['4', 'Checkout white-label', 'Guests can order immediately; signed-in families can save everything.']
        ].map(([num, title, text]) => (<article className="step-card" key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p></article>))}
      </div>
    </section>
  );
}

function MobileMemorialProfile() {
  return (
    <section id="memorial-profile" className="mobile-showcase" aria-label="Mobile memorial profile layout">
      <div className="mobile-showcase-copy"><p className="gold-eyebrow">Mobile memorial profile</p><h2>Timeline moments and respects live on the memorial card.</h2><p>Design 1g becomes the phone-first experience: photo, life dates, story, timeline, respect buttons, and sharing in one warm profile.</p></div>
      <div className="phone-frame">
        <div className="phone-screen">
          <div className="phone-notch" />
          <div className="mobile-photo"><div className="mobile-status"><span>9:41</span><span>● ● ● ▂▃▅ ▮</span></div><a className="round-icon left" href="#top" aria-label="Back"><ChevronLeft size={18} /></a><button className="round-icon right" aria-label="Share memorial"><Share2 size={14} /></button><span className="memory-label">In loving memory</span></div>
          <div className="mobile-content">
            <div className="pet-heading-row"><div><h2>Biscuit</h2><p>Golden retriever · Portland, OR</p></div><strong>2011 —<br />2024</strong></div>
            <p className="pet-story">The best napper on the porch and greeter of every guest. Thirteen years of muddy paws and perfect mornings.</p>
            <div className="mobile-actions"><button>Leave a respect</button><button>Share</button></div>
            <div className="timeline-mini"><h3>Timeline · 12 moments</h3><div className="timeline-rail">{moments.map((moment) => (<article className={`moment-row ${moment.color}`} key={moment.title}><span className="moment-dot" /><img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=220&q=80" alt="Pet memory thumbnail" /><div><strong>{moment.title}</strong><span>{moment.date}</span></div></article>))}</div></div>
            <div className="respect-summary"><h3>Respects · 82</h3><div className="respect-grid"><article><span>🕯</span><strong>24</strong><small>Candles</small></article><article><span>🌼</span><strong>18</strong><small>Flowers</small></article><article><span>🐾</span><strong>40</strong><small>Pawprints</small></article></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BuilderPreview() {
  const [previewUrl, setPreviewUrl] = useState('');
  const [fileName, setFileName] = useState('No photo selected yet');

  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

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
      <div className="section-title-row"><div><p className="brown-eyebrow"><Camera size={14} /> Photo upload preview</p><h2>Attach the photo, story, timeline, and keepsake in one flow.</h2></div><p>Structure follows the mobile profile direction: image first, then life dates, story, moments, respects, and order-ready keepsakes.</p></div>
      <div className="upload-panel"><label>Add their photo<input type="file" accept="image/*" onChange={handlePhotoChange} /></label><div className="upload-preview">{previewUrl ? <img src={previewUrl} alt="Uploaded pet preview" /> : <span>Photo preview appears here</span>}</div><p>{fileName}</p></div>
      <div className="builder-grid"><article><LockKeyhole size={22} /><h3>Private by default</h3><p>Profiles save to the signed-in owner. Public memorials can be shared when the family chooses.</p></article><article><Heart size={22} /><h3>Timeline + respects</h3><p>Moments and respects are designed into the memorial card instead of buried elsewhere.</p></article><article><ShoppingBag size={22} /><h3>Order-ready basket</h3><p>Customize buttons now open the in-app item builder and white-label checkout.</p></article></div>
    </section>
  );
}

function CommerceExperience() {
  const [basket, setBasket] = useState<BasketLine[]>(() => {
    try { return JSON.parse(localStorage.getItem('petmemory-basket') || '[]') as BasketLine[]; } catch { return []; }
  });
  const [petName, setPetName] = useState('Biscuit');
  const [lifeDates, setLifeDates] = useState('2011 - 2024');
  const [favoriteMemory, setFavoriteMemory] = useState('Porch naps, muddy paws, and morning walks.');
  const [momentDate, setMomentDate] = useState('');
  const [momentTime, setMomentTime] = useState('');
  const [finish, setFinish] = useState('Bronze on oak');
  const [engraving, setEngraving] = useState('Forever loved, forever home.');
  const [photoName, setPhotoName] = useState('No memorial photo imported yet');
  const [videoName, setVideoName] = useState('No memorial video imported yet');
  const [photoPreview, setPhotoPreview] = useState('');

  useEffect(() => { localStorage.setItem('petmemory-basket', JSON.stringify(basket)); }, [basket]);
  useEffect(() => () => { if (photoPreview) URL.revokeObjectURL(photoPreview); }, [photoPreview]);

  const subtotal = useMemo(() => basket.reduce((sum, item) => sum + item.price, 0), [basket]);
  const shipping = basket.length ? 9 : 0;
  const total = subtotal + shipping;

  const importPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(URL.createObjectURL(file));
    setPhotoName(file.name);
  };

  const importVideo = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setVideoName(file.name);
  };

  const addToBasket = (product: Product) => {
    setBasket((current) => [...current, { id: `${product.id}-${Date.now()}`, productName: product.name, price: product.price, petName, finish }]);
  };

  return (
    <section id="inventory" className="commerce-section">
      <div className="section-title-row">
        <div><p className="brown-eyebrow"><ShoppingBag size={14} /> Inventory</p><h2>Inventory memorials</h2><p>Itemized memorials to be purchased</p></div>
        <p>Choose the keepsake, customize the pet story, import media, then complete guest checkout or sign in to save everything.</p>
      </div>

      <div className="inventory-grid">
        {products.map((product) => (
          <article className="inventory-card" key={product.id} id={`customize/${product.id}`}>
            <img src={product.image} alt={`${product.plainName} inventory preview`} />
            <div>
              <p className="brown-eyebrow">{product.plainName}</p>
              <h3>Customize {product.name}</h3>
              <p>{product.description}</p>
              <dl>
                <div><dt>Material</dt><dd>{product.material}</dd></div>
                <div><dt>Lead time</dt><dd>{product.turnaround}</dd></div>
                <div><dt>Base price</dt><dd>{product.priceLabel}</dd></div>
              </dl>
              <ul>{product.includes.map((item) => <li key={item}>{item}</li>)}</ul>
              <div className="inventory-actions"><a href={`#customize/${product.id}`}>Customize</a><button type="button" onClick={() => addToBasket(product)}>Add to basket</button></div>
            </div>
          </article>
        ))}
      </div>

      <div className="custom-checkout-grid">
        <form className="customizer-panel" id="customize/oakford-plaque">
          <p className="brown-eyebrow"><UploadCloud size={14} /> Personalization studio</p>
          <h2>Customize The Oakford Plaque</h2>
          <div className="form-grid">
            <label>Pet name<input value={petName} onChange={(event) => setPetName(event.target.value)} /></label>
            <label>Life dates<input value={lifeDates} onChange={(event) => setLifeDates(event.target.value)} placeholder="2015 - 2026" /></label>
            <label>Moment date<input type="date" value={momentDate} onChange={(event) => setMomentDate(event.target.value)} /></label>
            <label>Moment time<input type="time" value={momentTime} onChange={(event) => setMomentTime(event.target.value)} /></label>
            <label>Finish<select value={finish} onChange={(event) => setFinish(event.target.value)}><option>Bronze on oak</option><option>Walnut frame</option><option>Garden stone</option><option>Matte black plate</option></select></label>
            <label>Engraving<input value={engraving} onChange={(event) => setEngraving(event.target.value)} /></label>
          </div>
          <label>Favorite memory<textarea value={favoriteMemory} onChange={(event) => setFavoriteMemory(event.target.value)} /></label>
          <div className="media-imports">
            <label>Import memorial photo<input type="file" accept="image/*" onChange={importPhoto} /></label>
            <label>Import memorial video<input type="file" accept="video/*" onChange={importVideo} /></label>
          </div>
        </form>

        <aside className="live-order-card">
          <p className="brown-eyebrow">Live preview</p>
          <div className="order-photo-preview">{photoPreview ? <img src={photoPreview} alt="Custom memorial photo preview" /> : <span>Import a photo to preview it here</span>}</div>
          <h3>Preview: {petName || 'Pet name'}</h3>
          <p>{lifeDates}</p>
          <p>{favoriteMemory}</p>
          <p>{momentDate}{momentTime ? ` · ${momentTime}` : ''}</p>
          <strong>{finish}</strong>
          <small>{engraving}</small>
          <small>{photoName}</small>
          <small>{videoName}</small>
          <button type="button" onClick={() => addToBasket(products[0])}>Add customized plaque to basket</button>
        </aside>
      </div>

      <section className="checkout-panel" id="checkout">
        <div><p className="brown-eyebrow">Basket · {basket.length} {basket.length === 1 ? 'item' : 'items'}</p><h2>White-label checkout</h2><p>Guest checkout available. Signed-in users can save this basket, media, dates, times, and memories to their PetMemory vault.</p></div>
        <div className="basket-lines">
          {basket.length === 0 ? <p>Your basket is empty. Add a memorial above.</p> : basket.map((item) => <article key={item.id}><strong>{item.productName}</strong><span>{item.petName} · {item.finish}</span><b>{formatCurrency(item.price)}</b></article>)}
        </div>
        <form className="guest-checkout">
          <label>Guest email<input type="email" placeholder="you@example.com" /></label>
          <label>Shipping name<input placeholder="Full name" /></label>
          <label>Shipping address<textarea placeholder="Street, city, state, ZIP" /></label>
          <label>Payment method<select><option>Card ending later</option><option>PayPal later</option><option>Invoice draft</option></select></label>
          <div className="totals"><span>Subtotal {formatCurrency(subtotal)}</span><span>Shipping {formatCurrency(shipping)}</span><strong>Total {formatCurrency(total)}</strong></div>
          <button type="button">Place white-label order</button>
        </form>
      </section>
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
      <CommerceExperience />
      <AccountPortal />
      <section className="final-band"><Sparkles size={18} /><h2>Start the memorial, then choose the keepsake when you are ready.</h2><a className="gold-button" href="#account">Create a PetMemory account</a></section>
    </main>
  );
}
