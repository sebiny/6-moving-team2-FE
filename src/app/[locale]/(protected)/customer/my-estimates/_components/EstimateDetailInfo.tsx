"use client";

import { useTranslations } from "next-intl";
import React from "react";

interface EstimateInfoProps {
  requestDate: string;
  serviceType: string;
  moveDate: string;
  from: string;
  to: string;
}

export default function EstimateDetailInfo({ requestDate, serviceType, moveDate, from, to }: EstimateInfoProps) {
  const t = useTranslations("MyEstimates");
  const infoList = [
    { label: t("requestDate"), value: requestDate },
    { label: t("service"), value: serviceType },
    { label: t("moveDate"), value: moveDate },
    { label: t("from"), value: from },
    { label: t("to"), value: to }
  ];

  return (
    <section className="flex flex-col gap-7">
      <h2 className="text-xl font-semibold text-black">{t("estimateInfo")}</h2>

      <div className="flex flex-col gap-3 md:gap-5">
        {infoList.map((item) => (
          <div key={item.label} className="flex justify-between text-sm md:justify-start md:gap-12 md:text-base">
            <span className="text-gray-400 md:w-[100px]">{item.label}</span>
            <span className="text-right font-semibold text-black">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
