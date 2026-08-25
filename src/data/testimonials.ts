// Shared testimonial pool. Add new reviews here — pages pull from this via
// getTestimonial()/getTestimonials() instead of hardcoding a quote inline, so one
// new entry starts showing up everywhere automatically instead of needing to be
// wired into each page by hand.

export interface Testimonial {
  author: string;
  subtitle: string;
  review: string;
  /** Link to the original review (e.g. a Google review share link). */
  href?: string;
  /** Avatar photo URL. Falls back to a gradient placeholder when omitted. */
  image?: string;
  /** Fallback gradient used when no photo is available. */
  color?: string;
}

export const testimonials: Testimonial[] = [
  {
    author: "Mr Haseeb",
    subtitle: "Satisfied Customer",
    review:
      "HKMC Refrigeration! It is a one-stop shop for both Genuine spare parts and Expert service. Knowledgeable sales person & professional technicians Highly recommend them for Best price's, Genuine parts and Honest service..! 👌",
    href: "https://share.google/asQUPBBBtmbw4uTgR",
    image: "/testimonials/customer-haseeb.png",
  },
  {
    author: "Ashoka M",
    subtitle: "HSR Layout",
    href: "https://maps.app.goo.gl/dYa2G2nNVjeCvhbe9",
    image: "/testimonials/customer-ashok.png",
    review:
      "All kind of washing machine and refrigerator spare parts is available here,  price is reasonable and highly recommended this Store.",
  },
  {
    author: "SHAIK ISRAR SHAZZ",
    subtitle: "Koramangala",
	image: "/testimonials/customer-SHAIK-ISRAR-SHAZZ.png",
    review:
      "Good products and the behavior of sales person . Actually everything is good I would suggest u buy here.",
    href: "https://share.google/CBBtzAMbofAOW3lrA",
  },
  {
    author: "Majoon-e- Keemya",
    subtitle: "BTM Layout",
	image: "/testimonials/customer-hamdun.png",
    review:
      "Very Good And Quick Response For Materials 👌👌",
    href: "https://share.google/7pjhZCreKVutJvAKy",
  },
  {
    author: "PRiNCE SALMAN",
    subtitle: "Hosa Road",
	image: "/testimonials/customer-prince-salman.png",
    review:
      "Good service value product best price",
    href: "https://share.google/Ra3n0a6UdDKMUD1ZK",
  },
  {
    author: "Only Shadab",
    subtitle: "Yarab Nagar",
	image: "/testimonials/customer-Only-Shadab.png",
    review:
      "Finding a good refrigeration shop is like finding a doctor for your appliances—and this shop is exactly that! They don’t just sell fridges, they actually understand cooling systems inside out. I walked in confused, but walked out confident with the right product and all my doubts cleared. Their service team is quick, polite, and knows how to fix problems without unnecessary delays. A place where you get both trust and technology under one roof. Definitely my go-to for anything refrigeration related.”❤️⚡️",
    href: "https://share.google/lr5HK7HMD3gWPwc9S",
  },
  //   // TODO: PLACEHOLDER — replace with a real Google/customer review. Author, subtitle,
  //   // review text and href/image should all be swapped for the real thing before this
  //   // goes public. Kept in code so the grid renders a full 3-up layout in the meantime.
  //   {
  //     author: "Priya S.",
  //     subtitle: "Koramangala",
  //     review:
  //       "Booked a fridge repair on a Sunday morning and had a technician at my door by noon. He explained what was wrong, showed me the part before replacing it, and the quote matched what I paid at the end. No drama.",
  //   },
  //   // TODO: PLACEHOLDER — replace with a real Google/customer review before going public.
  //   {
  //     author: "Rakesh M.",
  //     subtitle: "HSR Layout",
  //     review:
  //       "Our restaurant's cold room stopped cooling on a Friday evening — worst possible timing. HKMC's team was on-site inside two hours and had it running again the same night. That kind of response is why we've kept them on AMC.",
  //   },
];

function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Deterministically picks one testimonial based on a seed (typically the page path),
 * so different pages show different testimonials but each page stays stable across
 * rebuilds instead of reshuffling every deploy.
 */
export function getTestimonial(seed: string): Testimonial {
  return testimonials[hashSeed(seed) % testimonials.length];
}

/**
 * Picks up to `count` distinct testimonials for grid-style display, rotating through
 * the pool based on the seed. Returns fewer than `count` if the pool is smaller,
 * rather than repeating an entry.
 */
export function getTestimonials(seed: string, count: number): Testimonial[] {
  const length = Math.min(count, testimonials.length);
  const start = hashSeed(seed) % testimonials.length;
  return Array.from(
    { length },
    (_, i) => testimonials[(start + i) % testimonials.length],
  );
}
