// Language-independent data taken from the current terravolcano.com site.
// Translated texts live in ./i18n.ts.

export const BOOKING_URL = "https://terravolcano.com/tours/";
export const tourUrl = (id: number) => `${BOOKING_URL}?tt-tour=${id}`;
export const whatsappUrl = (message: string) => `https://wa.me/56983388317?text=${encodeURIComponent(message)}`;

const WP = "https://terravolcano.com/wp-content/uploads/2026/09";
const WP_AUG = "https://terravolcano.com/wp-content/uploads/2026/08";

export const images = {
  summit: `${WP}/climbers-villarica-volcano-summit-overlay-40-1920x1080-1.jpg`,
  sliding: `${WP}/tourist-happy-sliding-snow-volcano-overlay-40-1920x1080-1.jpg`,
  flag: `${WP}/climbers-snow-mountain-flag-chile-800x800-1.jpg`,
  tripadvisor: `${WP}/rated-no-1-tripadvisor-800x800-1.jpg`,
  logoWhite: `${WP}/terra-volcano-white-191-50.png`,
};

// Recognition logos as used on terravolcano.com (250×130 JPGs on white).
export const awardLogos = {
  lemu: `${WP_AUG}/cooperativa-lemu-250x130-1.jpg`,
  sustainable: `${WP_AUG}/sello-s-250x130-1.jpg`,
  tripadvisor: `${WP_AUG}/tripadvisor-travelers-choice-award-2024-250x130-1.jpg`,
  chile: `${WP_AUG}/marca-chile-250x130-1.jpg`,
};

// TourTask ids, durations and "from" group prices (CLP per person) as listed on terravolcano.com/tours.
export const tourData = [
  { id: 1660, kind: "ascent", hours: 8, priceFrom: 150000 },
  { id: 1661, kind: "ascent", hours: 11, priceFrom: 170000 },
  { id: 1658, kind: "ascent", days: 2, priceFrom: 320000 },
  { id: 1659, kind: "ascent", hours: 13, priceFrom: 220000 },
  { id: 1803, kind: "ski", hours: 10, priceFrom: 240000 },
  { id: 1805, kind: "ski", hours: 10, priceFrom: 270000 },
  { id: 1812, kind: "ski", hours: 15, priceFrom: 390000 },
] as const;

export const tourImage = (id: number) => `https://media.tourtask.com/uploads/tv/tours/tour-${id}-main-750.jpg`;

export const contact = {
  address: ["Av. Bernardo O'Higgins 717, Local 4", "Boulevard Patagonia, Pucón, Chile"],
  phone: "+56 9 8338 8317",
  instagram: "https://www.instagram.com/terravolcano_pucon",
  facebook: "https://www.facebook.com/puconterravolcano/",
  tripadvisor:
    "https://www.tripadvisor.cl/Attraction_Review-g294297-d19396299-Reviews-Terra_Volcano_Pucon-Pucon_Araucania_Region.html",
};

// Altitude reached at each step of the Villarrica ascent, in metres.
// DRAFT: base and glacier altitudes are approximate; the summit (2,847 m) is stated on the tour page.
export const climbAltitudes = [230, 1400, 2300, 2847] as const;
