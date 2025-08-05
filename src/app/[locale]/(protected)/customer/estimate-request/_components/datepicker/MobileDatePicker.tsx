"use client";

import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import clsx from "clsx";
import Image from "next/image";
import { generateCalendarDates, setDayjsLocale } from "@/utills/dateUtils";
import { useLocale, useTranslations } from "use-intl";

interface MobileDatePickerProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date | null) => void;
}

export default function MobileDatePicker({ selectedDate, onSelectDate }: MobileDatePickerProps) {
  const t = useTranslations("Date");
  const locale = useLocale();
  const [current, setCurrent] = useState(() => dayjs());
  const today = useMemo(() => dayjs(), []);

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
    <div className="mx-auto w-[336px]">
      {/* 헤더 */}
      <div className="mb-8 flex items-center justify-center gap-3 text-xl leading-8 font-bold text-black">
        <button onClick={() => setCurrent((prev) => prev.subtract(1, "month"))} aria-label={t("label.prevMonth")}>
          <Image src="/assets/icons/ic_chevron_left.svg" width={24} height={24} alt={t("label.nextMonth")} />
        </button>
        <span>{current.format("YYYY. MM")}</span>
        <button onClick={() => setCurrent((prev) => prev.add(1, "month"))} aria-label={t("label.nextMonth")}>
          <Image src="/assets/icons/ic_chevron_right.svg" width={24} height={24} alt={t("label.nextMonth")} />
        </button>
      </div>

      <div className="h-[288px] w-full">
        {/* 요일 */}
        <div className="grid grid-cols-7 text-center text-gray-400">
          {days.map((d) => (
            <div key={d} className="flex h-10 items-center justify-center">
              {d}
            </div>
          ))}
        </div>

        {/* 날짜 */}
        <div className="grid grid-cols-7">
          {gridDates.map(({ date, isOtherMonth }, idx) => {
            const day = dayjs(date).date();
            const disabled = isPast(date);
            const selected = isSelected(date);

            return (
              <div key={idx} className="flex items-center justify-center">
                <button
                  disabled={disabled}
                  onClick={() => onSelectDate(selected ? null : date)}
                  className={clsx(
                    "h-12 w-12 rounded-xl text-center",
                    disabled && "cursor-default text-gray-100",
                    !disabled && isOtherMonth && "text-gray-100",
                    !disabled && !isOtherMonth && "text-black-500 hover:bg-gray-100",
                    selected && "bg-[var(--color-orange-400)] text-white"
                  )}
                >
                  {day}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
