"use client";
import React, { useState } from "react";
import right from "../../public/assets/icons/ic_chevron_right.svg";
import rightBlack from "../../public/assets/icons/ic_chevron_right_black.svg";
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
      <div className="flex gap-[10px]">
        {/* 왼쪽 화살표 */}
        <button
          className="flex h-12 w-12 cursor-pointer items-center justify-center p-[10px]"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          <Image src={left} width={24} height={24} alt="left_Icon" />
        </button>

        {/* 페이지 버튼 */}
        <div className="flex gap-1">
          {pageNumbers.map((num, index) => (
            <button
              key={index}
              className={clsx(
                "flex h-12 w-12 items-center justify-center p-[10px]",
                "font- cursor-pointer text-center text-[18px] font-medium",
                {
                  "text-black": currentPage === num,
                  "text-gray-300": currentPage !== num
                }
              )}
              onClick={() => handleClick(num)}
              disabled={num === "..."}
            >
              <span className={clsx(num === "..." ? "pb-3" : "pb-1")}>{num}</span>
            </button>
          ))}
        </div>
        {/* 오른쪽화살표 */}
        <button
          className="flex h-12 w-12 cursor-pointer items-center justify-center p-[10px]"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          <Image src={rightBlack} width={24} height={24} alt="right_black_Icon" />
        </button>
      </div>
    </div>
  );
}
