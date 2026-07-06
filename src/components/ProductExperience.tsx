import { Compass, CreditCard, HeartHandshake, PenLine, ShoppingBag, Sprout } from 'lucide-react';
import { buildDropshipUrl, exploreGardens, keepsakeProducts, primaryActions, studioSteps } from '../content/memorialContent';

export default function ProductExperience() {
  return (
    <>
      <section id="studio" className="section-block studio-section">
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

      <section id="explore" className="section-block explore-section">
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

      <section id="products" className="section-block products-section">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow"><ShoppingBag size={16} aria-hidden="true" /> Keepsake area</p>
            <h2>Keepsake Shop</h2>
          </div>
          <p>
            Not the main event — a careful bridge between their digital memory garden and the real places they loved.
          </p>
        </div>
        <div className="product-grid">
          {keepsakeProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <HeartHandshake size={28} aria-hidden="true" />
              <h3>{product.title}</h3>
              <strong className="price">{product.price}</strong>
              <p>{product.copy}</p>
              <a className="button secondary" href="#checkout">Choose this keepsake</a>
            </article>
          ))}
        </div>
      </section>

      <section id="checkout" className="section-block checkout-section">
        <div>
          <p className="eyebrow"><CreditCard size={16} aria-hidden="true" /> Purchase area</p>
          <h2>Checkout Preview</h2>
          <p>
            The final checkout should feel calm: confirm the memorial, choose the keepsake, preview the QR destination, then continue only when ready.
          </p>
        </div>
        <div className="checkout-card">
          <span>Bailey's memorial</span>
          <strong>QR keepsake order</strong>
          <p>Includes pet name, memorial link, product choice, and QR code destination.</p>
          <a className="button primary" href={buildDropshipUrl('garden-marker')} target="_blank" rel="noopener noreferrer">
            Continue to dropship checkout
          </a>
        </div>
      </section>
    </>
  );
}
