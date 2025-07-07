"use client";
import Image from "next/image";
import React, { useState } from "react";

interface SortDropdownType {
  sortings: string[];
  value: string;
}

function SortDropdown({ sortings, value }: SortDropdownType) {
  const [sort, setSort] = useState(value);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (sorting: string) => {
    setIsModalOpen(false);
    setSort(sorting);
  };

  return (
    <div className="relative">
      <div onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-[10px] px-2 py-[7px]">
        <div className={`${isModalOpen ? "text-gray-400" : "text-black-400"}`}>{sort}</div>
        {isModalOpen ? (
          <Image src="/assets/icons/ic_chevron_up.svg" alt="정렬" width={20} height={20} />
        ) : (
          <Image src="/assets/icons/ic_chevron_down.svg" alt="정렬" width={20} height={20} />
        )}
      </div>
      {isModalOpen && (
        <div className="border-line-100 absolute top-10 left-0 w-full rounded-lg border bg-white">
          {sortings.map((sorting) => (
            <div
              key={sorting}
              onClick={() => handleClick(sorting)}
              className="text-black-400 px-[10px] py-[7px] font-medium"
            >
              {sorting}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SortDropdown;
