// Shared helper so every page that turns a free-form tag string (e.g. "Michiru Yamane",
// "survival horror") into a URL segment does it the same way. Keeps /tags/[tag] routes
// and the tag links on cards/detail pages in sync.
export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip accents (a, e, i, o, u, n -> plain letters)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
