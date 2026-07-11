import { ReactNode } from "react";

interface TestimonialCardProps {
  avatar: ReactNode;
  name: string;
  location: string;
  quote: string;
}

export default function TestimonialCard({ avatar, name, location, quote }: TestimonialCardProps) {
  return (
    <div className="flex flex-col items-center bg-gray-50 rounded-xl shadow p-4 gap-2 w-full max-w-xs border border-gray-100">
      <div className="mb-2">{avatar}</div>
      <div className="font-bold text-blue-800 text-base text-center">{name}</div>
      <div className="text-xs text-gray-500 mb-1 text-center">{location}</div>
      <blockquote className="text-gray-700 text-sm text-center italic">&ldquo;{quote}&rdquo;</blockquote>
    </div>
  );
} 