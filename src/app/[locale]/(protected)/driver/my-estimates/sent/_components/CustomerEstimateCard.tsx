import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChipRectangle from "@/components/chip/ChipRectangle";
import { MoveType, moveTypeFromKorean } from "@/constant/moveTypes";
import { CompletedEstimateCardType } from "@/types/estimateType";
import { ESTIMATE_STATUS, ESTIMATE_TEXT } from "@/constant/constant";
import ChipConfirmed from "@/components/chip/ChipConfirmed";
import { useLocale, useTranslations } from "next-intl";
import { batchTranslate } from "@/utills/batchTranslate";
import AddressDateSection from "./AddressDateSection";

interface CustomerEstimateCardProps {
  request: CompletedEstimateCardType;
}

export default function CustomerEstimateCard({ request }: CustomerEstimateCardProps) {
  const t = useTranslations("MyEstimate");
  const locale = useLocale();
  const [translatedInfo, setTransaltedInfo] = useState({ from: "", to: "", date: "" });
  const router = useRouter();
  const moveTypeKey: MoveType = moveTypeFromKorean[request.moveType] ?? "SMALL";
  useEffect(() => {
    const translatedTexts = async () => {
      if (!request) return;

      // 한국어면 원본 그대로
      if (locale === "ko") {
        setTransaltedInfo({
          from: request.fromAddress,
          to: request.toAddress,
          date: request.moveDate
        });
        return;
      }

      try {
        const translate = async (text: string) => {
          const res = await fetch(`/translate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, targetLang: locale.toUpperCase() })
          });
          const data = await res.json();
          return data.translation;
        };

        // 동시에 번역
        const [fromTranslated, toTranslated, dateTranslated] = await Promise.all([
          translate(request.fromAddress ?? ""),
          translate(request.toAddress ?? ""),
          translate(request.moveDate ?? "")
        ]);

        setTransaltedInfo({
          from: fromTranslated,
          to: toTranslated,
          date: dateTranslated
        });
      } catch (e) {
        console.warn("번역 실패", e);
        // 번역 실패 시 원본 텍스트 사용
        setTransaltedInfo({
          from: request.fromAddress ?? "",
          to: request.toAddress ?? "",
          date: request.moveDate ?? ""
        });
      }
    };

    translatedTexts();
  }, [request, locale]);

  return (
    <article
      className="flex w-80 cursor-pointer flex-col gap-6 rounded-[20px] bg-white px-5 py-6 shadow-[-2px_-2px_10px_0px_rgba(220,220,220,0.20)] outline outline-offset-[-0.5px] outline-zinc-100 transition-shadow hover:shadow-[-2px_-2px_15px_0px_rgba(220,220,220,0.30)] md:w-[588px] md:gap-8 md:px-10 md:py-8"
      onClick={() => router.push(`/driver/my-estimates/sent/${request.id}`)}
      role="listitem"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          router.push(`/driver/my-estimates/sent/${request.id}`);
        }
      }}
      aria-label={`${request.customerName} 고객의 ${request.moveType} 견적 상세보기`}
    >
      {/* 상단 */}
      <div className="flex w-full flex-col gap-4">
        <div className="flex h-8 items-center justify-between">
          <div className="flex gap-2" role="group" aria-label="이사 유형">
            <ChipRectangle moveType={moveTypeKey} size="sm" />
            {request.isDesignated === true && <ChipRectangle moveType="REQUEST" size="sm" />}
          </div>
          {request.status === ESTIMATE_STATUS.CONFIRMED && <ChipConfirmed />}
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
      {/* 하단 */}
      <div
        className="flex w-full items-end justify-between border-t border-neutral-200 pt-4"
        role="group"
        aria-label="견적 금액"
      >
        <div className="text-base font-medium text-neutral-800">{t("cost")}</div>
        <div className="text-2xl font-bold text-neutral-800">
          {request.estimateAmount ? request.estimateAmount : ESTIMATE_TEXT.UNDEFINED}
        </div>
      </div>
    </article>
  );
}
