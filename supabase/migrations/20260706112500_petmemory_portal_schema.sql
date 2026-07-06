-- PetMemory portal schema: account profiles, pets, memorial timelines, respects, and baskets.
-- Apply in Supabase SQL editor or via Supabase CLI once the project is linked.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pets (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  species text,
  birth_date date,
  passed_date date,
  privacy text not null default 'private' check (privacy in ('private', 'link', 'public')),
  story text,
  photo_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.moments (
  id uuid primary key default gen_random_uuid(),
  pet_id uuid not null references public.pets(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text,
  moment_date date,
  media_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.respects (
  id uuid primary key default gen_random_uuid(),
  pet_id uuid not null references public.pets(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  author_name text,
  respect_type text not null default 'pawprint' check (respect_type in ('candle', 'flower', 'pawprint', 'note')),
  note text,
  approved boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.basket_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  pet_id uuid references public.pets(id) on delete set null,
  product_id text not null,
  product_name text not null,
  customization jsonb not null default '{}'::jsonb,
  quantity integer not null default 1 check (quantity > 0),
  status text not null default 'draft' check (status in ('draft', 'ordered', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists pets_owner_id_idx on public.pets(owner_id);
create index if not exists pets_privacy_idx on public.pets(privacy);
create index if not exists moments_pet_id_idx on public.moments(pet_id);
create index if not exists moments_owner_id_idx on public.moments(owner_id);
create index if not exists respects_pet_id_idx on public.respects(pet_id);
create index if not exists basket_items_user_id_idx on public.basket_items(user_id);

alter table public.profiles enable row level security;
alter table public.pets enable row level security;
alter table public.moments enable row level security;
alter table public.respects enable row level security;
alter table public.basket_items enable row level security;

create policy profiles_are_readable_by_owner
  on public.profiles for select
  using (auth.uid() = id);

create policy profiles_are_insertable_by_owner
  on public.profiles for insert
  with check (auth.uid() = id);

create policy profiles_are_updatable_by_owner
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy pets_are_readable_by_owner
  on public.pets for select
  using (auth.uid() = owner_id);

create policy public_memorials_are_readable
  on public.pets for select
  using (privacy = 'public');

create policy pets_are_insertable_by_owner
  on public.pets for insert
  with check (auth.uid() = owner_id);

create policy pets_are_manageable_by_owner
  on public.pets for update
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create policy pets_are_deletable_by_owner
  on public.pets for delete
  using (auth.uid() = owner_id);

create policy moments_are_readable_by_pet_owner_or_public_pet
  on public.moments for select
  using (
    auth.uid() = owner_id
    or exists (
      select 1 from public.pets
      where pets.id = moments.pet_id
        and pets.privacy = 'public'
    )
  );

create policy moments_are_insertable_by_pet_owner
  on public.moments for insert
  with check (
    auth.uid() = owner_id
    and exists (
      select 1 from public.pets
      where pets.id = moments.pet_id
        and pets.owner_id = auth.uid()
    )
  );

create policy moments_are_manageable_by_pet_owner
  on public.moments for update
  using (
    auth.uid() = owner_id
    and exists (
      select 1 from public.pets
      where pets.id = moments.pet_id
        and pets.owner_id = auth.uid()
    )
  )
  with check (
    auth.uid() = owner_id
    and exists (
      select 1 from public.pets
      where pets.id = moments.pet_id
        and pets.owner_id = auth.uid()
    )
  );

create policy moments_are_deletable_by_pet_owner
  on public.moments for delete
  using (auth.uid() = owner_id);

create policy respects_are_readable_for_public_or_owned_pets
  on public.respects for select
  using (
    approved = true
    and exists (
      select 1 from public.pets
      where pets.id = respects.pet_id
        and (pets.privacy = 'public' or pets.owner_id = auth.uid())
    )
  );

create policy respects_are_insertable_for_public_or_owned_pets
  on public.respects for insert
  with check (
    exists (
      select 1 from public.pets
      where pets.id = respects.pet_id
        and (pets.privacy = 'public' or pets.owner_id = auth.uid())
    )
  );

create policy respects_are_manageable_by_pet_owner
  on public.respects for update
  using (
    exists (
      select 1 from public.pets
      where pets.id = respects.pet_id
        and pets.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.pets
      where pets.id = respects.pet_id
        and pets.owner_id = auth.uid()
    )
  );

create policy basket_items_are_manageable_by_owner
  on public.basket_items for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
