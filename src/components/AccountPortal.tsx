import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { Heart, KeyRound, LogOut, PawPrint, Plus, ShoppingBasket, Sparkles, UserRound } from 'lucide-react';
import { isSupabaseConfigured, supabase, supabaseProjectUrl } from '../lib/supabase';

type AuthAction = 'sign-in' | 'sign-up';

type Pet = {
  id: string;
  name: string;
  species: string | null;
  passed_date: string | null;
  privacy: 'private' | 'link' | 'public';
  story: string | null;
};

type Moment = { id: string; pet_id: string; title: string; moment_date: string | null };
type Respect = { id: string; pet_id: string; respect_type: string; author_name: string | null; note: string | null };
type BasketItem = { id: string; product_name: string; quantity: number; status: string };

const examplePets: Pet[] = [
  {
    id: 'example-biscuit',
    name: 'Biscuit',
    species: 'Golden retriever',
    passed_date: '2024-08-01',
    privacy: 'public',
    story: 'The best napper on the porch and greeter of every guest.'
  }
];

const exampleMoments: Moment[] = [
  { id: 'm1', pet_id: 'example-biscuit', title: 'Gotcha day', moment_date: '2011-03-12' },
  { id: 'm2', pet_id: 'example-biscuit', title: 'First snow', moment_date: '2014-12-02' },
  { id: 'm3', pet_id: 'example-biscuit', title: 'Last summer', moment_date: '2024-08-01' }
];

const exampleRespects: Respect[] = [
  { id: 'r1', pet_id: 'example-biscuit', respect_type: 'candle', author_name: 'Mum', note: 'A candle for Biscuit.' },
  { id: 'r2', pet_id: 'example-biscuit', respect_type: 'flower', author_name: 'Jordan', note: 'Still loved.' },
  { id: 'r3', pet_id: 'example-biscuit', respect_type: 'pawprint', author_name: 'Nate', note: 'Good dog.' }
];

const exampleBasket: BasketItem[] = [
  { id: 'b1', product_name: 'The Oakford Plaque', quantity: 1, status: 'draft' },
  { id: 'b2', product_name: 'The Portrait Frame', quantity: 1, status: 'draft' }
];

