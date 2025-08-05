"use client";

import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import clsx from "clsx";
import { generateCalendarDates, setDayjsLocale } from "@/utills/dateUtils";
import { useLocale, useTranslations } from "next-intl";

interface DateProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  onConfirm: () => void;
}

function DatePicker({ selectedDate, onSelectDate, onConfirm }: DateProps) {
  const t = useTranslations("Date");
  const locale = useLocale();
  const today = useMemo(() => dayjs(), []);
  const [current, setCurrent] = useState(() => dayjs());

  useEffect(() => {
    setDayjsLocale(locale);
  }, [locale]);

  const days = useMemo(
    () => [t("day.sun"), t("day.mon"), t("day.tue"), t("day.wed"), t("day.thu"), t("day.fri"), t("day.sat")],
    [t]
  );

  const gridDates = useMemo(() => generateCalendarDates(current), [current]);
  const selectedDayjs = selectedDate ? dayjs(selectedDate) : null;

  const isSelected = (date: Date) => selectedDayjs?.isSame(date, "date");
  const isPast = (date: Date) => dayjs(date).isBefore(today, "day");

  return (
    <div className="border-line-200 flex h-full w-full flex-col justify-between rounded-2xl border bg-white px-[45.5px] py-8 shadow-md">
      {/* 헤더 */}
      <div className="mb-[13px] flex items-center justify-between">
        <button
          onClick={() => setCurrent((prev) => prev.subtract(1, "month"))}
          aria-label={t("label.prevMonth")}
          className="cursor-pointer p-2"
        >
          <Image src="/assets/icons/ic_chevron_left.svg" alt={t("label.prevMonth")} width={24} height={24} />
        </button>
        <div className="text-lg font-bold text-black">{current.format("YYYY. MM")}</div>
        <button
          onClick={() => setCurrent((prev) => prev.add(1, "month"))}
          aria-label={t("label.nextMonth")}
          className="cursor-pointer p-2"
        >
          <Image src="/assets/icons/ic_chevron_right.svg" alt={t("label.nextMonth")} width={24} height={24} />
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 px-[12.5px] text-center text-[13px] font-medium text-gray-400">
        {days.map((d) => (
          <div key={d} className="flex h-[38px] items-center justify-center">
            {d}
          </div>
        ))}
      </div>

      {/* 날짜 셀 */}
      <div className="grid grid-cols-7 px-[14.5px] text-center text-sm font-medium">
        {gridDates.map(({ date, isOtherMonth }, idx) => {
          const day = dayjs(date).date();
          const disabled = isPast(date);
          const selected = isSelected(date);

          return (
            <div key={idx} className="p-1">
              <button
                disabled={disabled}
                onClick={() => onSelectDate(date)}
                className={clsx("h-[38px] w-10 cursor-pointer rounded-xl text-sm font-medium", {
                  "cursor-default text-gray-300": disabled,
                  "text-gray-400": isOtherMonth && !disabled,
                  "hover:bg-gray-100": !disabled && !isOtherMonth,
                  "bg-orange-400 text-white": selected
                })}
              >
                {day}
              </button>
            </div>
          );
        })}{" "}
      </div>

      {/* 선택완료 버튼 */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={onConfirm}
          disabled={!selectedDate}
          className={clsx(
            "h-[54px] w-[279px] cursor-pointer rounded-xl py-3 text-base font-semibold text-white",
            selectedDate ? "bg-orange-400" : "bg-gray-100"
          )}
        >
          {t("button.confirm")}
        </button>
      </div>
    </div>
  );
}

export default DatePicker;
