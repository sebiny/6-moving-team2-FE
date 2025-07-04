"use client";

import PendingCard from "@/app/(protected)/member/estimate-pending/_components/PendingCard";
import { pendingData } from "@/app/(protected)/member/estimate-pending/_components/PendingData";

export default function ExamplePendingPage() {
  return (
    <div className="grid gap-6 bg-white px-100 py-50 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
      {pendingData.map((item) => (
        <PendingCard key={item.id} data={item} />
      ))}
    </div>
  );
}
