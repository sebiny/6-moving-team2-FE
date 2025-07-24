import ChipConfirmed from "./ChipConfirmed";

interface EstimateStatusLabelProps {
  status: "PROPOSED" | "AUTO_REJECTED" | "ACCEPTED";
  className?: string;
}

const normalizedStatusMap: Record<EstimateStatusLabelProps["status"], "WAITING" | "CONFIRMED"> = {
  PROPOSED: "WAITING",
  AUTO_REJECTED: "WAITING",
  ACCEPTED: "CONFIRMED"
};

export default function EstimateStatus({ status, className = "" }: EstimateStatusLabelProps) {
  const normalized = normalizedStatusMap[status];

  if (normalized === "WAITING") {
    return (
      <div
        className={`inline-flex items-center justify-center bg-white text-base font-semibold whitespace-nowrap text-neutral-400 ${className}`}
      >
        견적대기
      </div>
    );
  }

  if (normalized === "CONFIRMED") {
    return <ChipConfirmed className={className} />;
  }

  return null;
}
