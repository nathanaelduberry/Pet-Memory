import { LockKeyhole, ShieldCheck } from 'lucide-react';
import { trustPromises } from '../content/memorialContent';

export default function PrivacyTrustSection() {
  return (
    <section id="trust" className="section-block trust-section">
      <div className="section-heading split-heading">
        <div>
          <p className="eyebrow"><LockKeyhole size={16} aria-hidden="true" /> Gentle by design</p>
          <h2>Your memorial, shared only how you choose.</h2>
        </div>
        <p>
          Grief needs safety. PetMemory should feel owner-controlled from the first moment, with privacy and moderation built into the promise.
        </p>
      </div>
      <div className="trust-grid">
        {trustPromises.map((promise) => (
          <article key={promise}>
            <ShieldCheck size={20} aria-hidden="true" />
            <strong>{promise}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
