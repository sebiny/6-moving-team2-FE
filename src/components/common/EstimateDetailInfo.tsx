"use client";

import { batchTranslate } from "@/utills/batchTranslate";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

interface EstimateInfoProps {
  requestDate: string;
  serviceType: string;
  moveDate: string;
  from: string;
  to: string;
  /** 기계가 읽을 ISO 값 */
  requestDateISO?: string;
  moveDateISO?: string;
}

export default function EstimateDetailInfo({
  requestDate,
  serviceType,
  moveDate,
  from,
  to,
  requestDateISO,
  moveDateISO
}: EstimateInfoProps) {
  const t = useTranslations("MyEstimate");
  const locale = useLocale();
  const [translatedInfo, setTranslatedInfo] = useState({ req: "", ser: "", date: "", from: "", to: "" });

  useEffect(() => {
    const translatedData = async () => {
      if (!requestDate || !serviceType || !moveDate || !from || !to) return;

      if (locale === "ko") {
        setTranslatedInfo({
          req: requestDate,
          ser: serviceType,
          date: moveDate,
          from,
          to
        });
        return;
      }

      try {
        const result = await batchTranslate(
          {
            req: requestDate,
            ser: serviceType,
            date: moveDate,
            from,
            to
          },
          locale
        );
        setTranslatedInfo({ req: result.req, ser: result.ser, date: result.date, from: result.from, to: result.to });
      } catch (e) {
        console.warn("번역 실패", e);
      }
    };

    translatedData(); // 함수 실행
  }, [requestDate, serviceType, moveDate, from, to, locale]);

  return (
    <section className="flex flex-col gap-7" aria-labelledby="estimate-info-heading">
      <h2 id="estimate-info-heading" className="text-xl font-semibold text-black">
        {t("estimateInfo")}
      </h2>

      {/* 라벨-값 쌍은 정의 리스트로 */}
      <dl className="flex flex-col gap-3 md:gap-5">
        {/* 요청일 */}
        <div className="flex justify-between text-sm md:justify-start md:gap-5 md:text-base">
          <dt className="text-gray-400 md:w-[100px]">{t("requestDate")}</dt>
          <dd className="max-w-[70%] text-right font-semibold text-black md:max-w-[100%] md:text-left">
            {requestDateISO ? <time dateTime={requestDateISO}>{translatedInfo.req}</time> : translatedInfo.req}
          </dd>
        </div>

        {/* 서비스 유형 */}
        <div className="flex justify-between text-sm md:justify-start md:gap-5 md:text-base">
          <dt className="text-gray-400 md:w-[100px]">{t("service")}</dt>
          <dd className="max-w-[70%] text-right font-semibold text-black md:max-w-[100%] md:text-left">
            {translatedInfo.ser}
          </dd>
        </div>

        {/* 이용일/이사일 */}
        <div className="flex justify-between text-sm md:justify-start md:gap-5 md:text-base">
          <dt className="text-gray-400 md:w-[100px]">{t("useDate")}</dt>
          <dd className="max-w-[70%] text-right font-semibold text-black md:max-w-[100%] md:text-left">
            {moveDateISO ? <time dateTime={moveDateISO}>{translatedInfo.date}</time> : translatedInfo.date}
          </dd>
        </div>

        {/* 출발지 */}
        <div className="flex justify-between text-sm md:justify-start md:gap-5 md:text-base">
          <dt className="text-gray-400 md:w-[100px]">{t("from")}</dt>
          <dd className="max-w-[70%] text-right font-semibold text-black md:max-w-[100%] md:text-left">
            {translatedInfo.from}
          </dd>
        </div>

        {/* 도착지 */}
        <div className="flex justify-between text-sm md:justify-start md:gap-5 md:text-base">
          <dt className="text-gray-400 md:w-[100px]">{t("to")}</dt>
          <dd className="max-w-[70%] text-right font-semibold text-black md:max-w-[100%] md:text-left">
            {translatedInfo.to}
          </dd>
        </div>
      </dl>
    </section>
  );
}
