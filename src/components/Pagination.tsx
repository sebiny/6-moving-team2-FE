"use client";
import React, { useState } from "react";
import right from "../../public/assets/icons/ic_chevron_right.svg";
import rightBlack from "../../public/assets/icons/ic_chevron_right_black.svg";
import leftBlack from "../../public/assets/icons/ic_chevron_left_black.svg";
import left from "../../public/assets/icons/ic_chevron_left.svg";
import Image from "next/image";
import clsx from "clsx";
export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 9;
  const pageNumbers = [1, 2, 3, 4, 5, "...", 9];
  const handleClick = (num: string | number) => {
    if (typeof num === "number") {
      setCurrentPage(num);
    }
  };
  return (
    <div>
      <div className="flex items-center gap-[10px]">
        {/* 왼쪽 화살표 */}
        <button
          className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center p-[10px] lg:h-12 lg:w-12"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          <Image src={currentPage === 1 ? left : leftBlack} width={24} height={24} alt="left_Icon" />
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
              disabled={num === "..."}
            >
              <span className={clsx(num === "..." ? "pb-3" : "")}>{num}</span>
            </button>
          ))}
        </div>
        {/* 오른쪽화살표 */}
        <button
          className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center p-[10px] lg:h-12 lg:w-12"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          <Image src={rightBlack} width={24} height={24} alt="right_black_Icon" />
        </button>
      </div>
    </div>
  );
}
