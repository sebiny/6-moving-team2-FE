"use client";

import React from "react";
import { Request } from "@/types/request";
import RequestCard from "../../../../../components/driver/RequestCardBase";

interface RequestCardListProps {
  requests: Request[];
}

export default function RequestCardList({ requests }: RequestCardListProps) {
  return (
    <div className="self-stretch grid grid-cols-2 gap-6">
      {requests.map((request) => (
        <RequestCard key={request.id} request={request} variant="received" />
      ))}
    </div>
  );
}
