// components/estimate/EstimateInfoSection.tsx
import React from "react";
import EstimateDetailInfo from "@/components/common/EstimateDetailInfo";

interface Props {
  createdAt: string;
  moveTypeLabel: string;
  moveDate: string;
  from: string;
  to: string;
}

export default function EstimateInfoSection({
  createdAt,
  moveTypeLabel,
  moveDate,
  from,
  to
}: Props) {
  return (
    <div className="w-full max-w-[744px]">
      <EstimateDetailInfo
        requestDate={createdAt}
        serviceType={moveTypeLabel}
        moveDate={moveDate}
        from={from}
        to={to}
      />
    </div>
  );
}
