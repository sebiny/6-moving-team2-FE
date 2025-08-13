import React, { useEffect, useState } from "react";
import { Request } from "@/types/request";
import ChipRectangle from "@/components/chip/ChipRectangle";
import ChipConfirmed from "@/components/chip/ChipConfirmed";
import { useLocale, useTranslations } from "next-intl";
import { batchTranslate } from "@/utills/batchTranslate";
import AddressDateSection from "../../sent/_components/AddressDateSection";

interface CompletedRejectedCardProps {
  request: Request & { estimateAmount?: string; status?: string };
}

export default function CompletedRejectedCard({ request }: CompletedRejectedCardProps) {
  const t = useTranslations("MyEstimate");
  const tC = useTranslations("Common");
  const locale = useLocale();
  const [translatedInfo, setTransaltedInfo] = useState({ from: "", to: "", date: "" });

  useEffect(() => {
    const translatedTexts = async () => {
      if (!request) return;
      if (locale === "ko") {
        setTransaltedInfo({
          from: request.fromAddress,
          to: request.toAddress,
          date: request.moveDate
        });
        return;
      }
      try {
        const result = await batchTranslate(
          {
            from: request.fromAddress ?? "",
            to: request.toAddress ?? "",
            date: request.moveDate ?? ""
          },
          locale
        );
        setTransaltedInfo({
          from: result.from,
          to: result.to,
          date: result.date
        });
      } catch (e) {
        console.warn("번역 실패", e);
      }
    };
    translatedTexts();
  }, [request, locale]);

  return (
    <article
      role="listitem"
      className="relative inline-flex w-80 flex-col gap-6 rounded-[20px] bg-white px-5 py-6 shadow-[2px_2px_10px_0px_rgba(220,220,220,0.20)] outline-[0.5px] outline-offset-[-0.5px] outline-zinc-100 md:w-[588px] md:gap-8 md:px-10 md:py-8"
      aria-label={`${request.customerName} 고객님의 거부된 견적`}
    >
      {/* 상단 */}
      <div className="flex w-full flex-col gap-6">
        <div className="flex h-8 items-center justify-between">
          <div className="flex gap-2" role="group" aria-label="이사 유형">
            <ChipRectangle moveType={request.moveType} size="sm" />
            {request.isDesignated && <ChipRectangle moveType="REQUEST" size="sm" />}
          </div>
          {request.status === "confirmed" && <ChipConfirmed />}
        </div>
        {/* 고객명 */}
        <div className="flex w-full flex-col gap-3">
          <div className="flex gap-2">
            <span className="text-xl font-semibold text-zinc-800">{request.customerName}</span>
            <span className="text-xl font-semibold text-zinc-800">{t("customer")}</span>
          </div>
          <div className="h-px w-full bg-zinc-100" />
        </div>
        {/* 출발/도착지 + 이사일 */}
        <AddressDateSection from={translatedInfo.from} to={translatedInfo.to} date={translatedInfo.date} />
      </div>
      {/* 반투명 오버레이 */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-[20px] bg-black/60"
        role="group"
        aria-label="거부된 견적 오버레이"
      >
        <div className="flex w-48 flex-col items-center gap-5">
          <div className="text-center text-lg font-semibold text-white">{tC("rejectedMessage")}</div>
        </div>
      </div>
    </article>
  );
}
