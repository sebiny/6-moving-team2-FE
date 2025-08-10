"use client";

import { batchTranslate } from "@/utills/batchTranslate";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

interface EstimateDetailProps {
  moveType: string;
  startAddress: string;
  endAddress: string;
  date: string;
  createdDate: string;
  moveDateISO?: string;
  createdDateISO?: string;
}

export default function EstimateDetail({
  moveType,
  startAddress,
  endAddress,
  date,
  createdDate,
  moveDateISO,
  createdDateISO
}: EstimateDetailProps) {
  const t = useTranslations("MyEstimates");
  const locale = useLocale();
  const [translatedInfo, setTranslatedInfo] = useState({ from: "", to: "", date: "", created: "", move: "" });

  useEffect(() => {
    const translatedTexts = async () => {
      if (!moveType || !startAddress || !endAddress || !date || !createdDate) return;
      if (locale === "ko") {
        setTranslatedInfo({
          from: startAddress,
          to: endAddress,
          date: date,
          created: createdDate,
          move: moveType
        });
        return;
      }
      try {
        const result = await batchTranslate(
          {
            from: startAddress ?? "",
            to: endAddress ?? "",
            date: date ?? "",
            created: createdDate ?? "",
            move: moveType ?? ""
          },
          locale
        );
        setTranslatedInfo({
          from: result.from,
          to: result.to,
          date: result.date,
          move: result.move,
          created: result.created
        });
      } catch (e) {
        console.warn("번역 실패", e);
      }
    };
    translatedTexts();
  }, [locale, moveType, startAddress, endAddress, date, createdDate]);

  // 라벨 목록 구성
  return (
    <section className="w-full rounded-xl bg-white md:pb-7" aria-labelledby="estimate-detail-heading">
      {/* 상단: 제목 + 생성일 */}
      <header className="mb-6 flex flex-col items-center justify-between md:mb-8 md:flex-row">
        <h2 id="estimate-detail-heading" className="text-lg font-bold text-gray-900 md:text-xl">
          {t("estimateInfo")}
        </h2>
        <p className="mt-2 hidden text-sm whitespace-nowrap text-gray-400 md:mt-0 md:flex">
          {createdDateISO ? <time dateTime={createdDateISO}>{translatedInfo.created}</time> : translatedInfo.created}
        </p>
      </header>

      {/* 본문 정보: 정의 리스트 */}
      <dl className="space-y-3 text-sm md:text-base">
        {/* 이사 유형 */}
        <div className="flex justify-between">
          <dt className="font-bold text-orange-400">{t("moveType")}</dt>
          <dd className="font-semibold">{translatedInfo.move}</dd>
        </div>

        <hr className="border-t border-gray-100 lg:hidden" />

        {/* 출발지 */}
        <div className="flex justify-between">
          <dt className="font-bold text-orange-400">{t("from")}</dt>
          <dd className="max-w-[60%] truncate font-semibold">{translatedInfo.from}</dd>
        </div>

        {/* 도착지 */}
        <div className="flex justify-between">
          <dt className="font-bold text-orange-400">{t("to")}</dt>
          <dd className="max-w-[60%] truncate font-semibold">{translatedInfo.to}</dd>
        </div>

        <hr className="border-t border-gray-100 lg:hidden" />

        {/* 이사일 */}
        <div className="flex justify-between">
          <dt className="font-bold text-orange-400">{t("date")}</dt>
          <dd className="font-semibold">
            {moveDateISO ? <time dateTime={moveDateISO}>{translatedInfo.date}</time> : translatedInfo.date}
          </dd>
        </div>
      </dl>

      {/* 하단 날짜 (sm 전용) */}
      <p className="mt-5 text-right text-sm text-gray-400 md:hidden">
        {createdDateISO ? <time dateTime={createdDateISO}>{translatedInfo.created}</time> : translatedInfo.created}
      </p>
    </section>
  );
}

// truncate: overflow-hidden + whitespace-nowrap + text-ellipsis Tailwind 유틸
//  두 줄까지만 보여주고 넘치면 ... 처리하고 싶다면 line-clamp-2
