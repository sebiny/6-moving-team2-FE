"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface SortDropdownType {
  sortings: string[];
  sort: string;
  setSort: (value: string) => void;
  translator: (key: string) => string;
}

function SortDropdown({ sortings, sort, setSort, translator }: SortDropdownType) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleClick = (sorting: string) => {
    setIsModalOpen(false);
    setSort(sorting);
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
      <button
        onClick={() => setIsModalOpen((prev) => !prev)}
        className="flex cursor-pointer items-center justify-center gap-[10px] px-2 py-[10px] text-xs lg:text-sm"
        aria-expanded={isModalOpen}
        aria-haspopup="listbox"
        aria-label="정렬 옵션 선택"
      >
        <div className={`${isModalOpen ? "text-gray-400" : "text-black-400"}`}>
          {/* {TranslateSorting(sort)} */}
          {translator(sort)}
        </div>
        {isModalOpen ? (
          <Image src="/assets/icons/ic_chevron_up.svg" alt="정렬 옵션 접기" width={20} height={20} />
        ) : (
          <Image src="/assets/icons/ic_chevron_down.svg" alt="정렬 옵션 펼치기" width={20} height={20} />
        )}
      </button>
      {isModalOpen && (
        <div
          className="border-line-100 absolute top-10 left-0 z-20 w-full cursor-pointer rounded-lg border bg-white"
          role="listbox"
          aria-label="정렬 옵션 목록"
        >
          {sortings.map((sorting) => (
            <div
              key={sorting}
              onClick={() => handleClick(sorting)}
              className="text-black-400 px-[10px] py-[6px] text-xs leading-normal font-medium lg:px-3 lg:py-2 lg:text-sm"
              role="option"
              aria-selected={sort === sorting}
            >
              {/* {TranslateSorting(sorting)} */}
              {translator(sorting)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SortDropdown;