const formatDate = (date: string | null) => date ? new Date(date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Undated';

export default function AccountPortal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [moments, setMoments] = useState<Moment[]>([]);
  const [respects, setRespects] = useState<Respect[]>([]);
  const [basket, setBasket] = useState<BasketItem[]>([]);

  const visiblePets = user ? pets : examplePets;
  const visibleMoments = user ? moments : exampleMoments;
  const visibleRespects = user ? respects : exampleRespects;
  const visibleBasket = user ? basket : exampleBasket;

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      const sessionUser = data.session?.user ?? null;
      if (sessionUser) setUser(sessionUser);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!supabase || !user) {
      setPets([]);
      setMoments([]);
      setRespects([]);
      setBasket([]);
      return;
    }

    const client = supabase;

    const loadAccountData = async () => {
      const [{ data: petRows, error: petError }, { data: basketRows, error: basketError }] = await Promise.all([
        client.from('pets').select('id,name,species,passed_date,privacy,story').order('created_at', { ascending: false }),
        client.from('basket_items').select('id,product_name,quantity,status').order('created_at', { ascending: false })
      ]);

      if (petError || basketError) {
        setMessage(petError?.message || basketError?.message || 'Account data could not be loaded.');
        return;
      }

      const loadedPets = (petRows ?? []) as Pet[];
      setPets(loadedPets);
      setBasket((basketRows ?? []) as BasketItem[]);

      const petIds = loadedPets.map((pet) => pet.id);
      if (petIds.length === 0) {
        setMoments([]);
        setRespects([]);
        return;
      }

      const [{ data: momentRows, error: momentError }, { data: respectRows, error: respectError }] = await Promise.all([
        client.from('moments').select('id,pet_id,title,moment_date').in('pet_id', petIds).order('moment_date', { ascending: true }),
        client.from('respects').select('id,pet_id,respect_type,author_name,note').in('pet_id', petIds).order('created_at', { ascending: false })
      ]);

      if (momentError || respectError) {
        setMessage(momentError?.message || respectError?.message || 'Memorial timeline could not be loaded.');
        return;
      }

      setMoments((momentRows ?? []) as Moment[]);
      setRespects((respectRows ?? []) as Respect[]);
    };

    loadAccountData();
  }, [user]);

  const ensureProfile = async (activeUser: User) => {
    if (!supabase) return;
    await supabase.from('profiles').upsert({
      id: activeUser.id,
      display_name: activeUser.email?.split('@')[0] ?? 'PetMemory family'
    });
  };

  const handleAuth = async (event: FormEvent<HTMLFormElement> | SyntheticEvent, action: AuthAction) => {
    event.preventDefault();

    if (!supabase) {
      setMessage('Supabase needs the public anon key before sign in can work.');
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

    const activeUser = data.user ?? null;
    if (activeUser) await ensureProfile(activeUser);
    setUser(activeUser);
    setMessage(action === 'sign-up'
      ? 'Account created. If email confirmation is enabled, check your inbox.'
      : 'Signed in. Your PetMemory portal is live.');
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

  const createExampleMemorial = async () => {
    if (!supabase || !user) return;
    setIsSubmitting(true);
    setMessage('Creating your first memorial…');

    const { data: pet, error: petError } = await supabase.from('pets').insert({
      owner_id: user.id,
      name: 'Biscuit',
      species: 'Golden retriever',
      passed_date: '2024-08-01',
      privacy: 'private',
      story: 'The best napper on the porch and greeter of every guest.'
    }).select('id,name,species,passed_date,privacy,story').single();

    if (petError || !pet) {
      setMessage(petError?.message || 'Could not create memorial.');
      setIsSubmitting(false);
      return;
    }

    await Promise.all([
      supabase.from('moments').insert([
        { pet_id: pet.id, owner_id: user.id, title: 'Gotcha day', moment_date: '2011-03-12' },
        { pet_id: pet.id, owner_id: user.id, title: 'First snow', moment_date: '2014-12-02' },
        { pet_id: pet.id, owner_id: user.id, title: 'Last summer', moment_date: '2024-08-01' }
      ]),
      supabase.from('basket_items').insert({
        user_id: user.id,
        pet_id: pet.id,
        product_id: 'oakford-plaque',
        product_name: 'The Oakford Plaque',
        customization: { petName: 'Biscuit' },
        quantity: 1
      })
    ]);

    setPets((current) => [pet as Pet, ...current]);
    setMoments(exampleMoments.map((moment) => ({ ...moment, pet_id: pet.id })));
    setBasket([{ id: 'new-basket', product_name: 'The Oakford Plaque', quantity: 1, status: 'draft' }]);
    setMessage('Memorial created and saved to your account.');
    setIsSubmitting(false);
  };

  return (
    <section id="account" className="account-portal">
      <div className="section-title-row account-title">
        <div>
          <p className="brown-eyebrow"><UserRound size={14} /> Personal portal</p>
          <h2>{user ? 'Your saved PetMemory account' : 'Sign in to save the memorial'}</h2>
        </div>
        <p>
          {user
            ? 'Your pets, moments, respects, and baskets are loading from Supabase.'
            : 'Logged-out visitors see this example. Sign in to save your own profile and basket.'}
        </p>
      </div>

      <div className="portal-layout">
        <form className="portal-login" onSubmit={(event) => handleAuth(event, 'sign-in')}>
          <p className="brown-eyebrow"><KeyRound size={14} /> Account access</p>
          {user ? (
            <div className="signed-in-card" aria-live="polite">
              <strong>Signed in</strong>
              <span>{user.email}</span>
              <p>Your memorial data is connected to this Supabase account.</p>
            </div>
          ) : (
            <>
              <label>Email address<input type="email" placeholder="you@example.com" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
              <label>Password<input type="password" placeholder="••••••••" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} required /></label>
            </>
          )}

          <div className="portal-actions">
            {user ? (
              <>
                <button className="sage-button" type="button" onClick={createExampleMemorial} disabled={isSubmitting}><Plus size={16} /> Create Biscuit memorial</button>
                <button className="cream-button" type="button" onClick={handleSignOut} disabled={isSubmitting}><LogOut size={16} /> Sign out</button>
              </>
            ) : (
              <>
                <button className="sage-button" type="submit" disabled={isSubmitting || !isSupabaseConfigured}>{isSubmitting ? 'Signing in…' : 'Sign in'}</button>
                <button className="cream-button" type="button" disabled={isSubmitting || !isSupabaseConfigured} onClick={(event) => handleAuth(event, 'sign-up')}>{isSubmitting ? 'Creating…' : 'Create account'}</button>
              </>
            )}
          </div>

          <p className="portal-note" aria-live="polite">
            {message || (isSupabaseConfigured
              ? `Connected to Supabase: ${supabaseProjectUrl}`
              : `Supabase URL saved: ${supabaseProjectUrl}. Add the anon key to make sign in live.`)}
          </p>
        </form>

        <div className="portal-dashboard" aria-label={user ? 'Saved account dashboard' : 'Read-only example memorial account'}>
          {!user && <div className="example-banner"><strong>Example Memorial Account</strong><span>Read this while signed out. Sign in to save your own pets, moments, respects, and basket.</span></div>}
          <article className="portal-card animals-card">
            <div className="portal-card-heading"><PawPrint size={18} /><h3>{user ? 'My Animals' : 'Example Animals'}</h3></div>
            {visiblePets.length ? visiblePets.map((pet) => (
              <div className="pet-row" key={pet.id}>
                <strong>{pet.name}</strong>
                <span>{pet.species || 'Beloved pet'} · {pet.privacy}</span>
                <p>{pet.story || 'No story added yet.'}</p>
              </div>
            )) : <p>No pets yet. Use “Create Biscuit memorial” to test saving.</p>}
          </article>

          <article className="portal-card">
            <div className="portal-card-heading"><Sparkles size={18} /><h3>{user ? 'Timeline' : 'Example Timeline'}</h3></div>
            <ul className="saved-list">{visibleMoments.map((moment) => <li key={moment.id}><strong>{moment.title}</strong><span>{formatDate(moment.moment_date)}</span></li>)}</ul>
          </article>

          <article className="portal-card">
            <div className="portal-card-heading"><Heart size={18} /><h3>{user ? 'Respects' : 'Example Respects'}</h3></div>
            <ul className="saved-list">{visibleRespects.map((respect) => <li key={respect.id}><strong>{respect.respect_type}</strong><span>{respect.author_name || 'Family'} · {respect.note}</span></li>)}</ul>
          </article>

          <article className="portal-card basket-card">
            <div className="portal-card-heading"><ShoppingBasket size={18} /><h3>{user ? 'Basket' : 'Example Basket'}</h3></div>
            <strong>{visibleBasket.reduce((sum, item) => sum + item.quantity, 0)} remembrance items</strong>
            <p>{visibleBasket.map((item) => item.product_name).join(', ') || 'No basket items yet.'}</p>
            <a className="sage-button" href="https://dropship.petmemory.app/order?basket=petmemory" target="_blank" rel="noreferrer noopener">Continue to dropship checkout</a>
          </article>
        </div>
      </div>
    </section>
  );
}
