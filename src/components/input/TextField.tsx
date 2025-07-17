"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";

interface TextFieldProps {
  id?: string;
  type?: "text" | "password";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  className?: string;
  mdHeight?: "64" | "54"; // md 사이즈에서 64px 와 54px 중 선택
}
export default function TextField({
  type = "text",
  placeholder = "",
  value: controlledValue,
  onChange,
  error,
  className,
  mdHeight = "64"
}: TextFieldProps) {
  const [internalValue, setInternalValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const isEmpty = value === "";
  const isTyping = isFocused && !isEmpty;
  const hasError = !!error;
  const size = isMobile ? "sm" : "md";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 744); // md breakpoint 기준
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
    else setInternalValue(e.target.value);
  };

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const styles = {
    wrapper: clsx(
      "flex flex-col",
      hasError
        ? size === "md"
          ? "h-[6.125rem] gap-2" // 98px
          : "h-[5rem] gap-1" // 80px
        : size === "md"
          ? mdHeight === "64"
            ? "h-16" // 64px (Tailwind 기본)
            : "h-[3.375rem]" // 54px
          : "h-[3.375rem]",
      className
    ),
    container: clsx(
      "flex items-center rounded-xl border bg-gray-50 transition-colors",
      size === "md" ? "px-6 py-[0.875rem]" : "px-4 py-[0.875rem]", // 14px = 0.875rem
      hasError
        ? "border-[#FF4F64]"
        : isTyping
          ? "border-[var(--color-orange-400)]"
          : isFocused
            ? size === "md"
              ? "border-line-200"
              : "border-gray-100"
            : "border-line-200",
      size === "md" ? (mdHeight === "64" ? "h-16" : "h-[3.375rem]") : "h-[3.375rem]"
    ),
    inputBox: clsx(
      "flex justify-between items-center w-full",
      isFocused ? "gap-[0.625rem] h-[2rem]" : "gap-0 h-[1.625rem]" // 10px, 32px, 26px
    ),
    inputText: clsx(
      "font-['Pretendard'] w-full outline-none bg-transparent",
      size === "md"
        ? "text-[1.125rem] leading-[1.625rem]" // 18px, 26px
        : "text-sm leading-[1.625rem]", // 14px, 26px
      isTyping ? "text-black-400" : isFocused ? "text-gray-500" : "text-gray-400"
    ),
    errorText: clsx(
      "text-[#FF4F64] font-['Pretendard'] font-medium",
      size === "md" ? "text-base h-[1.625rem]" : "text-xs h-[1.375rem]"
    ),
    iconSize: size === "md" ? 24 : 20
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.inputBox}>
          <input
            type={type === "password" && !isVisible ? "password" : "text"}
            className={styles.inputText}
            placeholder={placeholder}
            value={value}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleChange}
          />
          {type === "password" && (
            <button type="button" onClick={toggleVisibility}>
              <Image
                src={isVisible ? "/assets/icons/ic_visibility_true.svg" : "/assets/icons/ic_visibility_false.svg"}
                alt="비밀번호 표시 토글"
                width={styles.iconSize}
                height={styles.iconSize}
              />
            </button>
          )}
        </div>
      </div>
      {hasError && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
