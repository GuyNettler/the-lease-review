interface TestimonialCardProps {
  name: string;
  city: string;
  quote: string;
}

export default function TestimonialCard({ name, city, quote }: TestimonialCardProps) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
      <blockquote className="flex-1 text-slate-700 leading-relaxed">&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className="mt-4 text-sm">
        <span className="font-bold text-slate-900">{name}</span>
        <span className="text-slate-500"> · {city}</span>
      </figcaption>
    </figure>
  );
}
