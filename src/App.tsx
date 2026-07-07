import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import { Camera, ChevronLeft, Heart, LockKeyhole, PawPrint, Share2, ShoppingBag, Sparkles, UploadCloud } from 'lucide-react';
import AccountPortal from './components/AccountPortal';

type RouteName = 'social' | 'memorials' | 'keepsakes' | 'signin' | 'post' | 'checkout' | 'customize';

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
const routeHref = (route: string) => `#/${route}`;

function getRouteFromHash(): { route: RouteName; productId?: string } {
  const clean = window.location.hash.replace(/^#\/?/, '') || 'social';
  const [route, productId] = clean.split('/');
  if (route === 'customize') return { route: 'customize', productId };
  if (['social', 'memorials', 'keepsakes', 'signin', 'post', 'checkout'].includes(route)) return { route: route as RouteName };
  return { route: 'social' };
}

function AppHeader({ route }: { route: RouteName }) {
  const tabs: Array<[RouteName, string]> = [
    ['social', 'Social'],
    ['memorials', 'Memorials'],
    ['keepsakes', 'Keepsakes'],
    ['signin', 'Sign In']
  ];

  return (
    <header className="premium-nav app-header">
      <a className="premium-brand" href={routeHref('social')} aria-label="PetMemory home">
        <span className="brand-dot" />
        <span>PetMemory</span>
      </a>
      <nav className="premium-links" aria-label="Primary navigation">
        {tabs.map(([tab, label]) => <a key={tab} className={route === tab ? 'active-tab' : ''} href={routeHref(tab)}>{label}</a>)}
      </nav>
      <a className="outline-pill" href={routeHref('post')}>Post</a>
    </header>
  );
}

function SocialPage() {
  return (
    <section className="premium-shell page-shell social-page" aria-label="PetMemory social feed">
      <div className="premium-hero social-hero">
        <div className="hero-copy">
          <p className="gold-eyebrow">Social</p>
          <h1>A gentle place to post, remember, and support.</h1>
          <p className="hero-text">Share everyday pet updates or create a memorial post. Every post can become a timeline moment, a respect thread, or the start of a keepsake.</p>
          <div className="hero-actions">
            <a className="gold-button" href={routeHref('post')}>Post</a>
            <a className="dark-button" href={routeHref('memorials')}>View memorials</a>
          </div>
          <div className="proof-row">{heroProof.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}</div>
        </div>
        <div className="social-feed-card">
          <article className="post-card featured"><span>Memorial post</span><h2>Biscuit's porch naps</h2><p>Thirteen years of muddy paws, kind eyes, and perfect mornings.</p><small>82 respects · 12 timeline moments</small></article>
          <article className="post-card"><span>General post</span><h3>Sunny walk in the park</h3><p>Upload photos, add a story, then categorize it when posting.</p></article>
        </div>
      </div>
    </section>
  );
}

function CollectionSection({ onAdd }: { onAdd: (product: Product) => void }) {
  return (
    <section className="collection-section page-section">
      <div className="section-title-row">
        <div><p className="brown-eyebrow">The Collection</p><h2>Keepsakes made to last</h2></div>
        <a href={routeHref('checkout')}>Basket / checkout →</a>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <img src={product.image} alt={`${product.name} product placeholder`} />
            <div className="product-body">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-action-row"><strong>from {product.priceLabel}</strong><a href={`#/customize/${product.id}`}>Customize</a></div>
              <button className="inline-basket-button" type="button" onClick={() => onAdd(product)}>Add to basket</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="how-section page-section">
      <p className="brown-eyebrow">How it works</p>
      <div className="steps-grid">
        {[
          ['1', 'Post', 'Choose memorial or general post, import media, and save the story.'],
          ['2', 'Memorialize', 'Turn moments into a profile with dates, timeline, respects, photos, and videos.'],
          ['3', 'Customize', 'Choose material, finish, engraving, portrait crop, and gift note.'],
          ['4', 'Checkout', 'Guests can order immediately; signed-in families can save everything.']
        ].map(([num, title, text]) => <article className="step-card" key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </section>
  );
}

function MobileMemorialProfile() {
  return (
    <section className="mobile-showcase page-section" aria-label="Mobile memorial profile layout">
      <div className="mobile-showcase-copy"><p className="gold-eyebrow">Memorials</p><h2>Timeline moments and respects live on the memorial card.</h2><p>Photo, life dates, story, timeline, respect buttons, and sharing in one warm profile.</p></div>
      <div className="phone-frame">
        <div className="phone-screen">
          <div className="phone-notch" />
          <div className="mobile-photo"><div className="mobile-status"><span>9:41</span><span>● ● ● ▂▃▅ ▮</span></div><a className="round-icon left" href={routeHref('social')} aria-label="Back"><ChevronLeft size={18} /></a><button className="round-icon right" aria-label="Share memorial"><Share2 size={14} /></button><span className="memory-label">In loving memory</span></div>
          <div className="mobile-content">
            <div className="pet-heading-row"><div><h2>Biscuit</h2><p>Golden retriever · Portland, OR</p></div><strong>2011 —<br />2024</strong></div>
            <p className="pet-story">The best napper on the porch and greeter of every guest. Thirteen years of muddy paws and perfect mornings.</p>
            <div className="mobile-actions"><button>Leave a respect</button><button>Share</button></div>
            <div className="timeline-mini"><h3>Timeline · 12 moments</h3><div className="timeline-rail">{moments.map((moment) => <article className={`moment-row ${moment.color}`} key={moment.title}><span className="moment-dot" /><img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=220&q=80" alt="Pet memory thumbnail" /><div><strong>{moment.title}</strong><span>{moment.date}</span></div></article>)}</div></div>
            <div className="respect-summary"><h3>Respects · 82</h3><div className="respect-grid"><article><span>🕯</span><strong>24</strong><small>Candles</small></article><article><span>🌼</span><strong>18</strong><small>Flowers</small></article><article><span>🐾</span><strong>40</strong><small>Pawprints</small></article></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MemorialsPage() {
  return (
    <>
      <MobileMemorialProfile />
      <section className="builder-section page-section">
        <div className="section-title-row"><div><p className="brown-eyebrow"><Camera size={14} /> Memorial builder</p><h2>Create profiles that can be deep-linked and expanded.</h2></div><a href={routeHref('post')}>Create memorial post →</a></div>
        <div className="builder-grid"><article><LockKeyhole size={22} /><h3>Private by default</h3><p>Profiles save to the signed-in owner. Public memorials can be shared when the family chooses.</p></article><article><Heart size={22} /><h3>Timeline + respects</h3><p>Moments and respects are designed into the memorial card instead of buried elsewhere.</p></article><article><ShoppingBag size={22} /><h3>Keepsake ready</h3><p>Any memorial can be sent into the keepsake customizer and checkout.</p></article></div>
      </section>
    </>
  );
}

function KeepsakesPage({ onAdd }: { onAdd: (product: Product) => void }) {
  return <><CollectionSection onAdd={onAdd} /><HowItWorks /></>;
}

function CustomizerPage({ productId, onAdd }: { productId?: string; onAdd: (product: Product, petName: string, finish: string) => void }) {
  const product = products.find((item) => item.id === productId) ?? products[0];
  const [petName, setPetName] = useState('Biscuit');
  const [lifeDates, setLifeDates] = useState('2011 - 2024');
  const [favoriteMemory, setFavoriteMemory] = useState('Porch naps, muddy paws, and morning walks.');
  const [momentDate, setMomentDate] = useState('');
  const [momentTime, setMomentTime] = useState('');
  const [finish, setFinish] = useState(product.material);
  const [engraving, setEngraving] = useState('Forever loved, forever home.');
  const [photoName, setPhotoName] = useState('No memorial photo imported yet');
  const [videoName, setVideoName] = useState('No memorial video imported yet');
  const [photoPreview, setPhotoPreview] = useState('');

  useEffect(() => { setFinish(product.material); }, [product.material]);
  useEffect(() => () => { if (photoPreview) URL.revokeObjectURL(photoPreview); }, [photoPreview]);

  const importPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(URL.createObjectURL(file));
    setPhotoName(file.name);
  };
  const importVideo = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setVideoName(file.name);
  };

  return (
    <section className="commerce-section page-section">
      <div className="section-title-row"><div><p className="brown-eyebrow"><UploadCloud size={14} /> Personalization studio</p><h2>Customize {product.name}</h2></div><a href={routeHref('keepsakes')}>Back to keepsakes →</a></div>
      <article className="inventory-card product-detail-card"><img src={product.image} alt={`${product.plainName} inventory preview`} /><div><p className="brown-eyebrow">{product.plainName}</p><h3>{product.name}</h3><p>{product.description}</p><dl><div><dt>Material</dt><dd>{product.material}</dd></div><div><dt>Lead time</dt><dd>{product.turnaround}</dd></div><div><dt>Base price</dt><dd>{product.priceLabel}</dd></div></dl><ul>{product.includes.map((item) => <li key={item}>{item}</li>)}</ul></div></article>
      <div className="custom-checkout-grid">
        <form className="customizer-panel">
          <div className="form-grid">
            <label>Pet name<input value={petName} onChange={(event) => setPetName(event.target.value)} /></label>
            <label>Life dates<input value={lifeDates} onChange={(event) => setLifeDates(event.target.value)} placeholder="2015 - 2026" /></label>
            <label>Moment date<input type="date" value={momentDate} onChange={(event) => setMomentDate(event.target.value)} /></label>
            <label>Moment time<input type="time" value={momentTime} onChange={(event) => setMomentTime(event.target.value)} /></label>
            <label>Finish<select value={finish} onChange={(event) => setFinish(event.target.value)}><option>{product.material}</option><option>Walnut frame</option><option>Garden stone</option><option>Matte black plate</option></select></label>
            <label>Engraving<input value={engraving} onChange={(event) => setEngraving(event.target.value)} /></label>
          </div>
          <label>Favorite memory<textarea value={favoriteMemory} onChange={(event) => setFavoriteMemory(event.target.value)} /></label>
          <div className="media-imports"><label>Import memorial photo<input type="file" accept="image/*" onChange={importPhoto} /></label><label>Import memorial video<input type="file" accept="video/*" onChange={importVideo} /></label></div>
        </form>
        <aside className="live-order-card"><p className="brown-eyebrow">Live preview</p><div className="order-photo-preview">{photoPreview ? <img src={photoPreview} alt="Custom memorial photo preview" /> : <span>Import a photo to preview it here</span>}</div><h3>Preview: {petName || 'Pet name'}</h3><p>{lifeDates}</p><p>{favoriteMemory}</p><p>{momentDate}{momentTime ? ` · ${momentTime}` : ''}</p><strong>{finish}</strong><small>{engraving}</small><small>{photoName}</small><small>{videoName}</small><button type="button" onClick={() => onAdd(product, petName, finish)}>Add customized item to basket</button><a className="cream-button" href={routeHref('checkout')}>Go to checkout</a></aside>
      </div>
    </section>
  );
}

function CheckoutPage({ basket }: { basket: BasketLine[] }) {
  const subtotal = useMemo(() => basket.reduce((sum, item) => sum + item.price, 0), [basket]);
  const shipping = basket.length ? 9 : 0;
  const total = subtotal + shipping;
  return (
    <section className="commerce-section page-section">
      <div className="checkout-panel stand-alone-checkout" id="checkout">
        <div><p className="brown-eyebrow">Basket · {basket.length} {basket.length === 1 ? 'item' : 'items'}</p><h2>White-label checkout</h2><p>Guest checkout available. Signed-in users can save this basket, media, dates, times, and memories to their PetMemory vault.</p></div>
        <div className="basket-lines">{basket.length === 0 ? <p>Your basket is empty. Add a memorial from keepsakes.</p> : basket.map((item) => <article key={item.id}><strong>{item.productName}</strong><span>{item.petName} · {item.finish}</span><b>{formatCurrency(item.price)}</b></article>)}</div>
        <form className="guest-checkout"><label>Guest email<input type="email" placeholder="you@example.com" /></label><label>Shipping name<input placeholder="Full name" /></label><label>Shipping address<textarea placeholder="Street, city, state, ZIP" /></label><label>Payment method<select><option>Card ending later</option><option>PayPal later</option><option>Invoice draft</option></select></label><div className="totals"><span>Subtotal {formatCurrency(subtotal)}</span><span>Shipping {formatCurrency(shipping)}</span><strong>Total {formatCurrency(total)}</strong></div><button type="button">Place white-label order</button></form>
      </div>
    </section>
  );
}

function PostPage() {
  const [category, setCategory] = useState<'memorial' | 'general'>('memorial');
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [photoName, setPhotoName] = useState('No picture imported yet');
  const [videoName, setVideoName] = useState('No video imported yet');
  return (
    <section className="builder-section page-section post-page">
      <div className="section-title-row"><div><p className="brown-eyebrow"><PawPrint size={14} /> Post</p><h2>Create a post, then choose memorial or general.</h2></div><p>Jordan's requested flow: the post feature lets the family categorize it as a memorial or a normal social post.</p></div>
      <div className="custom-checkout-grid">
        <form className="customizer-panel">
          <label>Post category<select value={category} onChange={(event) => setCategory(event.target.value as 'memorial' | 'general')}><option value="memorial">Memorial</option><option value="general">General post</option></select></label>
          <label>Post title<input value={postTitle} onChange={(event) => setPostTitle(event.target.value)} placeholder="Biscuit's best morning" /></label>
          <label>Post memory<textarea value={postBody} onChange={(event) => setPostBody(event.target.value)} placeholder="Write the story, update, tribute, or announcement..." /></label>
          <div className="media-imports"><label>Import pictures<input type="file" accept="image/*" multiple onChange={(event) => setPhotoName(event.target.files?.[0]?.name ?? 'No picture imported yet')} /></label><label>Import videos<input type="file" accept="video/*" multiple onChange={(event) => setVideoName(event.target.files?.[0]?.name ?? 'No video imported yet')} /></label></div>
          <button className="sage-button" type="button">Publish {category === 'memorial' ? 'memorial' : 'general'} post</button>
        </form>
        <aside className="live-order-card"><p className="brown-eyebrow">Post preview</p><h3>{postTitle || 'Untitled post'}</h3><strong>{category === 'memorial' ? 'Memorial' : 'General post'}</strong><p>{postBody || 'Your story preview appears here.'}</p><small>{photoName}</small><small>{videoName}</small>{category === 'memorial' ? <a className="cream-button" href={routeHref('memorials')}>Attach to memorial profile</a> : <a className="cream-button" href={routeHref('social')}>View in social feed</a>}</aside>
      </div>
    </section>
  );
}

export default function App() {
  const [{ route, productId }, setRouteState] = useState(getRouteFromHash);
  const [basket, setBasket] = useState<BasketLine[]>(() => {
    try { return JSON.parse(localStorage.getItem('petmemory-basket') || '[]') as BasketLine[]; } catch { return []; }
  });

  useEffect(() => {
    const syncRoute = () => setRouteState(getRouteFromHash());
    syncRoute();
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);
  useEffect(() => { localStorage.setItem('petmemory-basket', JSON.stringify(basket)); }, [basket]);

  const addProduct = (product: Product, petName = 'Biscuit', finish = product.material) => {
    setBasket((current) => [...current, { id: `${product.id}-${Date.now()}`, productName: product.name, price: product.price, petName, finish }]);
  };

  return (
    <main className="app-shell">
      <AppHeader route={route} />
      {route === 'social' && <SocialPage />}
      {route === 'memorials' && <MemorialsPage />}
      {route === 'keepsakes' && <KeepsakesPage onAdd={addProduct} />}
      {route === 'customize' && <CustomizerPage productId={productId} onAdd={addProduct} />}
      {route === 'checkout' && <CheckoutPage basket={basket} />}
      {route === 'post' && <PostPage />}
      {route === 'signin' && <AccountPortal />}
      <section className="final-band"><Sparkles size={18} /><h2>{route === 'signin' ? 'Save the whole memorial system to your account.' : 'Post first, memorialize when ready, then choose the keepsake.'}</h2><a className="gold-button" href={routeHref(route === 'signin' ? 'post' : 'signin')}>{route === 'signin' ? 'Create a post' : 'Sign in to save'}</a></section>
    </main>
  );
}
