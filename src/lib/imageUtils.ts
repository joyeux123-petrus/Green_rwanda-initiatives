/**
 * Production-Safe Image Utility & Path Normalizer
 * Resolves path mismatches, spaces, casing issues, and legacy image references.
 */

export const DEFAULT_FALLBACK_IMAGE = '/images/logo.jpeg';

export function normalizeImageUrl(url?: string | null): string {
  if (!url || typeof url !== 'string') {
    return DEFAULT_FALLBACK_IMAGE;
  }

  const trimmed = url.trim();
  if (!trimmed) {
    return DEFAULT_FALLBACK_IMAGE;
  }

  // Preserve external URLs & data URLs
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:')) {
    return trimmed;
  }

  // Ensure path starts with /
  let path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;

  // Decode URI components if already percent-encoded
  try {
    path = decodeURIComponent(path);
  } catch (e) {
    // Keep as is if decode fails
  }

  const lowerPath = path.toLowerCase();

  // 1. Logo normalization
  if (lowerPath.includes('logo.jpg') || lowerPath.includes('logo.jpeg') || lowerPath.includes('logo.png')) {
    return '/images/logo.jpeg';
  }

  // 2. Partners mappings
  if (lowerPath.includes('350')) {
    return '/images/partners/350.png';
  }
  if (lowerPath.includes('iom')) {
    return '/images/partners/IOM.png';
  }
  if (lowerPath.includes('oxfam') || lowerPath.includes('ox fam') || lowerPath.includes('ox-fam')) {
    return '/images/partners/ox-fam.png';
  }
  if (lowerPath.includes('africarising') || lowerPath.includes('africa rising') || lowerPath.includes('africa-rising') || lowerPath.includes('afrika vuka') || lowerPath.includes('afrikavuka')) {
    return '/images/partners/africa-rising.png';
  }
  if (lowerPath.includes('staygrounded') || lowerPath.includes('stay grounded') || lowerPath.includes('stay-grounded')) {
    return '/images/partners/stay-grounded.png';
  }

  // 3. Team & Staff member image mappings
  if (lowerPath.includes('habumuremyi') || lowerPath.includes('chair person') || lowerPath.includes('foustin') || lowerPath.includes('faustin')) {
    return '/images/team/foustin-habumuremyi.jpeg';
  }
  if (lowerPath.includes('mugisha') || lowerPath.includes('deput chair') || lowerPath.includes('jean-felix') || lowerPath.includes('jean felix')) {
    return '/images/team/jean-felix-mugisha.jpeg';
  }
  if (lowerPath.includes('marie claire') || lowerPath.includes('nyirarukundo') || lowerPath.includes('daf') || lowerPath.includes('marie-claire')) {
    return '/images/staff/marie-claire-nyirarukundo.jpeg';
  }
  if (lowerPath.includes('didier') || lowerPath.includes('byamukama') || lowerPath.includes('mel manager')) {
    return '/images/staff/didier-byamukama.jpeg';
  }
  if (lowerPath.includes('pascal') || lowerPath.includes('nteziyaremye')) {
    return '/images/staff/pascal-nteziyaremye.jpeg';
  }
  if (lowerPath.includes('agronomist') || lowerPath.includes('field officer(agronomist)')) {
    return '/images/staff/field-officer-agronomist.jpeg';
  }
  if (lowerPath.includes('educator') || lowerPath.includes('field officer(educator)')) {
    return '/images/staff/field-officer-educator.jpeg';
  }

  // 4. WhatsApp images mapping
  if (lowerPath.includes('whatsapp-2026-09-21') || lowerPath.includes('5.55.49 am') || lowerPath.includes('whatsapp image 2026-09-21 at 5.55.49')) {
    return '/images/whatsapp-2026-09-21-55549.jpeg';
  }
  if (lowerPath.includes('whatsapp-2026-09-28') || lowerPath.includes('1.17.38 pm') || lowerPath.includes('whatsapp image 2026-09-28 at 1.17.38')) {
    return '/images/whatsapp-2026-09-28-11738.jpeg';
  }

  // 5. Nyamabuye & Muhanga image normalizations
  if (lowerPath.includes('nyamabuye-1') || lowerPath.includes('nyamabuye1') || lowerPath.includes('muhanga-1') || lowerPath.includes('muhanga1')) {
    return '/images/nyamabuye-1.jpg';
  }
  if (lowerPath.includes('nyamabuye-2') || lowerPath.includes('nyamabuye2') || lowerPath.includes('muhanga-2') || lowerPath.includes('muhanga2')) {
    return '/images/nyamabuye-2.png';
  }
  if (lowerPath.includes('nyamabuye-3') || lowerPath.includes('nyamabuye3') || lowerPath.includes('muhanga-3') || lowerPath.includes('muhanga3')) {
    return '/images/nyamabuye-3.png';
  }
  if (lowerPath.includes('nyamabuye-4') || lowerPath.includes('nyamabuye4') || lowerPath.includes('muhanga-4') || lowerPath.includes('muhanga4')) {
    return '/images/nyamabuye-4.png';
  }
  if (lowerPath.includes('nyamabuye') || lowerPath.includes('muhanga')) {
    return '/images/Nyamabuye.jpg';
  }

  // 6. Youth parliament image normalizations
  if (lowerPath.includes('youth-parliament-1') || lowerPath.includes('youthparliament1') || lowerPath.includes('youth parliament1')) {
    return '/images/youth-parliament-1.jpeg';
  }
  if (lowerPath.includes('youth-parliament-2') || lowerPath.includes('youthparliament2')) {
    return '/images/youth-parliament-2.jpeg';
  }
  if (lowerPath.includes('youth-parliament-3') || lowerPath.includes('youthparliament3')) {
    return '/images/youth-parliament-3.jpeg';
  }
  if (lowerPath.includes('youth-parliament-4') || lowerPath.includes('youthparliament4')) {
    return '/images/youth-parliament-4.jpeg';
  }
  if (lowerPath.includes('youth-parliament-5') || lowerPath.includes('youthparliament5')) {
    return '/images/youth-parliament-5.jpeg';
  }
  if (lowerPath.includes('youth-parliament-6') || lowerPath.includes('youthparliament6') || lowerPath.includes('youth parliament6')) {
    return '/images/youth-parliament-6.jpeg';
  }
  if (lowerPath.includes('youth-parliament-7') || lowerPath.includes('youthparliament7')) {
    return '/images/youth-parliament-7.jpeg';
  }

  // 7. Core photo normalizations
  if (lowerPath.includes('_smn1953')) {
    return '/images/_SMN1953.JPG';
  }
  if (lowerPath.includes('_smn1979')) {
    return '/images/_SMN1979.JPG';
  }
  if (lowerPath.includes('green_rwanda') || lowerPath.includes('green-rwanda')) {
    return '/images/green_rwanda.jpeg';
  }
  if (lowerPath.includes('img-20251023-wa0126')) {
    return '/images/IMG-20251023-WA0126.jpg';
  }
  if (lowerPath.includes('img-20251117-wa0048')) {
    return '/images/IMG-20251117-WA0048.jpg';
  }
  if (lowerPath.includes('img-20251024-wa0033')) {
    return '/images/IMG-20251024-WA0033.jpg';
  }
  if (lowerPath.includes('img-20231001-wa0005')) {
    return '/images/IMG-20231001-WA0005.jpg';
  }

  // 8. Hero folder images normalization
  if (lowerPath.includes('hero1') || lowerPath.includes('hero-1')) {
    return '/images/hero/hero1.jpeg';
  }
  if (lowerPath.includes('hero2') || lowerPath.includes('hero-2')) {
    return '/images/hero/hero2.jpeg';
  }
  if (lowerPath.includes('hero3') || lowerPath.includes('hero-3')) {
    return '/images/hero/hero3.jpeg';
  }
  if (lowerPath.includes('hero4') || lowerPath.includes('hero-4')) {
    return '/images/hero/hero4.jpeg';
  }
  if (lowerPath.includes('hero5') || lowerPath.includes('hero-5')) {
    return '/images/hero/hero5.jpeg';
  }

  return path;
}

/**
 * Image error handler callback for <img> elements
 */
export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
  const target = e.currentTarget;
  if (!target.dataset.fallbackTried) {
    target.dataset.fallbackTried = 'true';
    if (target.src !== window.location.origin + DEFAULT_FALLBACK_IMAGE) {
      target.src = DEFAULT_FALLBACK_IMAGE;
    }
  }
}
