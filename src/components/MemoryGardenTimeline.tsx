import { CalendarHeart } from 'lucide-react';
import { respects, timelineMoments } from '../content/memorialContent';

export default function MemoryGardenTimeline() {
  return (
    <section id="garden" className="timeline-section section-block">
      <div className="section-heading split-heading">
        <div>
          <p className="eyebrow"><CalendarHeart size={16} aria-hidden="true" /> Their memory garden</p>
          <h2>Their memory garden grows one moment at a time.</h2>
        </div>
        <p>
          Life with a pet is made of ordinary days that become sacred later: the first night home, the funny habit,
          the favorite place, the goodbye carried with love.
        </p>
      </div>
      <div className="timeline-layout">
        <ol className="timeline-list" aria-label="Bailey timeline moments">
          {timelineMoments.map((moment) => (
            <li key={moment.title}>
              <span>{moment.date}</span>
              <strong>{moment.title}</strong>
              <p>{moment.copy}</p>
            </li>
          ))}
        </ol>
        <aside className="respect-card" aria-label="Latest respect activity">
          <p className="label">Shared memories and respects</p>
          <p>Family and friends can offer a story, a candle, or a small sign that Bailey is still remembered.</p>
          {respects.map((respect) => (
            <article key={respect.name}>
              <strong>{respect.name}</strong>
              <span>{respect.action}</span>
              <p>{respect.detail}</p>
            </article>
          ))}
        </aside>
      </div>
    </section>
  );
}
