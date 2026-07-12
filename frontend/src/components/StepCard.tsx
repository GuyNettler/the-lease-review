import { ReactNode } from "react";

interface StepCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  step: number;
  bg?: string;
}

export default function StepCard({ icon, title, description, step, bg = "bg-white" }: StepCardProps) {
  return (
    <div
      className={`flex w-full flex-col items-start gap-3 rounded-xl border border-blue-100 ${bg} p-5 text-left shadow-sm`}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          {step}
        </span>
        <span className="flex h-10 w-10 items-center justify-center text-blue-600 [&_svg]:h-7 [&_svg]:w-7">
          {icon}
        </span>
      </div>
      <h3 className="text-lg font-bold text-blue-800">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-600">{description}</p>
    </div>
  );
}
