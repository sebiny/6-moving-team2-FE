"use client";

import Image from "next/image";
import { useState } from "react";

interface MoveTypeCardProps {
  label: string;
  description: string;
}

// TODO: 한 번에 한 카드만 선택가능하도록 부모 컴포넌트에서 관리해야함.
export default function MoveTypeCard({ label, description }: MoveTypeCardProps) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected((prev) => !prev);
  };

  const imageMap: Record<string, string> = {
    소형이사: "/assets/images/img_small_moving.svg",
    가정이사: "/assets/images/img_family_moving.svg",
    사무실이사: "/assets/images/img_office_moving.svg"
  };

  const iconSrc = imageMap[label];

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`relative flex flex-col rounded-2xl border-2 px-4 pt-5 pb-5 text-left transition-colors md:pb-4 ${
        selected
          ? "border-[var(--color-orange-400)] bg-[var(--color-orange-100)]"
          : "border-transparent bg-[var(--color-background-200)]"
      } h-[160px] w-[327px] md:h-[222px] md:w-[198.67px] lg:h-[222px] lg:w-[256px]`}
    >
      <div className="flex h-full w-full flex-row justify-between md:flex-col">
        <div className="flex flex-col gap-2 md:flex-grow md:flex-row md:items-start">
          {/* 체크박스 */}
          <div className="h-6 w-6 shrink-0">
            <div
              className={`flex h-[18px] w-[18px] items-center justify-center rounded-full ${
                selected ? "bg-[var(--color-orange-400)]" : "border border-gray-100 bg-[var(--color-background-200)]"
              }`}
            >
              {selected && <Image src="/assets/icons/ic_check.svg" alt="선택됨" width={8} height={5} />}
            </div>
          </div>

          {/* 텍스트 */}
          <div className="flex flex-col">
            <p className={`font-semibold ${selected ? "text-[var(--color-orange-400)]" : "text-black"}`}>{label}</p>
            <p className={`text-sm ${selected ? "text-[var(--color-orange-400)]" : "text-gray-500"}`}>{description}</p>
          </div>
        </div>

        {/* 이미지 */}
        <Image
          src={iconSrc}
          alt={label}
          width={120}
          height={120}
          unoptimized
          className="self-center object-contain md:mt-auto md:self-end"
        />
      </div>
    </button>
  );
}
