// 모달창
import { useState } from "react";
import Button from "@/components/Button";
import ChipCircle from "../chip/ChipCircle";
import CustomCheckbox from "../button/CustomCheckbox";

const MOVE_TYPES = ["소형이사", "가정이사", "사무실이사"];

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

        <h2 className="mb-6 text-lg font-bold">필터</h2>

        {/* 이사 유형 */}
        <div className="mb-6">
          <p className="mb-2 font-semibold">이사 유형</p>
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
          <p className="mb-2 font-semibold">지역 및 견적</p>
          <div className="mb-2 flex items-center gap-2">
            <CustomCheckbox 
              checked={isDesignatedChecked} 
              onChange={(checked) => {
                setIsDesignatedChecked(checked);
                if (checked) setIsAvailableRegionChecked(false);
              }} 
              shape="square" 
            />
            <span>지정 견적 요청</span>
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
            <span>서비스 가능 지역</span>
          </div>
        </div>

        <Button type="orange" text="조회하기" onClick={onClose} />
      </div>
    </div>
  );
}
