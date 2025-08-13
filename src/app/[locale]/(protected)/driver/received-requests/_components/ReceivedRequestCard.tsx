"use client";

import React, { useEffect, useState } from "react";
import { Request } from "@/types/request";
import ChipRectangle from "@/components/chip/ChipRectangle";
import Image from "next/image";
import Button from "@/components/Button";
import EstimateButton from "@/components/button/EstimateButton";
import { useLocale, useTranslations } from "next-intl";
import { translateWithDeepL } from "@/utills/translateWithDeepL";
import { batchTranslate } from "@/utills/batchTranslate";

interface ReceivedRequestCardProps {
  request: Request;
  onSendEstimate: (request: Request) => void;
  onRejectEstimate: (request: Request) => void;
}

export default function ReceivedRequestCard({ request, onSendEstimate, onRejectEstimate }: ReceivedRequestCardProps) {
  const [translatedCreatedAt, setTranslatedCreatedAt] = useState<string | null>(null);
  const locale = useLocale();
  const t = useTranslations("ReceivedReq");
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

  useEffect(() => {
    const translate = async () => {
      try {
        const translated = await translateWithDeepL(request.createdAt, locale.toUpperCase());
        setTranslatedCreatedAt(translated);
      } catch {
        setTranslatedCreatedAt(request.createdAt); //fallback
      }
    };
    translate();
  }, [request.createdAt, locale]);

  return (
    <article
      className="inline-flex w-80 flex-col gap-6 rounded-[20px] bg-white px-5 py-6 shadow-[-2px_-2px_10px_0px_rgba(220,220,220,0.20)] outline outline-offset-[-0.5px] outline-zinc-100 md:w-full md:gap-8 md:px-10 md:py-8"
      role="listitem"
      aria-label={`${request.customerName} 고객의 ${request.moveType} 이사 요청`}
    >
      {/* 상단 */}
      <div className="flex w-full flex-col gap-4">
        <div className="flex h-8 items-center justify-between">
          <div className="flex gap-2" role="group" aria-label="이사 유형">
            <ChipRectangle moveType={request.moveType} size="sm" />
            {request.isDesignated && <ChipRectangle moveType="REQUEST" size="sm" />}
          </div>
          <time className="text-sm text-zinc-500" dateTime={request.createdAt}>
            {translatedCreatedAt}
          </time>
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
        <div className="flex w-full flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div
            className={`flex flex-1 items-end gap-3 ${
              locale === "en" ? "flex-col items-start md:flex-row md:items-center" : "md:flex-row md:items-center"
            }`}
            role="group"
            aria-label="이사 경로"
          >
            <div className="flex flex-col">
              <div className="text-sm text-zinc-500">{t("from")}</div>
              <div className="truncate overflow-hidden text-base font-semibold whitespace-nowrap text-neutral-900">
                {translatedInfo.from}
              </div>
            </div>
            <div className={`relative h-5 w-4 flex-shrink-0 ${locale === "en" ? "hidden text-left md:block" : ""}`}>
              <Image src="/assets/icons/ic_arrow.svg" alt="출발지에서 도착지로" fill className="object-center" />
            </div>
            <div className="flex flex-col">
              <div className="text-sm text-zinc-500">{t("to")}</div>
              <div className="truncate overflow-hidden text-base font-semibold whitespace-nowrap text-neutral-900">
                {translatedInfo.to}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-sm text-zinc-500">{t("moveDate")}</div>
            <time className="text-base font-semibold text-neutral-900" dateTime={request.moveDate}>
              {translatedInfo.date}
            </time>
          </div>
        </div>
      </div>
      {/* 하단 */}
      <div className="flex w-full flex-col gap-2.5 md:flex-row-reverse" role="group" aria-label="견적 액션">
        <div className="w-full md:w-1/2">
          <EstimateButton
            text={t("sendReq")}
            type="orange"
            image={true}
            onClick={() => onSendEstimate(request)}
            estimateCount={request.estimateCount}
            aria-label={`${request.customerName} 고객에게 견적 보내기`}
          />
        </div>
        <div className="w-full md:w-1/2">
          <Button
            text={t("reject")}
            type="white-orange"
            onClick={() => onRejectEstimate(request)}
            aria-label={`${request.customerName} 고객의 요청 거절하기`}
          />
        </div>
      </div>
    </article>
  );
}
