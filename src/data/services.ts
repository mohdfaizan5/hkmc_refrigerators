// Service catalogue used across the homepage (booking grid, common-problems section)
// and the /services/[slug] pages.
//
// Images live in src/assets/services/ (not public/) so they go through Astro's
// image pipeline — automatic compression, resizing and format negotiation via
// the <Image> component in ServiceCard.astro and each service page. Do not move
// these back to public/ — that bypasses optimization entirely.
import type { ImageMetadata } from 'astro';
import acImage from '../assets/services/ac.png';
import dishwasherImage from '../assets/services/dishwasher.png';
import fridgeImage from '../assets/services/fridge.png';
import hvacImage from '../assets/services/hv-ac.png';
import microwaveImage from '../assets/services/oven.png';
import washingMachineImage from '../assets/services/washing-machine.png';
import waterGeyserImage from '../assets/services/water_heater.png';
import waterPurifierImage from '../assets/services/water_purifier.png';

export interface ServiceCategory {
	slug: string;
	name: string;
	shortName: string;
	description: string;
	image: ImageMetadata;
	visitFee: string;
	problems: string[];
}

export const serviceCategories: ServiceCategory[] = [
	{
		slug: 'ac-repair',
		name: 'AC Repair & Service',
		shortName: 'AC',
		description: 'Split, window & inverter AC — installation, gas refill, general service and repair.',
		image: acImage,
		visitFee: 'Visit from ₹299',
		problems: [
			'AC not cooling',
			'Water leaking from AC',
			'Gas leak',
			'AC making noise',
			'Ice formation on unit',
			'Remote not working',
		],
	},
	{
		slug: 'refrigerator-repair',
		name: 'Refrigerator Repair',
		shortName: 'Fridge',
		description: 'Single, double & side-by-side door fridges — cooling issues, gas charging, compressor repair.',
		image: fridgeImage,
		visitFee: 'Visit from ₹299',
		problems: [
			'Fridge not cooling',
			'Freezer fine, fridge warm',
			'Compressor noise',
			'Water leaking inside',
			'Ice build-up in freezer',
			'Door not sealing',
		],
	},
	{
		slug: 'washing-machine-repair',
		name: 'Washing Machine Repair',
		shortName: 'Washing Machine',
		description: 'Front load, top load & semi-automatic — spin, drainage, motor and PCB issues.',
		image: washingMachineImage,
		visitFee: 'Visit from ₹299',
		problems: [
			'Not spinning',
			'Not draining water',
			'Water leakage',
			'Excess noise or vibration',
			'Door won’t lock',
			'Error code on display',
		],
	},
	{
		slug: 'microwave-repair',
		name: 'Microwave Repair',
		shortName: 'Microwave',
		description: 'Solo, grill & convection microwaves — heating faults, sparking, display and door issues.',
		image: microwaveImage,
		visitFee: 'Visit from ₹299',
		problems: [
			'Not heating',
			'Turntable not rotating',
			'Sparking inside',
			'Touchpad not responding',
			'Door not closing',
			'Display not working',
		],
	},
	{
		slug: 'dishwasher-repair',
		name: 'Dishwasher Repair',
		shortName: 'Dishwasher',
		description: 'Free-standing, built-in & countertop dishwashers — installation, descaling, repair.',
		image: dishwasherImage,
		visitFee: 'Visit from ₹299',
		problems: [
			'Not draining',
			'Dishes not cleaning',
			'Not filling with water',
			'Door leaking',
			'Bad smell',
			'Error code (E15/E24)',
		],
	},
	{
		slug: 'commercial-refrigeration-hvac',
		name: 'Commercial Refrigeration & HVAC',
		shortName: 'Commercial & HVAC',
		description:
			'Deep freezers, visi coolers, cold rooms, ductable & VRF AC — for restaurants, cafes, hospitals & offices.',
		image: hvacImage,
		visitFee: 'Visit from ₹499',
		problems: [
			'Deep freezer not cooling',
			'Visi cooler / display chiller fault',
			'Ductable AC not cooling',
			'Cold room temperature drift',
			'Ice machine not making ice',
			'AMC & preventive maintenance',
		],
	},
	{
		slug: 'water-purifier-repair',
		name: 'Water Purifier Repair',
		shortName: 'Water Purifier',
		description: 'RO, UV & UF purifiers — filter change, motor repair, leakage fix and installation.',
		image: waterPurifierImage,
		visitFee: 'Visit from ₹299',
		problems: [
			'Low water output',
			'Water leakage',
			'Bad taste or odor',
			'Motor not working',
			'Filter change due',
			'RO not purifying',
		],
	},
	{
		slug: 'water-geyser-repair',
		name: 'Water Geyser Repair',
		shortName: 'Water Geyser',
		description: 'Instant & storage geysers — heating element, thermostat, tank and installation issues.',
		image: waterGeyserImage,
		visitFee: 'Visit from ₹299',
		problems: [
			'Not heating water',
			'Water too hot',
			'Leaking tank',
			'Tripping MCB',
			'Strange noise',
			'Installation & uninstallation',
		],
	},
];

