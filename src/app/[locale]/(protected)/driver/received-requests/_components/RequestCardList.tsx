"use client";

import React from "react";
import { Request } from "@/types/request";
import ReceivedRequestCard from "./ReceivedRequestCard";

interface ReceivedRequestCardListProps {
  requests: Request[];
  onSendEstimate: (request: Request) => void;
  onRejectEstimate: (request: Request) => void;
}

export default function ReceivedRequestCardList({
  requests,
  onSendEstimate,
  onRejectEstimate
}: ReceivedRequestCardListProps) {
  return (
    <div
      className="grid grid-cols-1 gap-6 self-stretch md:gap-8 lg:grid-cols-2 lg:gap-6"
      role="list"
      aria-label="받은 요청 목록"
    >
      {requests.map((request) => (
        <ReceivedRequestCard
          key={request.id}
          request={request}
          onSendEstimate={onSendEstimate}
          onRejectEstimate={onRejectEstimate}
        />
      ))}
    </div>
  );
}
