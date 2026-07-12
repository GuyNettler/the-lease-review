export type City = {
  slug: string;
  name: string;
  state: string;
  region: string;
  description: string;
  localNotes: string[];
  keywords: string;
};

export const cities: City[] = [
  {
    slug: "new-york",
    name: "New York",
    state: "New York",
    region: "Northeast",
    description:
      "Lease review guidance for New York City and New York State renters reviewing apartment agreements before signing.",
    localNotes: [
      "Deposits, fees, and renewal practices can vary by building type and borough.",
      "Watch for broker fees, amenity charges, and strict guest or roommate rules.",
      "Rent-stabilized and market-rate leases can look very different — read the specific form you are given.",
    ],
    keywords: "New York lease review, NYC apartment lease check, review lease before signing NYC",
  },
  {
    slug: "los-angeles",
    name: "Los Angeles",
    state: "California",
    region: "West",
    description:
      "Lease review guidance for Los Angeles renters focused on deposits, fees, and just-cause related lease language.",
    localNotes: [
      "California leases often include detailed disclosures — do not skip attachments.",
      "Look carefully at parking, utilities, and pet addenda common in LA buildings.",
      "Local ordinances may affect notices and rent increases beyond the lease text.",
    ],
    keywords: "Los Angeles lease review, LA apartment lease, California rental agreement review",
  },
  {
    slug: "chicago",
    name: "Chicago",
    state: "Illinois",
    region: "Midwest",
    description:
      "Lease review guidance for Chicago renters, including deposits, heating, and multi-unit building addenda.",
    localNotes: [
      "Confirm who pays heat, water, and trash in older walk-ups versus newer buildings.",
      "Security deposit handling and move-out deductions deserve close reading.",
      "Roommate and guarantor forms are common for shared apartments near campuses.",
    ],
    keywords: "Chicago lease review, Illinois apartment lease, review rental contract Chicago",
  },
  {
    slug: "austin",
    name: "Austin",
    state: "Texas",
    region: "South",
    description:
      "Lease review guidance for Austin renters, including early termination, pets, and amenity fees.",
    localNotes: [
      "Many Austin communities use long TAA-style forms with multiple addenda.",
      "Check pet, parking, and technology fees that sit outside base rent.",
      "Early termination and reletting fees are worth reviewing before you sign.",
    ],
    keywords: "Austin lease review, Texas apartment lease, Austin rental agreement check",
  },
  {
    slug: "seattle",
    name: "Seattle",
    state: "Washington",
    region: "West",
    description:
      "Lease review guidance for Seattle renters covering deposits, fees, and move-out standards.",
    localNotes: [
      "Fee transparency and move-in costs can be significant in Seattle buildings.",
      "Review parking, storage, and utility billing carefully.",
      "Document unit condition thoroughly in rainy climates where moisture issues appear.",
    ],
    keywords: "Seattle lease review, Washington apartment lease, Seattle rental agreement",
  },
  {
    slug: "denver",
    name: "Denver",
    state: "Colorado",
    region: "Mountain West",
    description:
      "Lease review guidance for Denver renters focused on fees, pets, and renewal timing.",
    localNotes: [
      "Amenity and pet rent add-ons are common in newer Denver communities.",
      "Calendar automatic renewal deadlines early.",
      "Ask how HVAC filter changes and balcony rules are allocated.",
    ],
    keywords: "Denver lease review, Colorado apartment lease, Denver rental contract review",
  },
  {
    slug: "miami",
    name: "Miami",
    state: "Florida",
    region: "South",
    description:
      "Lease review guidance for Miami renters, including condo rules, insurance, and hurricane-related clauses.",
    localNotes: [
      "Condo and HOA rules may sit alongside the lease — read both.",
      "Confirm renter’s insurance requirements and liability limits.",
      "Look for hurricane shutter, balcony, and amenity access rules.",
    ],
    keywords: "Miami lease review, Florida apartment lease, Miami rental agreement check",
  },
  {
    slug: "boston",
    name: "Boston",
    state: "Massachusetts",
    region: "Northeast",
    description:
      "Lease review guidance for Boston renters, including student housing, deposits, and September move cycles.",
    localNotes: [
      "Student and September leases often include guarantor and roommate complexity.",
      "Broker fees and last-month rent practices vary — map total move-in cash.",
      "Heat and snow-related responsibilities should be explicit in older buildings.",
    ],
    keywords: "Boston lease review, Massachusetts apartment lease, Boston student lease review",
  },
  {
    slug: "san-francisco",
    name: "San Francisco",
    state: "California",
    region: "West",
    description:
      "Lease review guidance for San Francisco renters reviewing deposits, roommates, and local ordinance interplay.",
    localNotes: [
      "Local tenant protections may interact with lease language — verify locally.",
      "Roommate additions and subletting often need written approval.",
      "Parking and storage can be separate licenses with their own fees.",
    ],
    keywords: "San Francisco lease review, SF apartment lease, Bay Area rental agreement",
  },
  {
    slug: "philadelphia",
    name: "Philadelphia",
    state: "Pennsylvania",
    region: "Northeast",
    description:
      "Lease review guidance for Philadelphia renters covering deposits, utilities, and row-home specifics.",
    localNotes: [
      "Utility responsibility in converted homes should be crystal clear.",
      "Watch lead, habitability disclosures, and condition reports.",
      "Early termination fees appear frequently in shorter student-oriented leases.",
    ],
    keywords: "Philadelphia lease review, Philly apartment lease, Pennsylvania rental review",
  },
  {
    slug: "atlanta",
    name: "Atlanta",
    state: "Georgia",
    region: "South",
    description:
      "Lease review guidance for Atlanta renters focused on amenity fees, pets, and gated-community rules.",
    localNotes: [
      "Large apartment communities often stack amenity and trash fees.",
      "Gate remotes, parking stickers, and package locker fees add cost.",
      "Review pest-control and balcony grilling rules before move-in.",
    ],
    keywords: "Atlanta lease review, Georgia apartment lease, Atlanta rental agreement",
  },
  {
    slug: "dallas",
    name: "Dallas",
    state: "Texas",
    region: "South",
    description:
      "Lease review guidance for Dallas–Fort Worth renters, including TAA-style forms and reletting fees.",
    localNotes: [
      "Texas Association of Realtors / apartment forms can be lengthy — read addenda.",
      "Reletting and reletting charges deserve careful attention.",
      "Confirm who maintains HVAC filters and who pays for service calls.",
    ],
    keywords: "Dallas lease review, DFW apartment lease, Texas rental contract review",
  },
];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
