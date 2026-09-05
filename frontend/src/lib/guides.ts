export type GuideSection = { heading: string; body: string };
export type GuideCategory = "panic" | "comparison" | "guide";
export type GuideFaq = { q: string; a: string };

export type Guide = {
  slug: string;
  title: string;
  description: string;
  keywords: string;
  intro: string;
  sections: GuideSection[];
  ctaNote: string;
  category: GuideCategory;
  faqs?: GuideFaq[];
};

export const guides: Guide[] = [
  {
    slug: "how-to-review-a-lease-agreement",
    category: "guide",
    title: "How to Review a Lease Agreement Before Signing",
    description:
      "How to review a lease agreement step by step — and how to read a lease before you sign: rent, fees, deposits, renewals, early termination, repairs, and red flags in a U.S. apartment lease.",
    keywords:
      "how to review a lease agreement, how to review a lease agreement before signing, how to read a lease agreement, how to read a lease, how to review a lease, review lease agreement step by step, how to check a rental lease, what to look for in a lease",
    intro:
      "How to review a lease agreement before signing is a skill every renter needs. Apartment leases are long, fees hide in addenda, and one missed notice window can lock you into another year. Follow this step-by-step order, write down questions, then raise them with the landlord — or upload the PDF for a plain-English structured pass. Prefer a free look at the report format first? Open the sample demo.",
    sections: [
      {
        heading: "How to read a lease agreement (before you dig in)",
        body: "Learning how to read a lease agreement starts with structure, not every sentence on page one. First pass: find the parties, address, term dates, rent amount, and signature pages. Second pass: highlight every dollar amount, deadline, and “tenant shall” duty. Third pass: read addenda and anything about deposits, renewals, early exit, and repairs. Mark unclear lines in the margin and turn them into written questions — that is how to read a lease without getting lost in legalese.",
      },
      {
        heading: "How to read a lease agreement step by step",
        body: "If you searched “how to read a lease agreement” or “how to read a lease,” use this simple order: names and address first, dates second, every fee third, deposit rules fourth, renewal notice fifth, early termination sixth, repairs and entry seventh, then every addendum. Reading in that order keeps you from spending 20 minutes on boilerplate before you identify the clauses that actually affect money and flexibility.",
      },
      {
        heading: "What reviewing a lease actually means",
        body: "A lease review is not about memorizing legal jargon. It means checking (1) what you pay every month and at move-in, (2) how you can leave or renew, (3) who is responsible for repairs and damages, and (4) whether any clause is vague enough to surprise you later. Skim for structure first, then re-read money and exit sections carefully. When people search how to review a lease agreement, this is the checklist they need.",
      },
      {
        heading: "1. Confirm parties, address, and term",
        body: "Match every tenant name, the exact unit address, start and end dates, and whether the term auto-renews. Wrong address or missing roommate names create headaches at move-out and for deposits. Confirm who signs for the landlord (owner, management company, or agent) and where notices must be sent.",
      },
      {
        heading: "2. Calculate total monthly cost, not just base rent",
        body: "List base rent plus amenity, trash/valet, parking, pet, technology, utility admin, and community fees. Add them up and compare to the listing. Ask which fees can increase mid-lease. This step alone answers most what-will-I-actually-pay questions when you review a lease agreement.",
      },
      {
        heading: "3. Security deposit and move-out rules",
        body: "Note the deposit amount, due date, allowed deductions, return timeline, and cleaning or repainting standards. Vague any-damages language is a red flag — ask for a written list of permitted deductions and a clear deadline after you return keys. Photograph the unit on move-in day.",
      },
      {
        heading: "4. Renewals and notice windows",
        body: "Find the deadline and method (email, portal, certified mail) to decline renewal or give notice. Missing a window can auto-renew you into another term at a new rent. Calendar the date the day you sign.",
      },
      {
        heading: "5. Early termination and reletting",
        body: "If plans change, what do you owe? Look for flat buyout fees, months of rent, and whether you can propose a replacement tenant. Prefer language that ends or reduces liability once the unit is re-rented. Extreme multi-month penalties with no reletting path are worth negotiating.",
      },
      {
        heading: "6. Repairs, entry, guests, and pets",
        body: "Who fixes plumbing, appliances, HVAC, and pest issues? How much notice before landlord entry? Occupancy limits and guest rules matter for roommates. Pet deposits, pet rent, and breed or weight limits should be explicit — oral promises do not count.",
      },
      {
        heading: "7. Read every addendum and disclosure",
        body: "Parking licenses, HOA/condo rules, lead paint, mold, insurance requirements, and utility billing addenda often sit outside the main form. The lease you reviewed is incomplete until every attachment is checked. Initial only after you have the full packet.",
      },
      {
        heading: "Red flags to pause on",
        body: "Open-ended fees, rent increases at landlord discretion mid-term, one-sided repair dumps onto the tenant, immediate default for minor delays with no cure period, and deposit return language with no timeline. Write questions down and ask for revised wording before signing.",
      },
      {
        heading: "A simple review checklist order",
        body: "Parties and dates → all-in monthly cost → deposit and move-out → renewal notice → early exit → repairs/entry/pets → addenda → red flags. If anything is unclear, do not rely on a verbal answer from the leasing agent — get it in the lease or an email addendum.",
      },
      {
        heading: "DIY review vs uploading for a structured pass",
        body: "You can review a lease agreement yourself with the steps above. If the PDF is long, you are short on time, or you want a plain-English pass over fees and risk areas, upload the file for a one-time structured review — then still use your questions with the landlord or an attorney for local legal advice.",
      },
    ],
    faqs: [
      {
        q: "How do I review a lease agreement before signing?",
        a: "Confirm parties, address, and dates; add up all monthly fees; check deposit and move-out rules; calendar renewal notice windows; read early-termination terms; note repairs, entry, and pets; then read every addendum. Write questions down and get answers in writing before you sign.",
      },
      {
        q: "How do I read a lease agreement without missing fees?",
        a: "Do three passes: structure (who, where, when), money (every dollar and deadline), then risk (renewals, exit, repairs, addenda). Highlight fees that sit outside base rent — amenities, parking, pets, trash, and admin charges often hide in riders.",
      },
      {
        q: "How do I read a lease step by step?",
        a: "Start with names, address, dates, and signatures. Then total rent plus every fee, read deposit rules, find renewal notice deadlines, check early-termination language, and only then read repairs, guests, pets, and addenda. That order surfaces the biggest risks first.",
      },
      {
        q: "What should I look for when I review a rental lease?",
        a: "Total monthly cost, security deposit return rules, auto-renewal notice deadlines, early-termination fees, repair responsibilities, landlord entry notice, and any vague “tenant pays all damages” language.",
      },
      {
        q: "Is reading a lease the same as a formal lease review?",
        a: "Reading is your own pass through the document. A structured review organizes fees and risk areas in plain English so you can ask better questions. Neither replaces legal advice for your state or situation.",
      },
      {
        q: "Can I review a lease agreement online?",
        a: "Yes. You can follow this checklist yourself, or upload the PDF for a one-time plain-English structured pass, then still raise open points with the landlord or an attorney.",
      },
      {
        q: "Should I use a city-specific lease page too?",
        a: "Yes if you are signing in a major metro. Local notes on fees, deposits, and building rules complement this national checklist — start with Washington, D.C. or Philadelphia if those are your markets.",
      },
    ],
    ctaNote:
      "Want a free look at the report format first? Open the sample. Ready for your PDF? Get an online rental lease agreement review for $9.99 — or keep using this checklist yourself.",
  },
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
    ctaNote: "Want these checked in your actual lease? Upload it for a $9.99 plain-English review.",
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
    ctaNote: "Not sure what your lease says about leaving early? Get a structured review for $9.99.",
  },
  {
    slug: "fees-and-charges",
    category: "guide",
    title: "What is a lease fee? Rental fees and charges explained",
    description:
      "What is a lease fee? Spot amenity, utility, pet, parking, late, and admin fees that sit outside base rent in U.S. leases.",
    keywords: "what is a lease fee, apartment fees besides rent, rental junk fees, lease late fees utilities, amenity fee apartment",
    intro:
      "Wondering what a lease fee is? Anything charged beyond base rent — trash, amenity, pet, parking, admin, or late fees — that changes what you actually pay. Map every recurring and one-time charge before you sign.",
    sections: [
      {
        heading: "What is a lease fee?",
        body: "A lease fee is typically any charge in the rental agreement other than base rent: community/amenity fees, trash or valet, technology packages, parking, pet rent, application or admin fees, and late fees. List them from the lease and addenda, then total the monthly and move-in amounts.",
      },
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
    title: "Lawyer review vs a $9.99 lease review",
    description:
      "When an AI lease summary helps, when you still need a licensed attorney, and how the two can work together.",
    keywords: "lease review vs lawyer, do I need a lawyer for a lease, cheap lease review",
    intro:
      "A structured informational review helps you see fees, deadlines, and one-sided wording quickly. It is not a substitute for legal advice on your rights.",
    sections: [
      {
        heading: "What a $9.99 review is good for",
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
