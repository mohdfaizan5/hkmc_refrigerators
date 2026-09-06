// Bangalore neighborhoods HKMC actively services. Structured this way so the
// homepage neighborhood chips, footer, and dynamic area landing pages
// (/services/ac-repair-in-{slug}/) all read from the same list.
//
// `hasAreaPage` gates the homepage chip's link behavior: chips for areas with a
// live page become anchors; chips without a page stay as text (or fall back to
// the booking anchor) so we're not shipping 404 links.
//
// When a new area page ships, flip its `hasAreaPage` to true and add the page
// under src/pages/services/ac-repair-in-{slug}.astro. Landmarks and lead copy
// live here so the page templates stay generic — they read whatever the area
// entry provides.

export interface Area {
	slug: string;
	name: string;
	/** True once a dedicated /services/ac-repair-in-{slug}/ page has been published. */
	hasAreaPage: boolean;
	/** Short second-line copy used on the area page hero. Locality flavour, not marketing. */
	blurb?: string;
	/** Notable landmarks, apartment complexes, or micro-areas covered — used for area-page proof. */
	landmarks?: string[];
	/** Postal code prefix(es) for schema.org geo hints. Optional. */
	postalCodePrefix?: string;
}

export const areas: Area[] = [
	{
		slug: 'koramangala',
		name: 'Koramangala',
		hasAreaPage: true,
		blurb:
			'From the 1st Block cafés to the tech-corridor apartments off Sarjapur Road, our AC technicians cover every Koramangala block — same-day visits, transparent quotes, 30-day warranty.',
		landmarks: [
			'Koramangala 1st, 3rd, 4th, 5th, 6th, 7th & 8th Block',
			'Forum Mall',
			'Sony World Junction',
			'St. John\'s Medical College area',
			'Ejipura Signal',
			'Adugodi',
		],
		postalCodePrefix: '560034',
	},
	{ slug: 'indiranagar', name: 'Indiranagar', hasAreaPage: false },
	{ slug: 'hsr-layout', name: 'HSR Layout', hasAreaPage: false },
	{ slug: 'whitefield', name: 'Whitefield', hasAreaPage: false },
	{ slug: 'jayanagar', name: 'Jayanagar', hasAreaPage: false },
	{ slug: 'marathahalli', name: 'Marathahalli', hasAreaPage: false },
	{ slug: 'jp-nagar', name: 'JP Nagar', hasAreaPage: false },
	{ slug: 'electronic-city', name: 'Electronic City', hasAreaPage: false },
	{ slug: 'btm-layout', name: 'BTM Layout', hasAreaPage: false },
	{ slug: 'malleswaram', name: 'Malleswaram', hasAreaPage: false },
	{ slug: 'yelahanka', name: 'Yelahanka', hasAreaPage: false },
	{ slug: 'bellandur', name: 'Bellandur', hasAreaPage: false },
	{ slug: 'hebbal', name: 'Hebbal', hasAreaPage: false },
	{ slug: 'banashankari', name: 'Banashankari', hasAreaPage: false },
	{ slug: 'sarjapur-road', name: 'Sarjapur Road', hasAreaPage: false },
	{ slug: 'rt-nagar', name: 'RT Nagar', hasAreaPage: false },
];

export function getArea(slug: string): Area | undefined {
	return areas.find((area) => area.slug === slug);
}
