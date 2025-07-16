// 기사님 -> 받은 요청 페이지 필터 컴포넌트
"use client";

import { useState } from "react";
import FilterToggleButton from "./FilterToggleButton";
import FilterModal from "./FilterModal";

export default function FilterSection() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = () => setIsOpen((prev) => !prev);
  const closeFilter = () => setIsOpen(false);

  return (
    <>
      <FilterToggleButton isOpen={isOpen} onClick={toggleFilter} />
      {isOpen && <FilterModal onClose={closeFilter} />}
    </>
  );
}
