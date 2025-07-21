"use client";

import React from "react";
import { Request } from "@/types/request";
import CustomerEstimateCard from "@/app/(protected)/driver/my-estimates/sent/_components/CustomerEstimateCard";
import CompletedEstimateCard from "./CompletedEstimateCard";

interface EstimateCardListRequest extends Request {
  isCompleted?: boolean;
  estimateAmount?: string;
}

interface EstimateCardListProps {
  requests: EstimateCardListRequest[];
}

export default function EstimateCardList({ requests }: EstimateCardListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 self-stretch md:gap-8 lg:grid-cols-2 lg:gap-6">
      {requests.map((request) =>
        request.isCompleted ? (
          <CompletedEstimateCard key={request.id} request={request} />
        ) : (
          <CustomerEstimateCard key={request.id} request={request} />
        )
      )}
    </div>
  );
}
