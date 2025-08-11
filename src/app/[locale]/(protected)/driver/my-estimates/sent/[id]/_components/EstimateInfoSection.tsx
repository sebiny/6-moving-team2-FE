// components/estimate/EstimateInfoSection.tsx
"use client";

import React from "react";
import EstimateDetailInfo from "@/components/common/EstimateDetailInfo";

interface Props {
  createdAt: string;
  moveTypeLabel: string;
  moveDate: string;
  from: string;
  to: string;
}

export default function EstimateInfoSection({ createdAt, moveTypeLabel, moveDate, from, to }: Props) {
  return (
    <section aria-label="견적 상세 정보">
      <EstimateDetailInfo requestDate={createdAt} serviceType={moveTypeLabel} moveDate={moveDate} from={from} to={to} />
    </section>
  );
}
