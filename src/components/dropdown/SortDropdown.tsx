"use client";
import { TranslateSorting } from "@/utills/TranslateFunction";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface SortDropdownType {
  sortings: string[];
  sort: string;
  setSort?: (value: string) => void;
}

function SortDropdown({ sortings, sort, setSort }: SortDropdownType) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = (sorting: string) => {
    setIsModalOpen(false);
    if (setSort) setSort(sorting);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      <div onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-[10px] px-2 py-[7px]">
        <div className={`${isModalOpen ? "text-gray-400" : "text-black-400"}`}>{TranslateSorting(sort)}</div>
        {isModalOpen ? (
          <Image src="/assets/icons/ic_chevron_up.svg" alt="정렬" width={20} height={20} />
        ) : (
          <Image src="/assets/icons/ic_chevron_down.svg" alt="정렬" width={20} height={20} />
        )}
      </div>
      {isModalOpen && (
        <div className="border-line-100 absolute top-10 left-0 z-20 w-full rounded-lg border bg-white">
          {sortings.map((sorting) => (
            <div
              key={sorting}
              onClick={() => handleClick(sorting)}
              className="text-black-400 px-[10px] py-[7px] font-medium"
            >
              {TranslateSorting(sorting)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SortDropdown;
