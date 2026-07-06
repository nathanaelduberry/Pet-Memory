import { ChangeEvent, useMemo, useState } from 'react';
import { Camera, Compass, CreditCard, Gem, HeartHandshake, PenLine, ShoppingBag, Sparkles, Sprout } from 'lucide-react';
import { buildDropshipUrl, exploreGardens, keepsakeProducts, primaryActions, sampleMemorial, studioSteps } from '../content/memorialContent';

const tones = [
  { value: 'peaceful', label: 'Peaceful' },
  { value: 'joyful', label: 'Joyful' },
  { value: 'grateful', label: 'Grateful' },
  { value: 'goodbye', label: 'Goodbye' }
];

export default function ProductExperience() {
  const [petName, setPetName] = useState(sampleMemorial.name);
  const [message, setMessage] = useState(sampleMemorial.story);
  const [tone, setTone] = useState('peaceful');
  const [selectedProduct, setSelectedProduct] = useState(keepsakeProducts[0]);

  const selectedTone = useMemo(
    () => tones.find((item) => item.value === tone)?.label ?? 'Peaceful',
    [tone]
  );

  const orderUrl = buildDropshipUrl(selectedProduct.product, petName);

  const chooseProduct = (product: typeof keepsakeProducts[number]) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <section id="studio" className="section-block studio-section page-panel">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow"><PenLine size={16} aria-hidden="true" /> Creation area</p>
            <h2>Memorial Studio</h2>
          </div>
          <p>
            A guided creation space where owners build the memorial gently instead of facing a blank form.
          </p>
        </div>
        <div className="journey-grid">
          {studioSteps.map((step, index) => (
            <article key={step}>
              <span>0{index + 1}</span>
              <strong>{step}</strong>
            </article>
          ))}
        </div>
      </section>

      <section id="explore" className="section-block explore-section page-panel">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow"><Compass size={16} aria-hidden="true" /> Community area</p>
            <h2>Explore the memory garden</h2>
          </div>
          <p>
            Browse public memorials, species gardens, and community rituals without turning grief into a social-media feed.
          </p>
        </div>
        <div className="garden-grid">
          {exploreGardens.map((garden) => (
            <article key={garden.title}>
              <Sprout size={24} aria-hidden="true" />
              <h3>{garden.title}</h3>
              <p>{garden.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="products" className="section-block products-section page-panel">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow"><ShoppingBag size={16} aria-hidden="true" /> Products page</p>
            <h2>Keepsake Shop</h2>
          </div>
          <p>
            Pet-oriented remembrance items that can be personalized, previewed, and ordered without making the memorial feel like a store.
          </p>
        </div>
        <div className="product-grid expanded-products">
          {keepsakeProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <HeartHandshake size={28} aria-hidden="true" />
              <h3>{product.title}</h3>
              <strong className="price">{product.price}</strong>
              <p>{product.copy}</p>
              <button className="button secondary" type="button" onClick={() => chooseProduct(product)}>
                Choose this keepsake
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="customize" className="section-block studio-builder page-panel">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow"><Sparkles size={16} aria-hidden="true" /> Customize page</p>
            <h2>Create Studio</h2>
          </div>
          <p>
            Keep it minimal: write the name, add a message, choose the emotional tone, and preview before ordering.
          </p>
        </div>
        <div className="builder-grid">
          <form className="studio-form">
            <label>
              Pet name
              <input value={petName} onChange={(event: ChangeEvent<HTMLInputElement>) => setPetName(event.target.value)} />
            </label>
            <label>
              Memorial message
              <textarea rows={4} value={message} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setMessage(event.target.value)} />
            </label>
            <label>
              Tone
              <select value={tone} onChange={(event: ChangeEvent<HTMLSelectElement>) => setTone(event.target.value)}>
                {tones.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}
              </select>
            </label>
            <label>
              Product
              <select
                value={selectedProduct.id}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  const next = keepsakeProducts.find((product) => product.id === event.target.value) ?? keepsakeProducts[0];
                  setSelectedProduct(next);
                }}
              >
                {keepsakeProducts.map((product) => <option value={product.id} key={product.id}>{product.title}</option>)}
              </select>
            </label>
          </form>

          <aside id="preview" className="live-preview" aria-label="Live keepsake preview">
            <p className="eyebrow"><Camera size={16} aria-hidden="true" /> Preview page</p>
            <h2>Live Keepsake Preview</h2>
            <div className="preview-object">
              <Gem size={28} aria-hidden="true" />
              <strong>{petName || 'Their name'}</strong>
              <p>{message || 'Add a short remembrance message.'}</p>
              <span>{selectedTone}</span>
              <small>{selectedProduct.title} · {selectedProduct.price}</small>
            </div>
            <a className="button primary" href="#checkout">Review and order</a>
          </aside>
        </div>
      </section>

      <section id="checkout" className="section-block checkout-section page-panel">
        <div>
          <p className="eyebrow"><CreditCard size={16} aria-hidden="true" /> Order page</p>
          <h2>Checkout Preview</h2>
          <p>
            Confirm the memorial, product, tone, message, and QR destination. Then continue only when it feels ready.
          </p>
        </div>
        <div className="checkout-card">
          <span>{petName || sampleMemorial.name}'s memorial</span>
          <strong>{selectedProduct.title}</strong>
          <p>{selectedTone} tone · QR link back to the memorial · {selectedProduct.price}</p>
          <a className="button primary" href={orderUrl} target="_blank" rel="noopener noreferrer">
            Continue to dropship checkout
          </a>
        </div>
      </section>
    </>
  );
}
