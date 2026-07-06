import { PawPrint, Sparkles } from 'lucide-react';
import { heroCopy, primaryActions } from '../content/memorialContent';
import MemorialPreviewCard from './MemorialPreviewCard';

export default function Hero() {
  return (
    <section id="top" className="hero-section sanctuary-hero">
      <div className="hero-copy">
        <p className="eyebrow"><Sparkles size={16} aria-hidden="true" /> {heroCopy.eyebrow}</p>
        <h1>{heroCopy.title}</h1>
        <p className="hero-lede">{heroCopy.lede}</p>
        <div className="hero-actions" aria-label="Primary actions">
          <a className="button primary" href="#studio">{primaryActions.begin}</a>
          <a className="button secondary" href="#explore">{primaryActions.visit}</a>
          <a className="button ghost" href="#products">
            {primaryActions.keepsake}
          </a>
        </div>
        <p className="soft-note"><PawPrint size={16} aria-hidden="true" /> Start with a name and photo. Let the garden grow when you are ready.</p>
      </div>

      <MemorialPreviewCard />
    </section>
  );
}
