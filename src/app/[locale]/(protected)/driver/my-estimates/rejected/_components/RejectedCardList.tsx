"use client";

import React from "react";
import { Request } from "@/types/request";
import CompletedRejectedCard from "./CompletedRejectedCard";

interface RejectedCardListRequest extends Request {
  isCompleted?: boolean;
  estimateAmount?: string;
}

interface RejectedCardListProps {
  requests: RejectedCardListRequest[];
}

export default function RejectedCardList({ requests }: RejectedCardListProps) {
  return (
    <section
      role="list"
      aria-label="거부된 견적 목록"
      className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 lg:gap-6"
    >
      {requests.map((request) => (
        <CompletedRejectedCard key={request.id} request={request} />
      ))}
    </section>
  );
}
