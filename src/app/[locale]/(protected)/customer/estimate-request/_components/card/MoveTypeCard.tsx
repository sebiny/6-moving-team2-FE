"use client";

import CheckBox from "@/components/button/CustomCheckbox";
import { useTranslations } from "next-intl";
import Image from "next/image";
import clsx from "clsx";

interface MoveTypeCardProps {
  label: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export default function MoveTypeCard({ label, description, selected, onClick }: MoveTypeCardProps) {
  const t = useTranslations("EstimateReq");
  const imageMap: Record<string, string> = {
    [t("smallBox.text")]: "/assets/images/img_small_moving.svg",
    [t("familyBox.text")]: "/assets/images/img_family_moving.svg",
    [t("officeBox.text")]: "/assets/images/img_office_moving.svg"
  };

  const iconSrc = imageMap[label];

  return (
    <article
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onClick();
        }
      }}
      className={clsx(
        "relative flex flex-col rounded-2xl border-2 px-4 pt-5 pb-5 text-left transition-colors md:pb-4",
        "h-[160px] w-[327px] cursor-pointer md:h-[222px] md:w-50 lg:h-[222px] lg:w-[256px]",
        selected ? "border-orange-400 bg-orange-100" : "bg-background-200 border-transparent",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
      )}
    >
      <div className="flex h-full w-full flex-row justify-between md:flex-col">
        <div className="flex flex-col gap-2 md:flex-grow md:flex-row md:items-start">
          {/* 체크박스 */}
          <CheckBox checked={selected} />

          {/* 텍스트 */}

          <header className="flex flex-col">
            <h3 className={clsx("leading-6 font-semibold", selected ? "text-orange-400" : "text-black")}>{label}</h3>
            <p className={clsx("text-sm", selected ? "text-orange-400" : "text-gray-500")}>{description}</p>
          </header>
        </div>

        {/* 이미지 */}
        <Image
          src={iconSrc}
          alt=""
          aria-hidden={true}
          width={120}
          height={120}
          priority
          unoptimized
          className="self-center object-contain md:mt-auto md:self-end"
        />
      </div>
    </article>
  );
}
