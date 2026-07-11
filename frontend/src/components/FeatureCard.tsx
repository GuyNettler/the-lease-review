import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-start bg-white rounded-xl shadow p-4 gap-2 w-full max-w-xs border border-gray-100 text-left">
      <div className="text-blue-600 mb-2" style={{ fontSize: 36 }}>{icon}</div>
      <h3 className="text-lg font-bold text-blue-800 mb-1 text-left">{title}</h3>
      <p className="text-gray-600 text-sm text-left">{description}</p>
    </div>
  );
} 