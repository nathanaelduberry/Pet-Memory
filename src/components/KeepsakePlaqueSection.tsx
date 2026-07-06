import { HeartHandshake, ShoppingBag } from 'lucide-react';
import { primaryActions } from '../content/memorialContent';

export default function KeepsakePlaqueSection() {
  return (
    <section id="keepsake" className="plaque-section keepsake-section">
      <div>
        <p className="eyebrow">Physical remembrance</p>
        <h2>A keepsake for the places they loved.</h2>
        <p>
          Place their story in the garden, beside their urn, near their favorite window, or wherever you still feel them close.
          A garden marker, urn plate, or framed plaque can open their memorial with a simple QR scan.
        </p>
        <a className="button primary plaque-order" href="#products">
          <ShoppingBag size={17} aria-hidden="true" /> {primaryActions.keepsake}
        </a>
      </div>
      <div className="plaque-card" aria-label="Keepsake plaque preview">
        <HeartHandshake size={38} aria-hidden="true" />
        <strong>QR Keepsake Plaque</strong>
        <span>Garden marker · framed plaque · urn plate</span>
        <small>A bridge from a special place back to their story</small>
      </div>
    </section>
  );
}
