import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			author: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// Optional DIY-style step list. When present, BlogPost.astro also emits
			// a HowTo JSON-LD alongside the BlogPosting schema — this is what makes
			// step-by-step troubleshooting posts eligible for Google's HowTo rich
			// result and gives AI answer engines an explicit ordered instruction set.
			howToSteps: z
				.array(
					z.object({
						name: z.string(),
						text: z.string(),
					}),
				)
				.optional(),
		}),
});

export const collections = { blog };
