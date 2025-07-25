// 기사님 -> 받은 요청 페이지 필터 컴포넌트
"use client";

import { useState } from "react";
import FilterToggleButton from "./FilterToggleButton";
import FilterModal from "./FilterModal";

interface FilterSectionProps {
  selectedMoveTypes: string[];
  setSelectedMoveTypes: (types: string[]) => void;
  isDesignatedChecked: boolean;
  setIsDesignatedChecked: (checked: boolean) => void;
  isAvailableRegionChecked: boolean;
  setIsAvailableRegionChecked: (checked: boolean) => void;
}

export default function FilterSection({
  selectedMoveTypes,
  setSelectedMoveTypes,
  isDesignatedChecked,
  setIsDesignatedChecked,
  isAvailableRegionChecked,
  setIsAvailableRegionChecked
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = () => setIsOpen((prev) => !prev);
  const closeFilter = () => setIsOpen(false);

  return (
    <>
      <FilterToggleButton isOpen={isOpen} onClick={toggleFilter} />
      {isOpen && (
        <FilterModal
          onClose={closeFilter}
          selectedMoveTypes={selectedMoveTypes}
          setSelectedMoveTypes={setSelectedMoveTypes}
          isDesignatedChecked={isDesignatedChecked}
          setIsDesignatedChecked={setIsDesignatedChecked}
          isAvailableRegionChecked={isAvailableRegionChecked}
          setIsAvailableRegionChecked={setIsAvailableRegionChecked}
        />
      )}
    </>
  );
}
