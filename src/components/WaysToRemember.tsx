import { Flower2, HeartHandshake, Images, MessageCircleHeart, QrCode } from 'lucide-react';
import { waysToRemember } from '../content/memorialContent';

const icons = [Images, Flower2, MessageCircleHeart, QrCode, HeartHandshake];

export default function WaysToRemember() {
  return (
    <section id="ways" className="section-block ways-section">
      <div className="section-heading">
        <p className="eyebrow">What PetMemory holds</p>
        <h2>Ways to remember</h2>
        <p>Each feature is a small ritual: a way to tell the truth that they were here, they were loved, and they mattered.</p>
      </div>
      <div className="feature-grid memory-grid">
        {waysToRemember.map(({ title, copy }, index) => {
          const Icon = icons[index];
          return (
            <article className="feature-card" key={title}>
              <span className="feature-icon"><Icon size={24} aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
