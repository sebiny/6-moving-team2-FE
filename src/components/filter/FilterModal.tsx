// 모달창
import { useState } from "react";
import Button from "@/components/Button";
import ChipCircle from "../chip/ChipCircle";
import CustomCheckbox from "../button/CustomCheckbox";
import { useTranslations } from "next-intl";

interface FilterModalProps {
  onClose: () => void;
  selectedMoveTypes: string[];
  setSelectedMoveTypes: (types: string[]) => void;
  isDesignatedChecked: boolean;
  setIsDesignatedChecked: (checked: boolean) => void;
  isAvailableRegionChecked: boolean;
  setIsAvailableRegionChecked: (checked: boolean) => void;
}

export default function FilterModal({
  onClose,
  selectedMoveTypes,
  setSelectedMoveTypes,
  isDesignatedChecked,
  setIsDesignatedChecked,
  isAvailableRegionChecked,
  setIsAvailableRegionChecked
}: FilterModalProps) {
  const t = useTranslations("ReceivedReq.filter");
  const tMove = useTranslations("ReceivedReq");
  const MOVE_TYPES = [tMove("smallMove"), tMove("homeMove"), tMove("officeMove")];
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(0,0,0,0.3)] md:items-center"
      onClick={onClose}
    >
      <div
        className="relative w-full rounded-t-3xl bg-white px-6 py-8 md:w-[370px] md:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button className="absolute top-4 right-7 text-2xl" onClick={onClose}>
          ×
        </button>

        <h2 className="mb-6 text-lg font-bold">{t("filter")}</h2>

        {/* 이사 유형 */}
        <div className="mb-6">
          <p className="mb-2 font-semibold">{t("moveType")}</p>
          <div className="flex flex-wrap gap-2">
            {MOVE_TYPES.map((type) => (
              <ChipCircle
                key={type}
                type="region"
                text={type}
                color="gray"
                click={true}
                isSelected={selectedMoveTypes.includes(type)}
                onSelect={(text) => {
                  setSelectedMoveTypes(
                    selectedMoveTypes.includes(text)
                      ? selectedMoveTypes.filter((t) => t !== text)
                      : [...selectedMoveTypes, text]
                  );
                }}
              />
            ))}
          </div>
        </div>

        {/* 지역 및 견적 */}
        <div className="mb-6">
          <p className="mb-2 font-semibold">{t("areaAndEst")}</p>
          <div className="mb-2 flex items-center gap-2">
            <CustomCheckbox
              checked={isDesignatedChecked}
              onChange={(checked) => {
                setIsDesignatedChecked(checked);
                if (checked) setIsAvailableRegionChecked(false);
              }}
              shape="square"
            />
            <span>{t("req")}</span>
          </div>
          <div className="flex items-center gap-2">
            <CustomCheckbox
              checked={isAvailableRegionChecked}
              onChange={(checked) => {
                setIsAvailableRegionChecked(checked);
                if (checked) setIsDesignatedChecked(false);
              }}
              shape="square"
            />
            <span>{t("service")}</span>
          </div>
        </div>

        <Button type="orange" text={t("btn")} onClick={onClose} />
      </div>
    </div>
  );
}
