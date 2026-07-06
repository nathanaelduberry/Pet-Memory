export const sampleMemorial = {
  name: 'Bailey',
  dates: '2012 — 2025',
  slug: 'bailey-forever-garden',
  identityLine: 'Porch sunbather. Sock thief. Best friend.',
  story: 'A loyal friend, porch sunbather, and forever part of the family garden.',
  photoAlt: 'Uploaded pet preview',
  privacy: 'Only visible when you choose to share it',
  favoriteThings: ['Sunny windows', 'Blue blanket', 'Car rides']
};

export const heroCopy = {
  eyebrow: 'A living memory garden for beloved pets',
  title: 'For the pets who never really leave us',
  lede:
    'When a beloved animal passes, the routines change but the love remains. PetMemory helps you give all that love somewhere gentle to live — in photos, stories, shared memories, and quiet acts of remembrance.'
};

export const primaryActions = {
  begin: 'Begin Their Memorial',
  visit: 'Visit Memorials',
  keepsake: 'Create a Keepsake Plaque'
};

export const waysToRemember = [
  {
    title: 'Tell their story',
    copy: 'Capture who they were, what they loved, and the little details you never want to forget.'
  },
  {
    title: 'Grow their memory garden',
    copy: 'Add life moments, photos, favorite places, and milestones as memories come back to you.'
  },
  {
    title: 'Quiet acts of love',
    copy: 'Let visitors light a candle, leave a flower, or send a pawprint when words feel too heavy.'
  },
  {
    title: 'Shared memories',
    copy: 'Family and friends can add the memories only they carry, with you in control of what appears.'
  },
  {
    title: 'Lasting keepsakes',
    copy: 'Connect a physical place back to the memorial they inspired, whenever that feels right.'
  }
];

export const previewStats = [
  ['12', 'acts of love'],
  ['5', 'moments'],
  ['3', 'memories']
];

export const timelineMoments = [
  {
    date: 'May 2012',
    title: 'The day Bailey came home',
    copy: 'Curled up in the laundry basket and claimed the whole house by bedtime.'
  },
  {
    date: 'Aug 2018',
    title: 'First beach day',
    copy: 'Chased tide foam, made friends with every kid, and slept the whole ride home.'
  },
  {
    date: 'Jun 2025',
    title: 'Garden farewell',
    copy: 'Family shared stories beside the porch where Bailey watched every sunset.'
  }
];

export const respectActions = ['Candle', 'Flower', 'Pawprint'];

export const respects = [
  { name: 'Jordan', action: 'left a flower', detail: 'For every tail wag at the gate.' },
  { name: 'Nate', action: 'lit a candle', detail: 'Still saving your sunny porch spot.' }
];

export const trustPromises = [
  'Private by default',
  'Shareable by link',
  'Invite family when ready',
  'Moderate tributes before they appear',
  'Edit and add memories over time'
];

export function buildDropshipUrl() {
  const params = new URLSearchParams({
    source: 'petmemory',
    dropship: 'qr-memorial-plaque',
    petName: sampleMemorial.name,
    memorialUrl: `https://nathanaelduberry.github.io/Pet-Memory/#memorial-${sampleMemorial.slug}`,
    product: 'garden-marker-urn-plate-framed-plaque',
    qrCode: `https://nathanaelduberry.github.io/Pet-Memory/#memorial-${sampleMemorial.slug}`
  });

  return `https://dropship.petmemory.app/order?${params.toString()}`;
}
