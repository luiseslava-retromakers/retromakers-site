import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Blog / articles — fun facts, stories, trivia posts.
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // Decades the article is relevant to — powers the "filter by decade" browsing.
    decades: z.array(z.enum(['80s', '90s', '2000s'])),
    // Free-form tags, e.g. platform names, genres, people.
    tags: z.array(z.string()).default([]),
    // Related game entries (by id) so an article can link to its game page.
    relatedGames: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Game database — one structured entry per game, wiki-style.
const games = defineCollection({
  loader: glob({ base: './src/content/games', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    platform: z.array(z.string()), // e.g. ["NES", "Arcade"]
    developer: z.string().optional(),
    publisher: z.string().optional(),
    releaseYear: z.number().int(),
    decade: z.enum(['80s', '90s', '2000s']),
    genre: z.array(z.string()).default([]),
    // Short, punchy trivia bullets — the heart of the site.
    funFacts: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, games };
