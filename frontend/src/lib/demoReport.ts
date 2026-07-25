import type { Analysis } from "@/components/AnalysisResults";

/** Static sample — never sent to an LLM. Matches real report shape. */
export const DEMO_ANALYSIS: Analysis = {
  summary:
    "This is a sample report on a fictional lease for demo only. It flags a few common issues: broad early-termination fees, a short renewal notice window, and vague repair language. Your real report is built from the file you upload — not from this sample.",
  important: [
    {
      clause: "Section 8 – Security deposit",
      severity: "medium",
      explanation:
        "Deposit equals one month’s rent. Allowed deductions are listed, but the return timeline only says “reasonable time” with no calendar deadline.",
    },
    {
      clause: "Section 14 – Automatic renewal",
      severity: "high",
      explanation:
        "Lease renews for another 12 months unless written notice is given 60 days before the end date. Easy to miss if you don’t calendar it the day you sign.",
    },
    {
      clause: "Section 5 – Monthly fees",
      severity: "low",
      explanation:
        "Base rent is clear. Trash, amenity, and tech fees appear in an addendum — total monthly cost is higher than the advertised rent.",
    },
  ],
  tenant_issues: [
    {
      clause: "Section 11 – Early termination",
      severity: "high",
      explanation:
        "Leaving early requires a buyout of three months’ rent even if a replacement tenant is approved. No language that ends liability once the unit is re-rented.",
      recommendation:
        "Ask for written reletting cooperation and a reduced buyout after the unit is leased again.",
    },
    {
      clause: "Section 9 – Repairs",
      severity: "medium",
      explanation:
        "Tenant is responsible for “all maintenance” including items that often fall on the landlord (HVAC, plumbing beyond clogs). Vague and one-sided.",
      recommendation:
        "Clarify landlord vs tenant duties for structural, plumbing, electrical, and appliances in writing.",
    },
  ],
  landlord_issues: [
    {
      clause: "Section 16 – Occupancy & guests",
      severity: "medium",
      explanation:
        "Occupancy cap is stated, but guest duration and subletting rules are thin — can create disputes with roommates later.",
      recommendation:
        "Spell out max occupants, guest stay limits, and whether subletting needs prior written consent.",
    },
  ],
  missing_or_unclear: [
    {
      clause: "Move-in condition / inventory",
      severity: "medium",
      explanation:
        "No move-in checklist or photo protocol is referenced. Hard to prove pre-existing wear at move-out.",
      recommendation:
        "Add a dated move-in addendum with photos and tie deposit return to that baseline.",
    },
  ],
};
