"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import Button from "@/components/Button";
import AddressResultCard from "../card/AddressResultCard";
import DaumPostcodeModal from "./DaumPostcodeModal";
import { Address, DaumPostcodeAddress } from "@/types/Address";
import { createAddress } from "@/lib/api/api-estimateRequest";
import { formatAddress } from "@/utills/AddressMapper";
import { useTranslations } from "next-intl";

interface AddressCardModalProps {
  title: string;
  onClose: () => void;
  onConfirm: (address: Address) => void;
  confirmLabel: string;
  onChange: (value: string) => void;
  selectedAddress?: Address | null;
}

export default function AddressCardModal({
  title,
  onClose,
  confirmLabel,
  onConfirm,
  selectedAddress
}: AddressCardModalProps) {
  const t = useTranslations("EstimateReq");
  const [inputValue, setInputValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showPostcode, setShowPostcode] = useState(false);
  const [addressList, setAddressList] = useState<Address[]>([]);

  // 선택된 주소를 외부로 전달
  useEffect(() => {
    if (selectedAddress) {
      setAddressList([selectedAddress]);
      setSelectedIndex(0);
    } else {
      setAddressList([]);
      setSelectedIndex(null);
    }
  }, [selectedAddress]);

  const handleClearInput = () => setInputValue("");

  const handleSearch = () => {
    if (inputValue.trim()) setShowPostcode(true);
  };

  const handleSelectAddress = (idx: number) => {
    setSelectedIndex((prev) => (prev === idx ? null : idx));
  };

  const handleCompletePostcode = useCallback(async (addr: DaumPostcodeAddress) => {
    const savedAddress = await createAddress(
      formatAddress({
        postalcode: addr.zonecode,
        roadAddress: addr.roadAddress,
        jibunAddress: addr.jibunAddress,
        buildingName: addr.buildingName
      })
    );

    const newAddress: Address = {
      id: savedAddress.id,
      postalCode: savedAddress.postalCode,
      roadAddress: savedAddress.street,
      jibunAddress: savedAddress.detail || addr.jibunAddress
    };

    setAddressList((prev) => [newAddress, ...prev]);
    setSelectedIndex(0);
    setShowPostcode(false);
  }, []);

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
            <div className="bg-background-100 flex h-[52px] w-full items-center justify-between rounded-2xl px-4 md:h-[64px]">
              <input
                type="text"
                placeholder={t("placeholder")}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="placeholder:text-black-400 h-[24px] w-[132px] flex-1 bg-transparent text-sm text-black outline-none"
                style={{ border: "none", caretColor: "black" }}
              />

              <div className="flex items-center gap-3 md:gap-4">
                <button type="button" onClick={handleClearInput}>
                  <Image
                    src="/assets/icons/ic_x_circle.svg"
                    width={24}
                    height={24}
                    alt="입력 지우기"
                    className="md:h-9 md:w-9"
                  />
                </button>
                <button type="button" onClick={handleSearch}>
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
                onClick={() => handleSelectAddress(idx)}
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
          onComplete={handleCompletePostcode}
        />
      )}
    </div>
  );
}
