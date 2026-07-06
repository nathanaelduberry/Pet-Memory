import { KeyRound, PawPrint, ShoppingBasket, Sparkles, UserRound } from 'lucide-react';

const portalPets = [
  {
    name: 'Bailey',
    status: 'Memorial draft',
    detail: 'Photos, story, timeline moments, and privacy settings saved to this account.'
  },
  {
    name: 'Milo',
    status: 'Private memorial',
    detail: 'Ready for family respects, saved products, and future plaque orders.'
  }
];

const savedKeepsakes = ['Memory Locket', 'Mini Memorial Stone', 'Photo Keepsake Print'];

export default function AccountPortal() {
  return (
    <section id="account" className="section-block account-section page-panel">
      <div className="section-heading split-heading">
        <div>
          <p className="eyebrow"><UserRound size={16} aria-hidden="true" /> Personal portal</p>
          <h2>Your PetMemory Portal</h2>
        </div>
        <p>
          A private place for each family to sign in, manage their animals, save remembrance products, and keep a basket ready for ordering.
        </p>
      </div>

      <div className="portal-layout">
        <form className="portal-login">
          <p className="eyebrow"><KeyRound size={16} aria-hidden="true" /> Account access</p>
          <label>
            Email address
            <input type="email" placeholder="you@example.com" autoComplete="email" />
          </label>
          <label>
            Password
            <input type="password" placeholder="••••••••" autoComplete="current-password" />
          </label>
          <div className="portal-actions">
            <button className="button primary" type="button">Sign in</button>
            <button className="button secondary" type="button">Create account</button>
          </div>
          <p className="portal-note">Supabase auth can connect here when the project URL and anon key are added.</p>
        </form>

        <div className="portal-dashboard" aria-label="Personalized account preview">
          <article>
            <div className="portal-card-heading">
              <PawPrint size={20} aria-hidden="true" />
              <h3>My Animals</h3>
            </div>
            {portalPets.map((pet) => (
              <div className="pet-row" key={pet.name}>
                <strong>{pet.name}</strong>
                <span>{pet.status}</span>
                <p>{pet.detail}</p>
              </div>
            ))}
          </article>

          <article>
            <div className="portal-card-heading">
              <Sparkles size={20} aria-hidden="true" />
              <h3>Saved Keepsakes</h3>
            </div>
            <ul className="saved-list">
              {savedKeepsakes.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>

          <article className="basket-card">
            <div className="portal-card-heading">
              <ShoppingBasket size={20} aria-hidden="true" />
              <h3>Basket</h3>
            </div>
            <strong>2 remembrance items</strong>
            <p>Garden Marker and Memory Locket saved for Bailey. Checkout can later hydrate from the signed-in user's basket.</p>
            <a className="button primary" href="#checkout">Review basket</a>
          </article>
        </div>
      </div>
    </section>
  );
}
