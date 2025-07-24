import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TranslateRegion, TranslateService } from "@/utills/TranslateFunction";

interface DropdownProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  isMultiColumn?: boolean;
  type?: "region" | "service";
  translator: (key: string) => string;
}

function FilterDropdown({
  label,
  options,
  selected,
  onSelect,
  isMultiColumn = false,
  type = "service",
  translator
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = selected !== "" || open;

  const handleSelect = (item: string) => {
    onSelect(item === selected ? "" : item);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const buttonClass = `flex items-center justify-between gap-[6px] rounded-xl px-[14px] py-2 
    md:h-[50px] md:w-40 md:px-5 md:py-4
    ${
      isActive
        ? "border border-[var(--color-orange-400)] bg-[var(--color-orange-100)] text-[var(--color-orange-400)]"
        : "border border-[var(--color-line-200)] bg-white text-[var(--color-black-300)]"
    }`;

  const itemClass =
    "px-[14px] py-[6px] text-sm leading-6 font-medium hover:bg-[var(--color-orange-100)] cursor-pointer md:px-5 md:py-5 md:text-base";

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 버튼 */}
      <button onClick={() => setOpen((prev) => !prev)} className={buttonClass}>
        <span className="truncate text-sm font-medium md:text-base">{selected ? translator(selected) : label} </span>
        <Image
          src={`/assets/icons/${open ? "ic_chevron_up" : "ic_chevron_down"}.svg`}
          alt="화살표"
          width={36}
          height={36}
          className="h-5 w-5 md:h-9 md:w-9"
        />
      </button>

      {/* 드롭다운 메뉴 */}
      {/* TODO: 옵션 개수에 맞춰 유동적으로 메뉴 크기 조정하기, 스크롤바 꾸미기 */}
      {open && (
        <div
          className={`absolute z-10 mt-3 rounded-lg border border-[var(--color-line-200)] bg-white shadow-md md:rounded-2xl ${isMultiColumn ? "grid h-[180px] w-[150px] grid-cols-2 overflow-y-auto md:h-[320px] md:w-[320px]" : "w-[106px] overflow-y-auto md:w-[160px]"}`}
        >
          {isMultiColumn ? (
            options.map((item, idx) => (
              <div
                key={item + idx}
                onClick={() => handleSelect(item)}
                className={`${itemClass} ${idx % 2 === 0 ? "border-r border-[var(--color-line-200)]" : ""} ${
                  item === selected ? "bg-[var(--color-orange-100)] text-[var(--color-orange-400)]" : ""
                }`}
              >
                {/* {type === "service" ? TranslateService(item) : TranslateRegion(item)} */}
                {translator(item)}
              </div>
            ))
          ) : (
            <ul>
              {options.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className={`${itemClass} ${item === selected ? "bg-[var(--color-orange-100)] text-[var(--color-orange-400)]" : ""}`}
                >
                  {/* {type === "service" ? TranslateService(item) : TranslateRegion(item)} */}
                  {translator(item)}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
