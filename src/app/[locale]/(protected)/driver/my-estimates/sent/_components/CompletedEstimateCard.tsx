import React from "react";
import { CompletedEstimateCardType } from "@/types/estimateType";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import CustomerEstimateCard from "./CustomerEstimateCard";

interface CompletedEstimateCardProps {
  request: CompletedEstimateCardType;
}

export default function CompletedEstimateCard({ request }: CompletedEstimateCardProps) {
  const router = useRouter();
  const t = useTranslations("MyEstimate");

  return (
    <div className="relative">
      <CustomerEstimateCard request={request} />
      {/* 반투명 오버레이 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-[20px] bg-black/60">
        <div className="flex w-48 flex-col items-center gap-5">
          <div className="text-center text-lg font-semibold text-white">{t("ThisIsCompleted")}</div>
          <Button
            text={t("viewDetails")}
            type="outline"
            className="h-14 w-full rounded-xl px-6 py-4"
            onClick={() => router.push(`/driver/my-estimates/sent/${request.id}`)}
          />
        </div>
      </div>
    </div>
  );
}
