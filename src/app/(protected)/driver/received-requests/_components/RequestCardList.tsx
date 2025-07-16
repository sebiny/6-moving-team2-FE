"use client";

import React from "react";
import { Request } from "@/types/request";
import ReceivedRequestCard from "./ReceivedRequestCard";

interface ReceivedRequestCardListProps {
  requests: Request[];
}

export default function ReceivedRequestCardList({ requests }: ReceivedRequestCardListProps) {
  return (
    <div className="grid grid-cols-2 gap-6 self-stretch">
      {requests.map((request) => (
        <ReceivedRequestCard key={request.id} request={request} />
      ))}
    </div>
  );
}
