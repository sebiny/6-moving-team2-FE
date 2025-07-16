"use client";

import React from "react";
import { Request } from "@/types/request";
import RejectedEstimateCard from "./RejectedEstimateCard";

interface RejectedCardListProps {
  requests: Request[];
}

export default function RejectedCardList({ requests }: RejectedCardListProps) {
  return (
    <div className="grid grid-cols-2 gap-6 self-stretch">
      {requests.map((request) => (
        <RejectedEstimateCard key={request.id} request={request} />
      ))}
    </div>
  );
}
