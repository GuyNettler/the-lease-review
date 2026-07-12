import { ReactNode } from "react";

interface StepCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  step: number;
  bg?: string; // background color class, e.g. 'white' or 'bg-blue-50'
}

export default function StepCard({ icon, title, description, step, bg = "bg-white" }: StepCardProps) {
  return (
    <div className={`relative flex w-full flex-col items-start gap-2 rounded-xl border border-blue-100 ${bg} p-4 pt-5 text-left shadow-sm`}>
      <div className="absolute left-3 top-3 bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-base">{step}</div>
      <div className="text-blue-600 mb-2" style={{ fontSize: 36 }}>{icon}</div>
      <h3 className="text-lg font-bold text-blue-800 mb-1 text-left">{title}</h3>
      <p className="text-gray-600 text-sm text-left">{description}</p>
    </div>
  );
} 