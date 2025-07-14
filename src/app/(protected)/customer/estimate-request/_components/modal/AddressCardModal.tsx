"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import AddressResultCard from "../card/AddressResultCard";
import DaumPostcodeModal from "./DaumPostcodeModal";
import { Address } from "@/types/Address";

interface AddressCardModalProps {
  title: string;
  onClose: () => void;
  onConfirm: (address: Address) => void;
  confirmLabel: string;
  onChange: (value: string) => void;
  selectedValue: string;
}

export default function AddressCardModal({
  title,
  onClose,
  confirmLabel,
  onConfirm,
  selectedValue
}: AddressCardModalProps) {
  const [inputValue, setInputValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showPostcode, setShowPostcode] = useState(false);
  const [addressList, setAddressList] = useState<Address[]>([]);

  // 선택된 주소를 외부로 전달
  useEffect(() => {
    const index = addressList.findIndex((addr) => addr.roadAddress === selectedValue);
    if (index !== -1) {
      setSelectedIndex(index);
    }
  }, [selectedValue]);

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
              <input
                type="text"
                placeholder="텍스트를 입력해주세요."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && inputValue.trim() !== "") {
                    setShowPostcode(true);
                  }
                }}
                className="h-[24px] w-[132px] flex-1 bg-transparent text-sm text-black outline-none placeholder:text-[var(--color-black-400)]"
                style={{ border: "none", caretColor: "black" }}
              />

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
                <button type="button" onClick={() => setShowPostcode(true)}>
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
          <div
            className="mb-6 flex w-full flex-col gap-4 overflow-y-auto text-sm md:mb-10 md:text-base"
            style={{ maxHeight: "168px" }}
          >
            {addressList.map((addr, idx) => (
              <AddressResultCard
                key={addr.id}
                postalCode={addr.postalCode}
                roadAddress={addr.roadAddress}
                jibunAddress={addr.jibunAddress}
                selected={selectedIndex === idx}
                onClick={() => {
                  setSelectedIndex((prev) => (prev === idx ? null : idx));
                }}
              />
            ))}
          </div>
        </div>

        {/* 확인 버튼 */}
        <Button
          text={confirmLabel}
          type="orange"
          onClick={() => {
            if (selectedIndex !== null) {
              onConfirm(addressList[selectedIndex]);
            }
          }}
          isDisabled={selectedIndex === null}
        />
      </div>

      {showPostcode && (
        <DaumPostcodeModal
          query={inputValue}
          onClose={() => setShowPostcode(false)}
          onComplete={(addr) => {
            console.log("주소 확인", addr);
            const newAddress: Address = {
              id: Date.now(), //TODO: 실제로는 백엔드 응답 id 사용하도록 수정
              postalCode: addr.zonecode,
              roadAddress: addr.roadAddress,
              jibunAddress: addr.jibunAddress
            };

            setAddressList((prev) => [...prev, newAddress]);
            setSelectedIndex(addressList.length);
          }}
        />
      )}
    </div>
  );
}
