"use client";

import CheckBox from "@/components/button/CustomCheckbox";
import { useTranslations } from "next-intl";
import Image from "next/image";

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
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-col rounded-2xl border-2 px-4 pt-5 pb-5 text-left transition-colors md:pb-4 ${
        selected
          ? "border-[var(--color-orange-400)] bg-[var(--color-orange-100)]"
          : "border-transparent bg-[var(--color-background-200)]"
      } h-[160px] w-[327px] md:h-[222px] md:w-50 lg:h-[222px] lg:w-[256px]`}
    >
      <div className="flex h-full w-full flex-row justify-between md:flex-col">
        <div className="flex flex-col gap-2 md:flex-grow md:flex-row md:items-start">
          {/* 체크박스 */}
          <CheckBox checked={selected} />

          {/* 텍스트 */}
          <div className="flex flex-col">
            <p className={`leading-6 font-semibold ${selected ? "text-[var(--color-orange-400)]" : "text-black"}`}>
              {label}
            </p>
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