export function getService(slug: string): ServiceCategory | undefined {
	return serviceCategories.find((service) => service.slug === slug);
}

// A handful of problem-keywords already have a dedicated blog post — link straight to it
// instead of the generic booking anchor, so both users and crawlers land on real answer content.
export const problemLinks: Record<string, string> = {
	'AC not cooling': '/blog/ac-not-cooling-common-causes/',
	'Gas leak': '/blog/ac-gas-refill-how-often/',
	'Fridge not cooling': '/blog/fridge-not-cooling-freezer-fine/',
	'Freezer fine, fridge warm': '/blog/fridge-not-cooling-freezer-fine/',
	'Not draining water': '/blog/washing-machine-not-draining-fixes/',
};

// Per-service FAQs, keyed by service slug. Rendered by ServiceFAQ.astro on each
// service page — both as an accordion AND as FAQPage JSON-LD, so AI answer
// engines and Google's rich results can extract them. Questions phrased the way
// customers actually search; answers written to be self-contained (extractable
// on their own without needing surrounding page context).
export interface ServiceFaq {
	q: string;
	a: string;
}

export const serviceFaqs: Record<string, ServiceFaq[]> = {
	'ac-repair': [
		{
			q: 'How much does AC service cost in Bangalore?',
			a: 'A diagnostic visit starts at ₹299 and is adjusted against the final repair quote. General service (filter clean, coil wash, drainage check) typically runs ₹499 – ₹799 per unit. Gas refill after leak-fix runs ₹1,800 – ₹3,500 depending on tonnage and refrigerant type.',
		},
		{
			q: 'Do you repair all AC brands?',
			a: 'Yes — LG, Samsung, Voltas, Daikin, Blue Star, Whirlpool, Hitachi, Panasonic, IFB, Godrej, Lloyd, Mitsubishi and more. We use manufacturer-approved parts wherever possible and cover both split and window units, including inverter and Wi-Fi models.',
		},
		{
			q: 'How quickly can a technician reach me for AC repair?',
			a: `Most bookings placed before 4 PM in Bangalore get a same-day visit. You'll get a confirmation call within minutes of booking to fix the exact time slot — usually a 2-hour window rather than a fixed time.`,
		},
		{
			q: 'Does the visit fee cover the repair?',
			a: `The ₹299 visit fee covers the technician's diagnostic visit and inspection. If you accept the repair quote, the visit fee is adjusted against the final bill — you don't pay it twice. If you decline the quote, only the visit fee applies.`,
		},
		{
			q: 'Do you provide a warranty on AC repairs?',
			a: 'Every repair carries a 30-day service warranty on the same issue — if the fault recurs within that window, we send a technician back at no extra charge. Genuine spare parts also carry the manufacturer part warranty on top of that.',
		},
		{
			q: 'Does needing a gas refill mean my AC is broken?',
			a: `Refrigerant runs in a fully sealed loop — it doesn't get consumed through normal cooling. If your AC needs a refill, gas is leaking somewhere. A proper service locates the leak, seals it, vacuum-tests the system and then recharges — otherwise you'll be back to weak cooling within months.`,
		},
	],
	'refrigerator-repair': [
		{
			q: 'How much does refrigerator repair cost in Bangalore?',
			a: 'Diagnostic visit starts at ₹299 and is adjusted against the final quote. Common jobs: door gasket replacement ₹800 – ₹1,500, thermostat replacement ₹700 – ₹1,400, compressor repair or replacement ₹2,500 – ₹8,000 depending on capacity and brand.',
		},
		{
			q: `Why is my freezer cold but the fridge section warm?`,
			a: `Usually a blocked airflow between the freezer and fridge compartment — a failed evaporator fan, ice buildup on the evaporator coil, or a stuck damper. Rarely a full compressor failure. A technician diagnoses which of these is at fault before quoting.`,
		},
		{
			q: 'Do you repair single-door, double-door and side-by-side fridges?',
			a: 'Yes — including French-door and multi-door models. We service LG, Samsung, Whirlpool, Godrej, Haier, Bosch, Panasonic, Hitachi, LG InstaView and Samsung Family Hub units, plus older direct-cool refrigerators.',
		},
		{
			q: 'My fridge is making loud noise — is it serious?',
			a: `Depends on where the sound is coming from. A humming compressor is normal, but a rattling from the back panel, a knocking from the freezer, or a screech from the fan motor all indicate a specific fault. A short diagnostic visit narrows it down without opening the sealed system.`,
		},
		{
			q: `Is refrigerator gas refill needed every few years?`,
			a: `No — a healthy refrigerator's refrigerant is sealed for the life of the unit. If a technician insists on regular gas top-ups without finding a leak, that's a red flag. Refill only makes sense after locating and sealing a real leak.`,
		},
	],
	'washing-machine-repair': [
		{
			q: 'How much does washing machine repair cost in Bangalore?',
			a: 'Diagnostic visit starts at ₹299. Common jobs: drain pump replacement ₹800 – ₹1,800, door lock (front load) ₹700 – ₹1,500, motor coupling ₹500 – ₹1,200, PCB repair ₹1,800 – ₹4,500. Final quote depends on brand, part availability and fault.',
		},
		{
			q: 'Do you repair front load, top load and semi-automatic machines?',
			a: 'Yes — all three types, and every major brand: LG, Samsung, IFB, Bosch, Whirlpool, Godrej, Panasonic, Haier, Siemens, Onida. We handle spin faults, drainage issues, door-lock failures, PCB errors, motor problems, water inlet issues and vibration.',
		},
		{
			q: `Why won't my washing machine drain water?`,
			a: `Most common causes: a blocked drain pump filter, a clogged drain hose, a failed drain pump motor, or a stuck water-level sensor. The filter is a 10-minute DIY check — instructions differ by brand but the port is usually behind a small panel at the bottom-front. If clearing the filter doesn't work, it's a technician visit.`,
		},
		{
			q: `What does an error code on the display mean?`,
			a: `Error codes point to the failed subsystem — a drainage error (LE / E20 / OE on most brands) means water isn't draining, a door error (DE / E01) means the door lock or sensor is faulty, and heater errors (HE / E13) mean the heating element or NTC sensor failed. A technician decodes it against the brand's service manual on-site.`,
		},
		{
			q: `Should I repair or replace a 7-year-old washing machine?`,
			a: `Rule of thumb: if the repair costs more than 40% of a new equivalent, replace. If it's under 25%, always repair. In between, it depends on how many other components have already been replaced and the machine's overall condition. Our free repair-or-replace calculator lays it out for a specific case.`,
		},
	],
	'microwave-repair': [
		{
			q: 'How much does microwave repair cost in Bangalore?',
			a: 'Diagnostic visit starts at ₹299. Common part-based fixes: magnetron replacement ₹1,800 – ₹3,500, high-voltage capacitor ₹500 – ₹1,000, door switch ₹300 – ₹700, turntable motor ₹400 – ₹900. Full quote after diagnosis.',
		},
		{
			q: 'Do you repair solo, grill and convection microwaves?',
			a: 'Yes — all three types, across LG, Samsung, Whirlpool, IFB, Panasonic, Bajaj, Haier, Godrej and Bosch. Convection microwaves have more failure surface (heating element, fan motor, complex PCB) but the diagnostic and repair process is the same.',
		},
		{
			q: 'Is a microwave that sparks inside safe to use?',
			a: `No — stop using it immediately. Sparking usually means the waveguide cover (mica sheet behind the food chamber) has burned or that the interior enamel is chipped and exposing metal. Both are quick repairs but the microwave shouldn't be run again until fixed.`,
		},
		{
			q: `Why won't my microwave heat food anymore?`,
			a: `The magnetron — the microwave's heart — has usually failed. Symptoms: the fan and turntable run normally but food stays cold. Occasionally it's the high-voltage capacitor or diode instead. Either way, this is not a DIY repair — microwave capacitors can hold a lethal charge even when unplugged.`,
		},
		{
			q: 'How long should a microwave last?',
			a: 'Typical lifespan is 8 – 10 years for regular household use. Beyond 10 years, individual repairs still work but multiple failures in the same year usually signal end-of-life — that\'s when our free "repair or replace" calculator earns its keep.',
		},
	],
	'dishwasher-repair': [
		{
			q: 'How much does dishwasher repair cost in Bangalore?',
			a: 'Diagnostic visit starts at ₹299. Common jobs: drain pump ₹1,200 – ₹2,500, door seal ₹800 – ₹1,800, water inlet valve ₹700 – ₹1,500, control board ₹2,500 – ₹5,500. Brand and part availability drive the range.',
		},
		{
			q: 'Do you service Bosch, IFB, Siemens and LG dishwashers?',
			a: 'Yes — all major dishwasher brands available in India: Bosch, IFB, Siemens, LG, Whirlpool, Faber, Voltas Beko, Elica and Kaff. Both freestanding and built-in installations.',
		},
		{
			q: 'What does the error code E15 / E24 mean on my dishwasher?',
			a: 'Both are drainage-related. E15 is a water-leak sensor tripping (usually because water pooled in the base) — clean and dry the base tray to reset. E24 is a drain-pump/drain-hose blockage — clear the filter and hose. If either recurs, it needs a service visit.',
		},
		{
			q: `Why aren't my dishes cleaning properly?`,
			a: `Common causes: clogged spray-arm nozzles (soak in warm water with vinegar), blocked filter at the bottom of the tub, wrong detergent or dosage, insufficient water pressure, or a failing wash pump. Try cleaning the filter and spray arms first; if that doesn't fix it, book a visit.`,
		},
		{
			q: 'Do you install new dishwashers?',
			a: 'Yes — including built-in dishwashers that need cabinet cut-outs, water inlet plumbing and drain connection. Installation cost depends on whether the site is already prepped or needs plumbing work.',
		},
	],
	'commercial-refrigeration-hvac': [
		{
			q: 'What commercial refrigeration equipment do you service?',
			a: 'Deep freezers, visi coolers, chest freezers, cold rooms, walk-in freezers, ice machines, glass door display chillers, blast freezers, ice-cream showcases, ductable AC, cassette AC and VRF/VRV systems.',
		},
		{
			q: 'Do you offer AMC (annual maintenance contract) plans?',
			a: `Yes — AMC plans cover scheduled quarterly maintenance, priority response for breakdowns, discounted spare-part rates and a documented service log. Ideal for restaurants, cloud kitchens, cafes, supermarkets, hospitals and hotels where equipment downtime directly hits revenue.`,
		},
		{
			q: 'How fast can you respond to a commercial refrigeration breakdown?',
			a: `For customers on AMC, the response SLA is typically 2 – 4 hours in Bangalore. For on-demand requests, most emergencies (cold room warming, deep freezer failure, restaurant kitchen HVAC down) get a same-day visit — call the phone number directly rather than booking online for faster dispatch.`,
		},
		{
			q: 'What does a commercial-visit cost?',
			a: 'Commercial diagnostic visit is ₹499 and is adjusted against the final repair quote or the AMC signup fee. Larger installations (cold room commissioning, VRF setup) are quoted after a site visit — we don\'t give phone estimates for these because too many variables change with the site.',
		},
		{
			q: 'Do you sell spare parts or only service?',
			a: 'We source and install spare parts as part of a service call — we don\'t operate a walk-in parts counter. If you need a specific compressor, fan motor, thermostat or PCB for your commercial unit, tell us the make, model and serial number when booking and we\'ll source it before the visit.',
		},
	],
	'water-purifier-repair': [
		{
			q: 'How much does water purifier service cost in Bangalore?',
			a: 'Diagnostic visit starts at ₹299. Common jobs: RO membrane replacement ₹1,500 – ₹2,500, sediment + carbon filter set ₹800 – ₹1,400, service pump ₹1,500 – ₹2,800, SMPS ₹700 – ₹1,400. Filter changes are usually needed every 6 – 12 months depending on Bangalore water quality.',
		},
		{
			q: 'Do you service RO, UV and UF purifiers?',
			a: 'Yes — all three technology types and every major brand: Kent, Aquaguard, Livpure, Pureit, Blue Star, Havells, Whirlpool, HUL and A.O. Smith. Both under-sink and wall-mount installations.',
		},
		{
			q: 'How often should the RO membrane be changed in Bangalore?',
			a: 'For most Bangalore borewell water (moderate to hard TDS), an RO membrane lasts 12 – 18 months. Cauvery water usually gets 18 – 24 months. If water output has dropped noticeably or TDS at the outlet is climbing, that\'s the practical signal — not a fixed calendar.',
		},
		{
			q: 'My purifier is leaking — is that a filter change or a bigger job?',
			a: 'Usually a bigger job: loose fitting, cracked filter housing, worn valve, or a failed float switch. A quick visit diagnoses which. Small drips can be tightened during the same visit; a full housing crack means a housing replacement.',
		},
		{
			q: 'Can you install a new water purifier?',
			a: 'Yes — including mounting, tapping the inlet water line, running the drain line for the RO reject water, and initial commissioning. Installation typically takes 60 – 90 minutes for a standard under-sink or wall-mount unit.',
		},
	],
	'water-geyser-repair': [
		{
			q: 'How much does water geyser repair cost in Bangalore?',
			a: 'Diagnostic visit starts at ₹299. Common jobs: heating element replacement ₹800 – ₹1,600, thermostat ₹600 – ₹1,200, MCB / wiring ₹400 – ₹900, full tank replacement (if corroded) ₹3,500 – ₹6,500 depending on capacity. Final quote after diagnosis.',
		},
		{
			q: 'Do you repair instant and storage geysers?',
			a: 'Yes — both types. Instant geysers (Bajaj, Racold, AO Smith, Havells, Crompton) have simpler internals — usually the element, MCB or the pressure switch. Storage geysers add thermostat, magnesium anode rod and tank issues to the list.',
		},
		{
			q: 'Why is my geyser tripping the MCB every time I turn it on?',
			a: 'Usually a failed heating element that has developed an earth leak — water is bridging the element to the tank body. Occasionally a wet or corroded thermostat. Do not keep resetting the MCB; the tripping is protecting you from a live tank. A technician can confirm and replace within one visit.',
		},
		{
			q: 'How long should a storage geyser last?',
			a: 'A well-maintained storage geyser lasts 8 – 10 years. Bangalore water is usually kind (moderate hardness), so tank corrosion is slower than in coastal cities. Replacing the anode rod every 3 – 4 years extends tank life significantly and costs a fraction of a new geyser.',
		},
		{
			q: 'Do you install and uninstall geysers when moving home?',
			a: 'Yes — including safe electrical disconnection, water inlet/outlet closure, tank drain-down, wall bracket removal, and reinstall at the new address if needed. If your new home already has geyser mounting points and plumbing, reinstall is usually a 45 – 60 minute job.',
		},
	],
};
