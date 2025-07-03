"use client";

import PendingCard from "@/app/(protected)/driver/pending-card/PendingCard";
import { pendingData } from "@/app/(protected)/driver/pending-card/PendingData";


export default function ExamplePendingPage() {
  return (
    <div className="px-70 py-50 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
      {pendingData.map((item) => (
        <PendingCard key={item.id} data={item} />
      ))}
    </div>
  );
}
