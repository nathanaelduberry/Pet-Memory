import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { Heart, KeyRound, LogOut, PawPrint, ShoppingBasket, Sparkles, UserRound } from 'lucide-react';
import { isSupabaseConfigured, supabase, supabaseProjectUrl } from '../lib/supabase';

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

const exampleMoments = [
  'First beach walk saved as a timeline moment',
  'Favourite blue blanket photo kept for family only',
  'Last sunny porch afternoon remembered with gratitude'
];

const exampleRespects = ['Candle from Mum', 'Flower from Jordan', 'Pawprint from Nate'];
const savedKeepsakes = ['Memory Locket', 'Mini Memorial Stone', 'Photo Keepsake Print'];

type AuthAction = 'sign-in' | 'sign-up';

export default function AccountPortal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleAuth = async (event: FormEvent<HTMLFormElement> | SyntheticEvent, action: AuthAction) => {
    event.preventDefault();

    if (!supabase) {
      setMessage('Supabase is configured with the project URL, but the public anon key is not available to this build yet.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    const credentials = { email, password };
    const { data, error } = action === 'sign-up'
      ? await supabase.auth.signUp(credentials)
      : await supabase.auth.signInWithPassword(credentials);

    if (error) {
      setMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    setUser(data.user ?? null);
    setMessage(action === 'sign-up'
      ? 'Account created. If email confirmation is enabled, check your inbox to activate the portal.'
      : 'Signed in. Your personal PetMemory portal is now active.');
    setIsSubmitting(false);
  };

  const handleSignOut = async () => {
    if (!supabase) return;

    setIsSubmitting(true);
    const { error } = await supabase.auth.signOut();
    setMessage(error ? error.message : 'Signed out safely.');
    setUser(null);
    setIsSubmitting(false);
  };

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
        <form className="portal-login" onSubmit={(event) => handleAuth(event, 'sign-in')}>
          <p className="eyebrow"><KeyRound size={16} aria-hidden="true" /> Account access</p>

          {user ? (
            <div className="pet-row" aria-live="polite">
              <strong>Signed in</strong>
              <span>{user.email}</span>
              <p>Your saved pets, memorial drafts, timeline moments, respects, and basket can now be attached to this account.</p>
            </div>
          ) : (
            <>
              <label>
                Email address
                <input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  minLength={6}
                  required
                />
              </label>
            </>
          )}

          <div className="portal-actions">
            {user ? (
              <button className="button secondary" type="button" onClick={handleSignOut} disabled={isSubmitting}>
                <LogOut size={16} aria-hidden="true" /> Sign out
              </button>
            ) : (
              <>
                <button className="button primary" type="submit" disabled={isSubmitting || !isSupabaseConfigured}>
                  {isSubmitting ? 'Signing in…' : 'Sign in'}
                </button>
                <button
                  className="button secondary"
                  type="button"
                  disabled={isSubmitting || !isSupabaseConfigured}
                  onClick={(event) => handleAuth(event, 'sign-up')}
                >
                  {isSubmitting ? 'Creating…' : 'Create account'}
                </button>
              </>
            )}
          </div>

          <p className="portal-note" aria-live="polite">
            {message || (isSupabaseConfigured
              ? `Connected to Supabase project: ${supabaseProjectUrl}. Sign up or log in to start a real personal account.`
              : `Supabase project URL saved: ${supabaseProjectUrl}. Add the anon public key to make sign in live.`)}
          </p>
        </form>

        <div className="portal-dashboard" aria-label={user ? 'Personalized account dashboard' : 'Read-only example memorial account'}>
          <article>
            <div className="portal-card-heading">
              <PawPrint size={20} aria-hidden="true" />
              <h3>{user ? 'My Animals' : 'Example Animals'}</h3>
            </div>
            {!user && (
              <div className="portal-note">
                <h3>Example Memorial Account</h3>
                <p>Read this example while signed out. Sign in to save your own pets, timeline moments, respects, and basket.</p>
              </div>
            )}
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
              <h3>{user ? 'Timeline' : 'Example Timeline'}</h3>
            </div>
            <ul className="saved-list">
              {exampleMoments.map((moment) => <li key={moment}>{moment}</li>)}
            </ul>
          </article>

          <article>
            <div className="portal-card-heading">
              <Heart size={20} aria-hidden="true" />
              <h3>{user ? 'Respects' : 'Example Respects'}</h3>
            </div>
            <ul className="saved-list">
              {exampleRespects.map((respect) => <li key={respect}>{respect}</li>)}
            </ul>
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
              <h3>{user ? 'Basket' : 'Example Basket'}</h3>
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
