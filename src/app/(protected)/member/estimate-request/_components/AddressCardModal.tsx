"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import AddressResultCard from "./AddressResultCard";

interface AddressCardModalProps {
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmLabel: string;
  onChange: (value: string) => void;
}

export default function AddressCardModal({ title, onClose, confirmLabel, onChange }: AddressCardModalProps) {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState(false);

  // 외부 상태 전달
  useEffect(() => {
    onChange(inputValue);
  }, [inputValue, onChange]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#141414]/40">
      <div className="flex w-[292px] flex-col justify-between rounded-3xl bg-white px-4 py-6 shadow-xl md:w-[608px] md:rounded-4xl md:px-6 md:pt-8 md:pb-10">
        {/* 상단 헤더 */}
        <div className="mb-[30px] flex items-center justify-between md:mb-10">
          <h2 className="text-lg font-bold md:text-2xl">{title}</h2>
          <button onClick={onClose}>
            <Image src="/assets/icons/ic_X.svg" alt="닫기" width={24} height={24} className="md:h-9 md:w-9" />
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          {/* 인풋 영역 */}
          <div className="mb-4 w-full md:mb-6">
            <div className="flex h-[52px] w-full items-center justify-between rounded-2xl bg-[var(--color-background-100)] px-4 md:h-[64px]">
              {/* 입력 필드 */}
              <input
                type="text"
                placeholder="텍스트를 입력해주세요."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="h-[24px] w-[132px] flex-1 bg-transparent text-sm text-black outline-none placeholder:text-[var(--color-black-400)]"
                style={{
                  border: "none",
                  caretColor: "black"
                }}
              />

              {/* 닫기, 검색 버튼 */}
              <div className="flex items-center gap-3 md:gap-4">
                <button type="button" onClick={() => setInputValue("")}>
                  <Image
                    src="/assets/icons/ic_x_circle.svg"
                    width={24}
                    height={24}
                    alt="입력 지우기"
                    className="md:h-9 md:w-9"
                  />
                </button>
                <button type="button" onClick={() => console.log("검색", inputValue)}>
                  <Image
                    src="/assets/icons/ic_search.svg"
                    width={24}
                    height={24}
                    alt="검색"
                    className="md:h-9 md:w-9"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 검색 결과 */}
          <div className="mb-6 w-full text-sm md:mb-10 md:text-base">
            <AddressResultCard
              postalCode="04538"
              roadAddress="서울 중구 삼일대로 343 (대신파이낸스센터)"
              jibunAddress="서울 중구 저동1가 114"
              selected={selected}
              onClick={() => setSelected(!selected)}
            />
          </div>
        </div>

        {/* 확인 버튼 */}
        {/* TODO: md 이상일 때 버튼 스타일 추가, 클릭 함수 추가*/}
        <Button text={confirmLabel} type="orange" />
      </div>
    </div>
  );
}
