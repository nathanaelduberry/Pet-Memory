import { PawPrint } from 'lucide-react';
import Hero from './components/Hero';
import WaysToRemember from './components/WaysToRemember';
import MemoryGardenTimeline from './components/MemoryGardenTimeline';
import KeepsakePlaqueSection from './components/KeepsakePlaqueSection';
import PrivacyTrustSection from './components/PrivacyTrustSection';
import ProductExperience from './components/ProductExperience';
import FinalCta from './components/FinalCta';

export default function App() {
  return (
    <main className="site-shell">
      <header className="topbar" aria-label="PetMemory navigation">
        <a className="brand" href="#top" aria-label="PetMemory home">
          <span className="brand-mark"><PawPrint size={20} aria-hidden="true" /></span>
          <span>PetMemory</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#studio">Studio</a>
          <a href="#explore">Explore</a>
          <a href="#products">Products</a>
          <a href="#checkout">Checkout</a>
          <a href="#trust">Privacy</a>
        </nav>
      </header>

      <Hero />

      <section id="memorial" className="section-block intro-section">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Why this exists</p>
            <h2>They were family. Their story deserves somewhere tender to live.</h2>
          </div>
          <p>
            PetMemory turns remembrance into a living tribute: a place for photos, small rituals, family stories, and the love that remains after goodbye.
          </p>
        </div>
      </section>

      <WaysToRemember />
      <ProductExperience />
      <MemoryGardenTimeline />
      <PrivacyTrustSection />
      <KeepsakePlaqueSection />
      <FinalCta />
    </main>
  );
}
