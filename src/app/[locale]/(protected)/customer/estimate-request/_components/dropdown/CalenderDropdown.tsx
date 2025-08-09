import { useMemo, useState } from "react";
import { useLocale } from "use-intl";
import Image from "next/image";
import clsx from "clsx";
import DatePicker from "../datepicker/DatePicker";

interface CalenderDropdownProps {
  date: Date | null;
  onChange: (date: Date) => void;
}

function CalenderDropdown({ date, onChange }: CalenderDropdownProps) {
  const [open, setOpen] = useState(false);

  const locale = useLocale();

  const formatted = useMemo(() => {
    const target = date ?? new Date();
    return target.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }, [date, locale]);

  const handleToggle = () => setOpen((prev) => !prev);

  const handleConfirm = () => {
    if (date) setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleToggle}
        className={clsx(
          "flex h-[50px] w-100 cursor-pointer items-center justify-between rounded-xl border bg-white pr-3 pl-5 text-black",
          date ? "border-[var(--color-orange-400)]" : "border-[var(--color-gray-100)]"
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="datepicker-popup"
        aria-label={date ? `선택된 날짜: ${formatted}` : "날짜 선택"}
      >
        <span className="flex items-center gap-2">
          <Image src="/assets/icons/ic_calendar.svg" alt="" aria-hidden="true" width={24} height={24} />
          <span className={clsx("font-medium", !date && "text-black-400")}>{formatted}</span>
        </span>

        <Image
          src={`/assets/icons/${open ? "ic_chevron_up" : "ic_chevron_down"}.svg`}
          alt={open ? "달력 접기" : "달력 펼치기"}
          width={36}
          height={36}
        />
      </button>

      {open && (
        <div
          id="datepicker-popup"
          className="absolute top-[60px] z-10 w-100"
          role="dialog"
          aria-modal="false"
          aria-label="날짜 선택 달력"
        >
          <DatePicker selectedDate={date} onSelectDate={onChange} onConfirm={handleConfirm} />
        </div>
      )}
    </div>
  );
}

export default CalenderDropdown;
