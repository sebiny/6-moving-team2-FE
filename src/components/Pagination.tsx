"use client";
import React, { useState } from "react";
import right from "/assets/icons/ic_chevron_right.svg";
import Image from "next/image";
import clsx from "clsx";
import useMediaHook from "@/hooks/useMediaHook";

interface PaginationType {
  totalReviews?: number;
  pageSize?: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({
  totalReviews = 28,
  pageSize = 4,
  currentPage = 1,
  setCurrentPage
}: PaginationType) {
  const { isLg } = useMediaHook();
  const totalPages = Math.ceil(totalReviews / pageSize);
  const visiblePage = isLg ? 7 : 5;

  const handleClick = (num: string | number) => {
    if (typeof num === "number") {
      setCurrentPage(num);
    }
  };

  const getVisiblePages = (visiblePage: number, currentPage: number, totalPage: number) => {
    const pages = [];
    let start = Math.max(1, currentPage - Math.floor(visiblePage / 2));
    let end = start + visiblePage - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - visiblePage + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };
  const pageNumbers = getVisiblePages(visiblePage, currentPage, totalPages);
  return (
    <div>
      <div className="flex items-center gap-[10px]">
        {/* 왼쪽 화살표 */}
        <button
          className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center p-[10px] lg:h-12 lg:w-12"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          <Image
            src={currentPage === 1 ? "/assets/icons/ic_chevron_left.svg" : "/assets/icons/ic_chevron_left_black.svg"}
            width={24}
            height={24}
            alt="left_Icon"
          />
        </button>

        {/* 페이지 버튼 */}
        <div className="flex gap-1">
          {pageNumbers.map((num, index) => (
            <button
              key={index}
              className={clsx(
                "flex h-[34px] w-[34px] items-center justify-center p-[10px] lg:h-12 lg:w-12",
                "font- cursor-pointer text-center text-[16px] font-medium lg:text-[18px]",
                {
                  "text-black": currentPage === num,
                  "text-gray-300": currentPage !== num
                }
              )}
              onClick={() => handleClick(num)}
            >
              <span>{num}</span>
            </button>
          ))}
        </div>
        {/* 오른쪽화살표 */}
        <button
          className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center p-[10px] lg:h-12 lg:w-12"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          <Image src="/assets/icons/ic_chevron_right_black.svg" width={24} height={24} alt="right_black_Icon" />
        </button>
      </div>
    </div>
  );
}
