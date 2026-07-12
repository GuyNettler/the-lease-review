export type AnalysisItem = {
  clause: string;
  explanation: string;
  severity: "high" | "medium" | "low";
  recommendation?: string;
};

export type Analysis = {
  important?: AnalysisItem[];
  tenant_issues?: AnalysisItem[];
  landlord_issues?: AnalysisItem[];
  missing_or_unclear?: AnalysisItem[];
  summary?: string;
};

function severityStyles(severity: AnalysisItem["severity"]) {
  switch (severity) {
    case "high":
      return {
        wrap: "border-red-200 bg-red-50",
        badge: "bg-red-100 text-red-800",
        label: "High",
        dot: "bg-red-500",
      };
    case "medium":
      return {
        wrap: "border-amber-200 bg-amber-50",
        badge: "bg-amber-100 text-amber-900",
        label: "Medium",
        dot: "bg-amber-500",
      };
    default:
      return {
        wrap: "border-blue-200 bg-blue-50",
        badge: "bg-blue-100 text-blue-800",
        label: "Low",
        dot: "bg-blue-500",
      };
  }
}

function ItemCard({
  item,
  recommendationTone = "blue",
}: {
  item: AnalysisItem;
  recommendationTone?: "blue" | "green" | "violet";
}) {
  const styles = severityStyles(item.severity);
  const rec =
    recommendationTone === "green"
      ? "border-green-200 bg-green-50 text-green-900"
      : recommendationTone === "violet"
        ? "border-slate-200 bg-slate-50 text-slate-800"
        : "border-blue-200 bg-blue-50 text-blue-900";

  return (
    <div className={`rounded-xl border p-4 ${styles.wrap}`}>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className={`inline-block h-2.5 w-2.5 rounded-full ${styles.dot}`} />
        <span className="font-semibold text-slate-900">{item.clause}</span>
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${styles.badge}`}>
          {styles.label}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-slate-700">{item.explanation}</p>
      {item.recommendation ? (
        <div className={`mt-3 rounded-lg border p-3 ${rec}`}>
          <p className="text-xs font-bold uppercase tracking-wide">Recommendation</p>
          <p className="mt-1 text-sm leading-relaxed">{item.recommendation}</p>
        </div>
      ) : null}
    </div>
  );
}

function Section({
  title,
  items,
  recommendationTone,
}: {
  title: string;
  items?: AnalysisItem[];
  recommendationTone?: "blue" | "green" | "violet";
}) {
  if (!items?.length) return null;
  return (
    <div className="mb-8">
      <h3 className="mb-3 text-lg font-bold text-slate-900">{title}</h3>
      <div className="space-y-3">
        {items.map((item, i) => (
          <ItemCard key={`${item.clause}-${i}`} item={item} recommendationTone={recommendationTone} />
        ))}
      </div>
    </div>
  );
}

export default function AnalysisResults({
  analysis,
  email,
}: {
  analysis: Analysis;
  email?: string;
}) {
  return (
    <section className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-xl font-bold text-primary">Your lease review</h2>
        {email ? (
          <p className="text-sm text-slate-500">A copy was also emailed to {email}</p>
        ) : null}
      </div>

      {analysis.summary ? (
        <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="mb-2 text-lg font-bold text-slate-900">Summary</h3>
          <p className="text-sm leading-relaxed text-slate-700">{analysis.summary}</p>
        </div>
      ) : null}

      <Section title="Important clauses" items={analysis.important} />
      <Section
        title="Potential tenant concerns"
        items={analysis.tenant_issues}
        recommendationTone="blue"
      />
      <Section
        title="Potential landlord concerns"
        items={analysis.landlord_issues}
        recommendationTone="green"
      />
      <Section
        title="Missing or unclear items"
        items={analysis.missing_or_unclear}
        recommendationTone="violet"
      />

      <p className="mt-2 text-xs text-slate-500">
        This review is informational only and is not legal advice.
      </p>
    </section>
  );
}
