import React, { useState } from "react";
import Image from "next/image";

interface SearchBarProps {
  placeholder?: string;
  size?: "md" | "sm";
  width?: string; // override 용
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
}

export default function SearchBar({
  placeholder = "텍스트를 입력해 주세요.",
  size = "md",
  width,
  value: controlledValue,
  onChange,
  onSearch
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // 상태 판별
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const isEmpty = value === "";
  const isActive = isFocused && !isEmpty;

  // 사이즈별 스타일 분기
  const styles = {
    container: size === "sm" ? "h-12 px-4 py-3.5 gap-1.5" : "h-16 px-6 py-3.5 gap-2",
    iconWrapper: size === "sm" ? "h-6 w-6" : "h-9 w-9",
    inputText: size === "sm" ? "text-sm leading-normal" : "text-lg leading-relaxed",
    iconSize: size === "sm" ? 20 : 24
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
    else setInternalValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value);
    }
  };

  const handleSearchClick = () => {
    if (onSearch) onSearch(value);
  };

  return (
    <div
      className={`inline-flex items-center overflow-hidden rounded-2xl bg-neutral-50 ${styles.container} ${width ?? (size === "sm" ? "w-64" : "w-[560px]")}`}
    >
      {/* 왼쪽 검색 아이콘: 입력 전/입력 후에만 표시 */}
      {!isActive && (
        <div className="flex items-center justify-start gap-4">
          <button
            type="button"
            className={`relative flex items-center justify-center overflow-hidden ${styles.iconWrapper}`}
            onClick={handleSearchClick}
          >
            <Image src="/assets/icons/ic_search.svg" alt="검색" width={styles.iconSize} height={styles.iconSize} />
          </button>
        </div>
      )}
      {/* 입력창 */}
      <div className="inline-flex flex-1 flex-col items-center justify-start gap-2.5">
        <div className="inline-flex items-center justify-start gap-96 self-stretch">
          <div className="flex w-full items-center justify-start gap-2">
            <input
              className={`w-full bg-transparent font-['Pretendard'] font-normal outline-none ${styles.inputText} ${isEmpty ? "text-neutral-400" : "text-neutral-800"}`}
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
            />
            {/* 입력 중일 때만 x(클리어) 버튼과 오른쪽 검색 아이콘 */}
            {isActive && (
              <>
                <button
                  onMouseDown={() => {
                    if (onSearch) onSearch("");
                    if (onChange) onChange("");
                    else setInternalValue("");
                  }}
                  className="ml-2 cursor-pointer"
                >
                  <span className="text-xl text-gray-400">×</span>
                </button>
                <button
                  type="button"
                  className={`relative flex items-center justify-center overflow-hidden ${styles.iconWrapper}`}
                  onMouseDown={handleSearchClick}
                >
                  <Image
                    src="/assets/icons/ic_search.svg"
                    alt="검색"
                    width={styles.iconSize}
                    height={styles.iconSize}
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
