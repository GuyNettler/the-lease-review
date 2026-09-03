export type CityFaq = { q: string; a: string };
export type CitySection = { heading: string; body: string };

export type City = {
  slug: string;
  name: string;
  state: string;
  region: string;
  description: string;
  localNotes: string[];
  keywords: string;
  faqs: CityFaq[];
  sections?: CitySection[];
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
      "Confirm how notice must be delivered (portal, email, certified mail) before you rely on a verbal conversation.",
    ],
    keywords:
      "New York lease review, NYC apartment lease check, review lease before signing NYC, Manhattan Brooklyn lease review",
    faqs: [
      {
        q: "Should NYC renters review broker and amenity fees separately from rent?",
        a: "Yes. Total monthly cost often includes amenity, trash, and parking fees that sit outside base rent. Map every recurring charge before you sign.",
      },
      {
        q: "Do rent-stabilized leases need a different review focus?",
        a: "They can. Forms, riders, and renewal rules may differ from market-rate leases — read the exact packet you receive, including addenda.",
      },
    ],
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
      "Confirm who pays for water, trash, and HOA or building assessments if any.",
    ],
    keywords:
      "Los Angeles lease review, LA apartment lease, California rental agreement review, review lease before signing LA",
    faqs: [
      {
        q: "What should LA renters check in parking and pet addenda?",
        a: "Assigned spaces, guest parking, pet rent, deposits, and breed or weight limits are often separate from the main lease — treat them as part of the deal.",
      },
      {
        q: "Are disclosures part of the lease review?",
        a: "Yes. California packets can include multiple disclosures. Skip none of them before you sign.",
      },
    ],
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
      "Ask how radiator or boiler issues are handled in winter leases.",
    ],
    keywords:
      "Chicago lease review, Illinois apartment lease, review rental contract Chicago, Chicago security deposit lease",
    faqs: [
      {
        q: "Why do Chicago leases emphasize heat and utilities?",
        a: "Older buildings often allocate heat differently than newer ones. Clarify who pays and who maintains systems before winter arrives.",
      },
      {
        q: "Are guarantor forms common for Chicago students?",
        a: "Yes, especially near campuses. Review guarantor scope, amount, and duration alongside the primary lease.",
      },
    ],
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
      "Map total move-in cash: deposit, pet fees, admin fees, and first month.",
    ],
    keywords:
      "Austin lease review, Texas apartment lease, Austin rental agreement check, TAA lease review Austin",
    faqs: [
      {
        q: "What is special about Austin apartment forms?",
        a: "Many communities use lengthy Texas Association of Realtors / apartment industry forms. Read every addendum — fees often live there.",
      },
      {
        q: "Should I focus on reletting language?",
        a: "Yes. Early exit and reletting charges can be significant. Know the notice rules and fee structure before you commit.",
      },
    ],
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
      "Confirm package locker, gym, and amenity access rules if marketed as included.",
    ],
    keywords:
      "Seattle lease review, Washington apartment lease, Seattle rental agreement, review lease Seattle WA",
    faqs: [
      {
        q: "Why document condition carefully in Seattle?",
        a: "Moisture and wear issues can be disputed at move-out. Photos and a move-in checklist protect both sides.",
      },
      {
        q: "What fees commonly surprise Seattle renters?",
        a: "Parking, storage, utility billing admin fees, and amenity charges often sit outside advertised rent.",
      },
    ],
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
      "Confirm snow, parking, and storage responsibilities in winter months.",
    ],
    keywords:
      "Denver lease review, Colorado apartment lease, Denver rental contract review, review lease before signing Denver",
    faqs: [
      {
        q: "Do Denver leases often auto-renew?",
        a: "Many do. Find the notice deadline to decline renewal so you are not locked in unexpectedly.",
      },
      {
        q: "What add-ons should Denver renters expect?",
        a: "Pet rent, amenity fees, parking, and trash fees frequently appear in newer communities.",
      },
    ],
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
      "Ask whether storm-related access limits or special assessments can affect tenants.",
    ],
    keywords:
      "Miami lease review, Florida apartment lease, Miami rental agreement check, condo lease review Miami",
    faqs: [
      {
        q: "Why review condo docs with a Miami lease?",
        a: "Building rules on balconies, guests, and insurance can bind you even if they are not repeated in the lease summary.",
      },
      {
        q: "Is renter’s insurance usually required?",
        a: "Often yes. Confirm minimum liability limits and proof deadlines before move-in.",
      },
    ],
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
      "Confirm whether last month’s rent is collected upfront and how it is applied.",
    ],
    keywords:
      "Boston lease review, Massachusetts apartment lease, Boston student lease review, September lease Boston",
    faqs: [
      {
        q: "What is unique about Boston September leases?",
        a: "Student-heavy cycles often mean roommate schedules, guarantors, and tight move-in windows. Read joint-and-several liability language carefully.",
      },
      {
        q: "Should Boston renters budget broker and last-month costs?",
        a: "Yes. Move-in cash can include broker fees and last month’s rent in addition to security deposit and first month.",
      },
    ],
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
      "Confirm how rent increases and notices are described in your specific form.",
    ],
    keywords:
      "San Francisco lease review, SF apartment lease, Bay Area rental agreement, review lease San Francisco",
    faqs: [
      {
        q: "Can SF roommate rules block adding an occupant later?",
        a: "Often yes without written approval. Check occupancy limits and guest rules before you plan on a roommate.",
      },
      {
        q: "Are parking and storage always part of the lease?",
        a: "Not always. They may be separate licenses with different fees and termination rules.",
      },
    ],
  },
  {
    slug: "philadelphia",
    name: "Philadelphia",
    state: "Pennsylvania",
    region: "Northeast",
    description:
      "Philadelphia lease review for renters: deposits, utilities, row homes, student leases, and fee stacks common in Philly apartments before you sign.",
    localNotes: [
      "Utility responsibility in converted homes should be crystal clear.",
      "Watch lead, habitability disclosures, and condition reports.",
      "Early termination fees appear frequently in shorter student-oriented leases.",
      "In multi-unit row homes, confirm who pays for shared systems and trash.",
      "Ask whether basement, porch, or yard access is included or restricted.",
      "Map total monthly cost: rent plus trash, parking, pet, and amenity fees common in Philly listings.",
      "University City and Temple-area leases often stack guarantor and roommate liability — read joint-and-several language.",
    ],
    keywords:
      "Philadelphia lease review, Philly apartment lease, Pennsylvania rental review, review lease before signing Philadelphia, Philly row home lease, Philadelphia security deposit lease",
    sections: [
      {
        heading: "What Philly renters should check first",
        body: "Start with total cost (rent + fees), deposit rules, renewal notice windows, and early-exit fees. Then check utilities in converted row homes, lead/habitability disclosures, and whether basement or porch access is included. Photograph the unit on move-in day — older Philly housing stock makes deposit disputes common without a condition record.",
      },
      {
        heading: "Student and short-term Philly leases",
        body: "Near campuses, leases may be 9–12 months with guarantors, roommate schedules, and steep break fees. Confirm who remains liable if a roommate leaves mid-term and how notice must be delivered.",
      },
    ],
    faqs: [
      {
        q: "What should Philly renters check in converted row homes?",
        a: "Utility metering, heat allocation, shared laundry, and basement or porch access are often ambiguous — get them in writing.",
      },
      {
        q: "Are student leases in Philadelphia different?",
        a: "They can be shorter and heavier on early-exit fees, guarantors, and roommate liability. Read those clauses before you sign.",
      },
      {
        q: "Why document unit condition in Philadelphia?",
        a: "Older housing stock can have pre-existing issues. A move-in checklist and photos help with deposit disputes later.",
      },
      {
        q: "How do I get a Philadelphia lease agreement checked quickly?",
        a: "Use a checklist for fees, deposit, renewals, and early exit, then upload the PDF for a structured plain-English pass if you want the document checked line by line.",
      },
    ],
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
      "Confirm valet trash and amenity access if marketed in the listing.",
    ],
    keywords:
      "Atlanta lease review, Georgia apartment lease, Atlanta rental agreement, gated community lease Atlanta",
    faqs: [
      {
        q: "What fees are common in Atlanta apartment communities?",
        a: "Amenity, trash/valet, parking, pet, and tech fees often stack on top of rent. Total the monthly bill, not just base rent.",
      },
      {
        q: "Do gate and package rules matter?",
        a: "Yes. Lost remotes, guest entry rules, and locker fees can create unexpected costs.",
      },
    ],
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
      "Map pet and parking fees across DFW communities before comparing listings.",
    ],
    keywords:
      "Dallas lease review, DFW apartment lease, Texas rental contract review, Fort Worth lease review",
    faqs: [
      {
        q: "Why are DFW leases so long?",
        a: "Industry forms plus multiple addenda are common. Fees and rules often live in attachments, not the first page.",
      },
      {
        q: "What is reletting?",
        a: "Language about finding a new tenant and related fees if you leave early. Understand notice, cooperation, and cost before you sign.",
      },
    ],
  },
  {
    slug: "houston",
    name: "Houston",
    state: "Texas",
    region: "South",
    description:
      "Lease review guidance for Houston renters covering flood-related disclosures, fees, and early termination.",
    localNotes: [
      "Ask about flood history, insurance requirements, and who pays for water intrusion cleanup.",
      "Amenity, trash, and pest fees are common in large Houston communities.",
      "Confirm HVAC filter duties and after-hours maintenance charges.",
      "Read early termination and reletting addenda before hurricane or job-relocation season planning.",
    ],
    keywords:
      "Houston lease review, Houston apartment lease, Texas rental agreement Houston, review lease before signing Houston",
    faqs: [
      {
        q: "Should Houston renters ask about flood risk in the lease packet?",
        a: "Yes. Ask what disclosures apply, what insurance is required, and how water damage responsibility is allocated.",
      },
      {
        q: "What fees should Houston renters total before signing?",
        a: "Trash, amenity, pest, parking, and admin fees often sit outside advertised rent.",
      },
    ],
  },
  {
    slug: "phoenix",
    name: "Phoenix",
    state: "Arizona",
    region: "Southwest",
    description:
      "Lease review guidance for Phoenix renters focused on utilities, A/C, pools, and community rules.",
    localNotes: [
      "Confirm who pays for electricity during peak A/C months and how utility billing works.",
      "Pool, gate, and HOA-style community rules may sit in addenda.",
      "Pet and parking fees are common in Phoenix multifamily communities.",
      "Document A/C performance at move-in — cooling issues become deposit disputes later.",
    ],
    keywords:
      "Phoenix lease review, Arizona apartment lease, Phoenix rental agreement, review lease Phoenix AZ",
    faqs: [
      {
        q: "Why check A/C language in Phoenix leases?",
        a: "Cooling is essential. Clarify maintenance response times and who pays for repairs versus filter changes.",
      },
      {
        q: "Are community rules part of the lease?",
        a: "Often yes via addenda. Pool hours, parking, and guest rules can affect day-to-day living.",
      },
    ],
  },
  {
    slug: "washington-dc",
    name: "Washington, D.C.",
    state: "District of Columbia",
    region: "Mid-Atlantic",
    description:
      "Washington, D.C. lease review for renters: deposits, parking and amenity fees, condo/co-op house rules, and notice windows before you sign.",
    localNotes: [
      "Condo and co-op house rules may limit guests, renovations, and pets beyond the lease.",
      "Map parking, storage, and amenity fees common in D.C. buildings.",
      "Confirm notice methods for renewal and rent changes.",
      "Ask whether utilities are separately metered or allocated by building formula.",
      "Move-in cash due (deposit + first month + fees) often exceeds what the listing highlighted.",
      "Read any guest, short-term sublet, and package-room rules attached as addenda.",
    ],
    keywords:
      "Washington DC lease review, DC apartment lease, District of Columbia rental agreement, review lease before signing DC, DC condo lease rules, DC parking lease fee",
    sections: [
      {
        heading: "Condo and co-op rules in D.C. leases",
        body: "Many D.C. rentals sit inside condo or co-op buildings. The lease may look fine while the house rules restrict pets, guests, renovations, flooring, or short-term visitors. Ask for the governing docs (or a summary of restrictions) with the lease, and confirm which rules are incorporated by reference.",
      },
      {
        heading: "Fees, parking, and move-in costs",
        body: "List every recurring charge: parking, storage, amenity, trash, and tech fees. Then total cash due at signing. D.C. buildings frequently separate parking licenses from the apartment lease — different termination rules can leave you paying for a space you no longer need.",
      },
      {
        heading: "Notice, renewals, and rent changes",
        body: "Confirm how renewal and rent-change notices must be delivered (email, portal, certified mail) and the exact day-count windows. Vague “management may increase rent upon renewal” language should be pinned to a written notice period before you rely on verbal assurances.",
      },
      {
        heading: "Security deposits and move-out documentation",
        body: "Before signing, ask how the deposit is held, what deductions are claimed most often, and what move-out cleaning or patching standards the building expects. In D.C. apartments with elevators, loading docks, or managed move windows, small rule violations can turn into extra charges if the lease and building packet are vague.",
      },
      {
        heading: "Rent control, addenda, and building packets",
        body: "Some D.C. renters receive a short lease plus a long packet of building rules, utility disclosures, and optional addenda. Treat the packet as part of the deal. If the building mentions rent-control status, condo rules, or separate parking documents, read those before you rely on a summary from a broker or leasing agent.",
      },
    ],
    faqs: [
      {
        q: "Do D.C. condo rules override what a listing promised?",
        a: "Building rules can restrict pets, guests, and renovations. Read condo docs with the lease.",
      },
      {
        q: "What move-in costs surprise D.C. renters?",
        a: "Parking, storage, amenity fees, and deposits can push cash due at signing well above first month’s rent.",
      },
      {
        q: "Is parking usually part of a D.C. apartment lease?",
        a: "Often it is a separate license or addendum with its own fee and end date. Confirm assignment, guest parking, and what happens if you move out early.",
      },
      {
        q: "What should I check about utilities in Washington, D.C.?",
        a: "Ask whether electric, gas, water, and trash are separately metered or allocated by the building. Allocation formulas should be described in writing.",
      },
      {
        q: "What move-out costs catch D.C. renters off guard?",
        a: "Cleaning, wall patching, elevator reservations, parking access devices, and loading-dock rules can all affect move-out cost. Read both the lease and any building packet for those details.",
      },
    ],
  },
  {
    slug: "san-diego",
    name: "San Diego",
    state: "California",
    region: "West",
    description:
      "Lease review guidance for San Diego renters covering deposits, parking, and coastal or military relocation timelines.",
    localNotes: [
      "Parking and storage are scarce near the coast — confirm assignments in writing.",
      "Military and relocation clauses matter if orders can change mid-lease.",
      "Review mold, moisture, and balcony rules in older coastal buildings.",
      "California disclosures still apply — do not skip attachments.",
    ],
    keywords:
      "San Diego lease review, San Diego apartment lease, California rental agreement San Diego, military lease San Diego",
    faqs: [
      {
        q: "Should San Diego renters confirm parking in the lease?",
        a: "Yes. Street parking pressure is high in many neighborhoods. Get space number, guest rules, and fees in writing.",
      },
      {
        q: "What if I may relocate mid-lease?",
        a: "Look for early termination, military, or job-relocation language before you sign a 12-month term.",
      },
    ],
  },
  {
    slug: "nashville",
    name: "Nashville",
    state: "Tennessee",
    region: "South",
    description:
      "Lease review guidance for Nashville renters focused on amenity fees, pets, and short-term guest rules.",
    localNotes: [
      "Newer communities often stack amenity, trash, and tech fees.",
      "Pet rent and breed restrictions are common — read the pet addendum.",
      "Guest and short-term occupancy rules can be strict in tourist-heavy areas.",
      "Confirm parking and tow policies before move-in day.",
    ],
    keywords:
      "Nashville lease review, Tennessee apartment lease, Nashville rental agreement, review lease before signing Nashville",
    faqs: [
      {
        q: "What fees are common in Nashville apartments?",
        a: "Amenity, trash, tech/admin, parking, and pet fees frequently appear on top of rent.",
      },
      {
        q: "Why check guest rules in Nashville?",
        a: "Some leases limit overnight guests or short stays tightly. Clarify before friends or family visit regularly.",
      },
    ],
  },
];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
