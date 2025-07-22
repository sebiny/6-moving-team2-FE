"use client";

import FilterDropdown from "@/components/dropdown/FilterDropdown";
import { useRouter } from "next/navigation";
import React from "react";

interface FiltersType {
  region: string;
  setRegion: (value: string) => void;
  service: string;
  setService: (value: string) => void;
}

function Filters({ region, setRegion, service, setService }: FiltersType) {
  const router = useRouter();
  const handleClick = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("region");
    params.delete("service");
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-8">
      <div className="flex gap-3">
        <FilterDropdown
          label="지역"
          options={[
            "SEOUL",
            "BUSAN",
            "DAEGU",
            "INCHEON",
            "GWANGJU",
            "DAEJEON",
            "ULSAN",
            "SEJONG",
            "GYEONGGI",
            "GANGWON",
            "CHUNGBUK",
            "CHUNGNAM",
            "JEONBUK",
            "JEONNAM",
            "GYEONGBUK",
            "GYEONGNAM",
            "JEJU"
          ]}
          selected={region}
          onSelect={setRegion}
          isMultiColumn
          type="region"
        />
        <FilterDropdown label="서비스" options={["SMALL", "HOME", "OFFICE"]} selected={service} onSelect={setService} />
      </div>
      <p className="hidden cursor-pointer text-gray-300 lg:block" onClick={handleClick}>
        초기화
      </p>
    </div>
  );
}

export default Filters;
