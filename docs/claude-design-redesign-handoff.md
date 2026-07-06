# PetMemory Redesign Handoff for Claude Design

## Context
PetMemory is becoming a memorial and remembrance commerce experience for animals. The current app is a React/Vite single-page site with page-like sections. It should evolve into a calm, emotionally trustworthy product where families can create memorials, personalize remembrance products, preview them, and order with minimal friction.

Live site: https://nathanaelduberry.github.io/Pet-Memory/
Repo: `nathanaelduberry/Pet-Memory`

## Current product structure
Current nav/sections:
- Home: emotional promise and memorial card preview
- Studio: guided memorial creation steps
- Explore: memory garden/community browsing concept
- Products: keepsake shop
- Customize: minimal creation studio
- Preview: live keepsake preview
- Checkout: order handoff preview
- Privacy: owner-controlled memorial reassurance

Current product categories:
- Garden Marker — £39
- Framed Memory Plaque — £59
- Mini Memorial Stone — £79
- Photo Keepsake Print — £24
- Memory Locket — £49
- Urn Plate — £29

Current creation controls:
- Pet name
- Memorial message
- Tone: Peaceful, Joyful, Grateful, Goodbye
- Product selector
- Live preview
- Review and order CTA

## Design goal
Explore multiple new visual directions for PetMemory while preserving the product promise:

> A tender memorial space for beloved animals, paired with tasteful remembrance items that can be previewed and ordered.

The redesign should make PetMemory feel like a real emotional product, not a generic SaaS landing page and not a cold ecommerce store.

## Required output from Claude Design
Create 3 divergent high-fidelity design directions. Each should include at least:
1. Home / memorial promise screen
2. Product shop screen
3. Create Studio screen
4. Preview + checkout/order screen
5. Mobile treatment for the primary flow

Preferred artifact format:
- One self-contained HTML prototype with 3 switchable directions, or
- Three separate HTML prototypes, one per direction

## Design directions to explore

### Direction A — Quiet Garden
Soft, grounded, nature-led. Warm paper, moss, stone, sunlight, garden rituals. Feels peaceful and trustworthy.

Use when the priority is emotional safety and gentleness.

### Direction B — Keepsake Atelier
Premium but not luxury-cold. More editorial/product photography energy. Plaques, jewellery, frames, and stones feel like carefully crafted remembrance objects.

Use when the priority is memorabilia sales and conversion.

### Direction C — Family Memory App
More product/app-like. Clean portal, personal dashboard, pets, basket, memorials, saved products, and preview flow. Still warm, but clearer SaaS/app structure.

Use when the priority is account-based personalization and scaling to many users/pets.

## UX constraints
- Keep the path very minimal: Create → Preview → Order.
- Avoid overwhelming grieving users.
- Product cards should be clear and purchasable, but not shouty.
- The memorial must remain the emotional center; products support the memory, not the other way around.
- Avoid generic pet-shop aesthetics, cartoon overload, rainbow palettes, or playful ecommerce noise.
- Accessibility: high contrast for core text, real focus states, mobile hit targets at least 44px.

## Account/personalization roadmap
A login portal is being added. Design should anticipate:
- Sign in / create account
- My pets
- My memorials
- Basket
- Saved products
- Draft memorials
- Supabase-backed auth/profile/pet/basket data later

Do not make the portal feel like admin software. It should feel like a private family memory cabinet.

## Suggested information architecture
- `/` Home
- `/studio` Create memorial
- `/products` Keepsake shop
- `/preview` Live preview
- `/checkout` Basket/order review
- `/account` Login and personal portal
- `/account/pets` User's animals
- `/account/basket` User basket

For the current static implementation, anchors are acceptable, but the design should think in real pages.

## Current copy tone
Gentle, simple, non-technical. Use words like:
- memorial
- memory garden
- keepsake
- remembrance
- their story
- private
- owner-controlled
- preview
- order

Avoid visible words like:
- MVP
- payload
- supplier integration
- dropship-ready
- API
- database
- conversion funnel

Machine URLs may still contain dropship tokens, but visible user copy should not.

## Source files worth inspecting
- `src/App.tsx`
- `src/components/Hero.tsx`
- `src/components/ProductExperience.tsx`
- `src/components/MemorialPreview.tsx`
- `src/components/KeepsakePlaqueSection.tsx`
- `src/content/memorialContent.ts`
- `src/styles.css`

## Existing snapshots
Generated snapshots are saved in:
- `artifacts/snapshots/petmemory-home-full.png`
- `artifacts/snapshots/petmemory-products.png`
- `artifacts/snapshots/petmemory-create-studio.png`
- `artifacts/snapshots/petmemory-mobile.png`

## Decision criteria
Rank each redesign direction on:
1. Emotional trust
2. Ease of creating a memorial
3. Product purchase clarity
4. Mobile usability
5. Ability to support logged-in personalization
6. Distinctiveness vs generic memorial/ecommerce sites

## Final recommendation expected
After presenting variants, recommend one direction or a hybrid with rationale, then identify the first production implementation steps.
