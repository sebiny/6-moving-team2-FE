"use client";

import { useState } from "react";
import Image from "next/image";
import DatePicker from "./DatePicker";

interface CalenderDropdownProps {
  date: Date | null;
  onChange: (date: Date) => void;
}

function CalenderDropdown({ date, onChange }: CalenderDropdownProps) {
  const [open, setOpen] = useState(false);

  const formatted = date
    ? date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    : new Date().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });

  const handleConfirm = () => {
    if (date) setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-[50px] w-100 items-center justify-between rounded-xl border pr-3 pl-5 ${
          date ? "border-[var(--color-orange-400)]" : "border-[var(--color-gray-100)]"
        } bg-white text-black`}
      >
        <div className="flex items-center gap-2">
          <Image src="/assets/icons/ic_calendar.svg" alt="캘린더" width={24} height={24} />
          <span className={`font-medium ${date ? "" : "text-black-400"}`}>{date ? formatted : formatted}</span>
        </div>

        <Image
          src={`/assets/icons/${open ? "ic_chevron_up" : "ic_chevron_down"}.svg`}
          alt="화살표"
          width={36}
          height={36}
        />
      </button>

      {open && (
        <div className="absolute top-[60px] z-10 w-100">
          <DatePicker selectedDate={date} onSelectDate={onChange} onConfirm={handleConfirm} />
        </div>
      )}
    </div>
  );
}

export default CalenderDropdown;
