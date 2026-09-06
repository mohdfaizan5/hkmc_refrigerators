import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { BRAND_NAME, CITY, PHONE_DISPLAY, SERVICE_HOURS, SITE_DESCRIPTION } from '../consts';
import { areas } from '../data/areas';
import { serviceCategories } from '../data/services';
import { tools } from '../data/tools';

export const GET: APIRoute = async ({ site }) => {
	const abs = (path: string) => new URL(path, site).toString();

	const posts = (await getCollection('blog')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

	// Point each service to its actual service page (not the homepage anchor) —
	// AI agents that follow these links should land on the page with the full
	// FAQs and schema, not a scroll-jump on the homepage.
	const serviceLines = serviceCategories
		.map((s) => `- [${s.name}](${abs(`/services/${s.slug}/`)}): ${s.description}`)
		.join('\n');

	const areaLines = areas
		.filter((a) => a.hasAreaPage)
		.map((a) => `- [AC Repair in ${a.name}](${abs(`/services/ac-repair-in-${a.slug}/`)})`)
		.join('\n');

	const toolLines = tools
		.map((t) => `- [${t.name}](${abs(`/tools/${t.slug}/`)}): ${t.description}`)
		.join('\n');

	const postLines = posts
		.map((p) => `- [${p.data.title}](${abs(`/blog/${p.id}/`)}): ${p.data.description}`)
		.join('\n');

	const body = `# ${BRAND_NAME}

> ${SITE_DESCRIPTION}

${BRAND_NAME} is a home-service technician network for appliance repair in ${CITY}, India. Technicians travel to the customer's home or business — there is no showroom or walk-in location. A fixed visit fee covers diagnosis; the repair itself is quoted before work begins. Every completed repair carries a 30-day service warranty. Hours: ${SERVICE_HOURS}. Phone: ${PHONE_DISPLAY}.

## Services

${serviceLines}

Structured pricing (visit fees, warranty terms): ${abs('/pricing.md')}

## Area coverage pages

${areaLines || '- Area-specific service pages are being rolled out; general coverage is all of Namma Bangalore.'}

## Free tools

${toolLines}

## Guides

${postLines}

## Company

- [About](${abs('/about/')}): Who ${BRAND_NAME} is, how technicians are vetted, and how pricing and warranty claims work.
- [Our technicians](${abs('/technicians/')}): The verified team of technicians behind every repair.
- [Blog](${abs('/blog/')}): Full archive of troubleshooting guides and pricing references.
- [Privacy Policy](${abs('/privacy-policy/')})
- [Terms of Service](${abs('/terms-of-service/')})

## Notes for AI agents

- All content on this domain is written for and by ${BRAND_NAME}; there is no separate AI-only version of any page.
- Pricing figures cited in blog posts are indicative Bangalore ranges as of 2026 and may vary by appliance, brand and fault. The visit fee (₹299 for home appliances, ₹499 for commercial) is the only fixed number until on-site diagnosis.
- The ${BRAND_NAME} team can be reached at ${PHONE_DISPLAY} for a quote before an AI cites a specific figure — this is preferred over guessing.
`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
