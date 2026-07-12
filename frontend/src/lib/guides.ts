export type GuideSection = { heading: string; body: string };
export type GuideCategory = "panic" | "comparison" | "guide";

export type Guide = {
  slug: string;
  title: string;
  description: string;
  keywords: string;
  intro: string;
  sections: GuideSection[];
  ctaNote: string;
  category: GuideCategory;
};

export const guides: Guide[] = [
  {
    slug: "dangerous-lease-clauses",
    category: "panic",
    title: "Dangerous lease clauses to spot before you sign",
    description:
      "Open-ended deposits, extreme early-termination fees, one-sided rent hikes, and vague repair duties — what to watch for in a U.S. apartment lease.",
    keywords:
      "dangerous lease clauses, unfair rental agreement terms, what to check before signing a lease",
    intro:
      "Not every clause is “standard.” Some wording is common; some tilts risk heavily toward one party. Review these areas carefully before you commit.",
    sections: [
      {
        heading: "Open-ended security deposits",
        body: "If the amount, allowed deductions, or return timeline are vague, ask for a written list of permitted deductions and a clear return deadline after move-out.",
      },
      {
        heading: "Extreme early-termination fees",
        body: "Multi-month penalties with no path to a replacement tenant are a red flag. Look for notice rules, reletting cooperation, and whether fees drop as the term ends.",
      },
      {
        heading: "Tenant pays for all repairs",
        body: "Clauses that dump ordinary wear, structural issues, plumbing, or electrical onto the tenant are often one-sided. Clarify landlord vs tenant responsibility.",
      },
      {
        heading: "One-sided rent increases",
        body: "Language that lets rent rise “at landlord discretion” mid-term or at renewal without a formula or cap creates uncertainty. Prefer a defined maximum or index.",
      },
      {
        heading: "Immediate eviction for minor breaches",
        body: "Harsh default language for small delays can be used as leverage. Ask for written notice and a cure period before serious consequences.",
      },
    ],
    ctaNote: "Want these checked in your actual lease? Upload it for a $19.99 plain-English review.",
  },
  {
    slug: "security-deposit",
    category: "guide",
    title: "How to review a security deposit clause",
    description:
      "Understand deposit amounts, deductions, return timelines, and move-out conditions in U.S. residential leases.",
    keywords: "security deposit clause, apartment deposit return, rental deposit deductions",
    intro:
      "Deposit disputes are common at move-out. Clear wording up front saves money and stress later.",
    sections: [
      {
        heading: "Amount and due date",
        body: "Confirm the exact dollar amount, when it is due, and whether it can be increased during the term.",
      },
      {
        heading: "Permitted deductions",
        body: "Look for a concrete list: unpaid rent, documented damage beyond ordinary wear, unpaid fees. Vague “any damages” language invites disagreement.",
      },
      {
        heading: "Return timeline",
        body: "Many states set maximum return windows. Even when not required in the lease, a written deadline helps accountability.",
      },
      {
        heading: "Move-in documentation",
        body: "Photograph and inventory the unit on day one. Without a condition record, deposit deductions are harder to contest.",
      },
    ],
    ctaNote: "Upload your lease to highlight deposit and move-out wording in minutes.",
  },
  {
    slug: "early-termination",
    category: "panic",
    title: "What to check before ending a lease early",
    description:
      "Notice deadlines, early termination fees, replacement tenants, and mitigation duties in apartment leases.",
    keywords: "break lease early, early termination fee apartment, leave lease early costs",
    intro:
      "Jobs, relationships, and relocations change plans. A fair early-exit clause protects both sides; a harsh one can cost months of rent.",
    sections: [
      {
        heading: "Notice method and timing",
        body: "How many days’ notice? Email, certified mail, portal message? If the method is unclear, your notice may not “count.”",
      },
      {
        heading: "Replacement tenant",
        body: "Clauses that allow ending liability once a qualified replacement is approved are often fairer than a fixed multi-month fee alone.",
      },
      {
        heading: "Fee size and offsets",
        body: "Ask whether the fee decreases over time and whether you get credit if the unit is re-rented quickly.",
      },
      {
        heading: "Serious habitability issues",
        body: "If the unit becomes unlivable, check whether the lease allows exit after notice without the usual penalty — and talk to a local attorney for legal rights.",
      },
    ],
    ctaNote: "Not sure what your lease says about leaving early? Get a structured review for $19.99.",
  },
  {
    slug: "fees-and-charges",
    category: "guide",
    title: "Rental fees and charges to understand",
    description:
      "Spot amenity, utility, pet, parking, late, and admin fees that sit outside base rent in U.S. leases.",
    keywords: "apartment fees besides rent, rental junk fees, lease late fees utilities",
    intro:
      "The advertised rent is rarely the full monthly cost. Map every recurring and one-time charge before you sign.",
    sections: [
      {
        heading: "Recurring add-ons",
        body: "Utilities, trash, parking, pets, amenities, technology, and “community fees” can add hundreds per month.",
      },
      {
        heading: "Late fees and grace periods",
        body: "Note the grace period, fee amount or percentage, and whether fees stack daily.",
      },
      {
        heading: "Fee changes",
        body: "Can amenity or utility admin fees rise mid-lease? Prefer fixed amounts for the term when possible.",
      },
      {
        heading: "Refundable vs non-refundable",
        body: "Pet deposits, keys, and “admin” charges are often non-refundable. Confirm in writing.",
      },
    ],
    ctaNote: "Upload the lease to list fees and charges in plain English.",
  },
  {
    slug: "automatic-renewal",
    category: "guide",
    title: "Automatic renewal clauses explained",
    description:
      "What happens if you miss a renewal deadline, how rent can change, and how to decline renewal in writing.",
    keywords: "automatic lease renewal, month to month conversion, lease renewal deadline",
    intro:
      "Many leases convert to month-to-month or renew for another term if you miss a notice window. Calendar that date early.",
    sections: [
      {
        heading: "Opt-out deadline",
        body: "Find the exact day you must decline renewal and the required delivery method.",
      },
      {
        heading: "What renews",
        body: "Does renewal keep the same term length and rent, or can terms change? Ask for any renewal offer in writing.",
      },
      {
        heading: "Proof of notice",
        body: "Keep copies of emails, portal receipts, or certified-mail proof when you decline renewal.",
      },
    ],
    ctaNote: "We flag renewal deadlines and related wording in your review.",
  },
  {
    slug: "lawyer-vs-lease-review",
    category: "comparison",
    title: "Lawyer review vs a $19.99 lease review",
    description:
      "When an AI lease summary helps, when you still need a licensed attorney, and how the two can work together.",
    keywords: "lease review vs lawyer, do I need a lawyer for a lease, cheap lease review",
    intro:
      "A structured informational review helps you see fees, deadlines, and one-sided wording quickly. It is not a substitute for legal advice on your rights.",
    sections: [
      {
        heading: "What a $19.99 review is good for",
        body: "Spotting deposit, fee, renewal, guest, pet, and early-exit language; preparing questions for a landlord or attorney.",
      },
      {
        heading: "When to hire an attorney",
        body: "Eviction risk, discrimination concerns, complex roommate disputes, unusual commercial-style clauses, or anything requiring legal advice.",
      },
      {
        heading: "A practical combo",
        body: "Many renters use a quick review first, then bring specific flagged clauses to a local housing attorney if needed.",
      },
    ],
    ctaNote: "Start with a clear summary of your lease, then decide if legal counsel is next.",
  },
  {
    slug: "roommates-and-subletting",
    category: "guide",
    title: "Roommates, guarantors, and subletting clauses",
    description:
      "Joint liability, guest limits, sublease approval, and guarantor language common in student and shared apartments.",
    keywords: "roommate lease liability, subletting apartment lease, guarantor lease clause",
    intro:
      "Shared housing multiplies risk. Know whether you are jointly liable for the whole rent and what happens if a roommate leaves.",
    sections: [
      {
        heading: "Joint and several liability",
        body: "If everyone is jointly liable, the landlord may pursue any roommate for the full rent. Plan agreements among yourselves separately.",
      },
      {
        heading: "Subletting rules",
        body: "Many leases ban sublets or require written approval. Unauthorized sublets can trigger default.",
      },
      {
        heading: "Guarantors and cosigners",
        body: "Confirm the guarantor’s maximum exposure, duration, and whether liability ends when the lease ends.",
      },
      {
        heading: "Guest and occupancy limits",
        body: "Overnight guest caps and occupancy formulas can affect partners or visiting family. Clarify before signing.",
      },
    ],
    ctaNote: "Especially useful for students and shared apartments — upload the lease before you cosign.",
  },
  {
    slug: "move-in-move-out",
    category: "guide",
    title: "Move-in and move-out condition checklists",
    description:
      "How condition reports, photos, and cleaning standards affect deposit returns and end-of-lease disputes.",
    keywords: "move in checklist apartment, move out lease requirements, apartment condition report",
    intro:
      "Most deposit fights start with missing documentation. Treat move-in day like evidence collection.",
    sections: [
      {
        heading: "Day-one photos and video",
        body: "Capture every room, appliances, flooring, walls, and existing damage with timestamps.",
      },
      {
        heading: "Written condition report",
        body: "If the landlord provides a form, complete it thoroughly. If not, email your own list and keep a copy.",
      },
      {
        heading: "Move-out standards",
        body: "Leases often require professional cleaning, carpet cleaning, or specific paint conditions. Budget for them.",
      },
      {
        heading: "Keys and access devices",
        body: "Note fees for unreturned keys, fobs, and garage remotes — they are easy to miss.",
      },
    ],
    ctaNote: "Your lease review highlights move-out and deposit language so you can prepare early.",
  },
  {
    slug: "rent-increases",
    category: "guide",
    title: "Rent increases and renewal pricing",
    description:
      "How leases handle mid-term increases, renewal offers, and notice requirements in U.S. rentals.",
    keywords: "apartment rent increase lease, renewal rent hike, mid lease rent raise",
    intro:
      "Some cities regulate increases; many do not. The lease still controls notice and timing for your specific agreement.",
    sections: [
      {
        heading: "During the fixed term",
        body: "Fixed-term leases usually lock rent unless a specific increase clause exists. Read that clause carefully.",
      },
      {
        heading: "At renewal",
        body: "Ask how far in advance renewal pricing is provided and whether you can decline without penalty.",
      },
      {
        heading: "Local rules",
        body: "Rent control and just-cause protections vary widely. Treat local law as a separate check from the lease text.",
      },
    ],
    ctaNote: "Upload your lease to see how increases and renewals are worded.",
  },
  {
    slug: "maintenance-and-repairs",
    category: "guide",
    title: "Maintenance and repair responsibilities",
    description:
      "Ordinary wear vs tenant damage, response times, and who pays for plumbing, HVAC, and appliances.",
    keywords: "who pays apartment repairs, lease maintenance clause, landlord repair responsibilities",
    intro:
      "Ambiguous repair clauses create conflict. Clear allocation and reporting timelines help both parties.",
    sections: [
      {
        heading: "Ordinary wear vs damage",
        body: "Normal use wear should not be billed as tenant damage. Negligence and misuse typically are.",
      },
      {
        heading: "Systems and structure",
        body: "Plumbing, electrical, roofing, and aging HVAC are often landlord responsibilities unless tenant-caused.",
      },
      {
        heading: "Reporting deadlines",
        body: "Report issues promptly in writing. Delayed notice can complicate mold, leak, or appliance claims.",
      },
    ],
    ctaNote: "We highlight repair and maintenance wording in your structured review.",
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
