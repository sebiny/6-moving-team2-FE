"use client";
import Image from "next/image";
import React, { useState } from "react";

function SortDropdown() {
  const [sort, setSort] = useState("리뷰 많은순");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sortings = ["리뷰 많은순", "평점 높은순", "경력 높은순", "확정 많은순"] as const;

  const handleClick = (sorting: "리뷰 많은순" | "평점 높은순" | "경력 높은순" | "확정 많은순") => {
    setIsModalOpen(false);
    setSort(sorting);
  };

  return (
    <div className="relative">
      <div onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-[10px] px-2 py-[7px]">
        <div className="text-gray-400">{sort}</div>
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
