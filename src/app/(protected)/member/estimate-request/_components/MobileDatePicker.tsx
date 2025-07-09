"use client";

import { useState } from "react";
import dayjs from "dayjs";
import clsx from "clsx";
import Image from "next/image";

interface MobileDatePickerProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date | null) => void;
}

export default function MobileDatePicker({ selectedDate, onSelectDate }: MobileDatePickerProps) {
  const today = dayjs();
  const [current, setCurrent] = useState(dayjs());

  const days = ["일", "월", "화", "수", "목", "금", "토"];

  const getCalendarDates = () => {
    const startOfMonth = current.startOf("month");
    const endOfMonth = current.endOf("month");
    const startDay = startOfMonth.day();
    const daysInMonth = endOfMonth.date();

    // TODO: 날짜 계산 유틸함수로 빼기
    // 저번 달 날짜 계산
    const prevMonth = current.subtract(1, "month");
    const prevMonthDays = prevMonth.daysInMonth();

    const prevDates = Array.from({ length: startDay }, (_, i) => ({
      date: prevMonth.date(prevMonthDays - startDay + i + 1).toDate(),
      isOtherMonth: true
    }));

    // 이번 달 날짜 계산
    const thisDates = Array.from({ length: daysInMonth }, (_, i) => ({
      date: current.date(i + 1).toDate(),
      isOtherMonth: false
    }));

    const total = prevDates.length + thisDates.length;
    const nextNeeded = total <= 35 ? 35 - total : 42 - total;

    // 다음 달 날짜 계산
    const nextDates = Array.from({ length: nextNeeded }, (_, i) => ({
      date: current
        .add(1, "month")
        .date(i + 1)
        .toDate(),
      isOtherMonth: true
    }));

    return [...prevDates, ...thisDates, ...nextDates];
  };

  const isSelected = (date: Date) => selectedDate && dayjs(date).isSame(dayjs(selectedDate), "date");
  const isPast = (date: Date) => dayjs(date).isBefore(today, "day");

  return (
    <div className="mx-auto w-[336px]">
      {/* 헤더 */}
      <div className="mb-8 flex items-center justify-center gap-3 text-xl leading-8 font-bold text-black">
        <button onClick={() => setCurrent((prev) => prev.subtract(1, "month"))}>
          <Image src="/assets/icons/ic_chevron_left.svg" width={24} height={24} alt="이전" />
        </button>
        <span>{current.format("YYYY. MM")}</span>
        <button onClick={() => setCurrent((prev) => prev.add(1, "month"))}>
          <Image src="/assets/icons/ic_chevron_right.svg" width={24} height={24} alt="다음" />
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
          {getCalendarDates().map(({ date, isOtherMonth }, idx) => {
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
