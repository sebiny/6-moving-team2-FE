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
}

export default function EstimateDetailInfo({ requestDate, serviceType, moveDate, from, to }: EstimateInfoProps) {
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

  const infoList = [
    { label: t("requestDate"), value: translatedInfo.req },
    { label: t("service"), value: translatedInfo.ser },
    { label: t("useDate"), value: translatedInfo.date },
    { label: t("from"), value: translatedInfo.from },
    { label: t("to"), value: translatedInfo.to }
  ];

  return (
    <section className="flex flex-col gap-7">
      <h2 className="text-xl font-semibold text-black">{t("estimateInfo")}</h2>

      <div className="flex flex-col gap-3 md:gap-5">
        {infoList.map((item) => (
          <div key={item.label} className="flex justify-between text-sm md:justify-start md:gap-5 md:text-base">
            <span className="text-gray-400 md:w-[100px]">{item.label}</span>
            <span className="max-w-[70%] text-right font-semibold text-black md:max-w-[100%] md:text-left">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
