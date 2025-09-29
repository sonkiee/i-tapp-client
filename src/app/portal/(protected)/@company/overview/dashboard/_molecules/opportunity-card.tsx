import { Button } from "@/components/ui/button";
import { Briefcase } from "iconsax-reactjs";
import { ArrowRight } from "lucide-react";

type OpportunityCardProps = {
  icon?: React.ReactNode;
  title: string;
  applicants: number;
  status: string;
  onAction?: () => void;
  actionLabel?: string;
};

export default function OpportunityCard({
  icon = <Briefcase className="w-5 h-5 text-blue-600" />,
  title,
  applicants,
  status,
  onAction,
  actionLabel = "View",
}: OpportunityCardProps) {
  return (
    <div className="flex items-center justify-between rounded-md w-full px-3 py-4 shadow-md bg-[#f1f6fc] border-l-4  border-l-primary">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full ">
          {icon ?? "📌"}
        </div>
        <div>
          <div className="text-sm font-medium text-gray-800">{title}</div>
          <div className="text-xs text-gray-500">
            Applicant{applicants !== 1 && "s"}: {applicants}
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded ${
            status === "open"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>

        <Button
          onClick={onAction}
          className="flex flex-row items-center gap-1 cursor-pointer shadow-sm text-white"
        >
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}
