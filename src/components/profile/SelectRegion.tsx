import { regionMap } from "@/constant/profile";
import React from "react";
import ChipCircle from "../chip/ChipCircle";

interface SelectRegionType {
  currentAreas?: string[];
  setCurrentAreas?: React.Dispatch<React.SetStateAction<string[]>>;
  currentArea?: string;
  setCurrentArea?: React.Dispatch<React.SetStateAction<string>>;
  type: "customer" | "driver";
}

function SelectRegion({ currentArea, setCurrentArea, setCurrentAreas, currentAreas = [], type }: SelectRegionType) {
  const REGION_OPTIONS = [
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
  ];
  const toggleRegion = (item: string) => {
    if (type === "customer" && setCurrentArea) setCurrentArea(item);
    else if (type === "driver" && setCurrentAreas)
      setCurrentAreas((prev: string[]) => (prev.includes(item) ? prev.filter((r) => r !== item) : [...prev, item]));
  };
  return (
    <div className="flex flex-col gap-2">
      {/* {!isRegionsValid && <p className="text-base text-rose-500">* 1개 이상 선택해주세요.</p>} */}
      {Array.from({ length: Math.ceil(REGION_OPTIONS.length / 5) }).map((_, i) => (
        <div key={i} className="flex gap-1.5 lg:gap-3.5">
          {REGION_OPTIONS.slice(i * 5, i * 5 + 5).map((r) => (
            <ChipCircle
              key={r}
              type="region"
              text={r}
              click
              isSelected={type === "customer" ? currentArea === r : currentAreas.includes(r)}
              onSelect={toggleRegion}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default SelectRegion;
