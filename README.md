# Pet Memory

Pet Memory is the pet-oriented sister program to **Memoria**, Nate's brother's memorial application. The goal is to create a similar memorial experience, but shaped specifically around pets: warmer language, pet-focused profiles, moments, respects, tributes, photos, and optional physical QR memorial plaques.

## Product direction

Pet Memory is a living memory garden for beloved pets. It helps people turn the grief of losing an animal into a gentle tribute filled with photos, stories, shared love, quiet acts of remembrance, and lasting keepsakes.

The product should feel like a sanctuary, not a SaaS dashboard: warm, safe, tender, honest, peaceful, and lightly hopeful. The language should speak to people who loved an animal like family and need somewhere for that love to continue living.

## Approved initial scope

- Recreate the website/app from scratch instead of patching the current prototype.
- Build around the emotional promise first: honoring, remembering, grieving, and cherishing beloved pets.
- Use warm, calm, pet-focused design language.
- Fix photo preview/upload reliability.
- Add a memory garden/timeline to memorial profile cards.
- Keep Respects and Tributes emotionally distinct: low-pressure acts of love versus written shared memories.
- Position QR plaques as keepsakes for meaningful places while preserving a dropship handoff under the hood.
- Make memorials feel private by default, shareable by link, and owner-controlled.

## Relationship to Memoria

Memoria focuses on human memorials. Pet Memory should feel related in purpose and quality, but distinct in tone: softer, more pet-oriented, more playful where appropriate, and less formal/funeral-like.

## Local development

```bash
npm install
npm run dev
```

## Deployment

The permanent preview is published with GitHub Pages from the `main` branch using `.github/workflows/deploy-pages.yml`.

Production URL options:

```txt
https://nathanaelduberry.github.io/Pet-Memory/
```

If GitHub Pages is delayed, the same `gh-pages` static build can be previewed through a CDN URL:

```txt
https://cdn.jsdelivr.net/gh/nathanaelduberry/Pet-Memory@gh-pages/index.html
```

## Current status

Initial repository scaffold in progress.

## Work log

- Created the Pet Memory Vite + React + TypeScript app scaffold.
- Added README context that Pet Memory is the pet-oriented sister program to Memoria, Nate's brother's memorial application.
- Built the first landing-page structure around memorial creation, browsing, Moments, Respects, Tributes, photo preview/upload reliability, and QR memorial plaques.
- Added a tested Order Memorial Plaque CTA as the placeholder integration point for a future dropship checkout flow.
- Added Vitest + Testing Library coverage for the initial product positioning and CTA structure.
