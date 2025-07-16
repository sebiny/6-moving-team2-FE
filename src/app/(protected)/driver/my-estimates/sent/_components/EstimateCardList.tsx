"use client";

import React from "react";
import { Request } from "@/types/request";
import CustomerEstimateCard from "@/app/(protected)/driver/my-estimates/sent/_components/CustomerEstimateCard";

interface CustomerEstimateCardListProps {
  requests: Request[];
}

export default function CustomerEstimateCardList({ requests }: CustomerEstimateCardListProps) {
  return (
    <div className="grid grid-cols-2 gap-6 self-stretch">
      {requests.map((request) => (
        <CustomerEstimateCard key={request.id} request={request} />
      ))}
    </div>
  );
}
