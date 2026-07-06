import { PawPrint } from 'lucide-react';
import { primaryActions } from '../content/memorialContent';

export default function FinalCta() {
  return (
    <section id="begin" className="section-block final-cta">
      <p className="eyebrow"><PawPrint size={16} aria-hidden="true" /> When you are ready</p>
      <h2>Begin with one photo, one name, one memory.</h2>
      <p>
        The memorial does not need to be complete today. Start gently, invite others later, and let their story grow at the pace your heart can manage.
      </p>
      <a className="button primary" href="#top">{primaryActions.begin}</a>
    </section>
  );
}
