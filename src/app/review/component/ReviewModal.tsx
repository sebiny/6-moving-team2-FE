import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import XIcon from "../../../../public/assets/icons/ic_X_gray.svg";
import ModalContent from "./ModalContent";

interface Props {
  setIsModal: (value: boolean) => void;
}

export default function ReviewModal({ setIsModal }: Props) {
  const [isValid, setIsValid] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mb-20 h-[678px] w-[375px] rounded-[32px] bg-gray-50 px-6 py-8 shadow-[4px_4px_10px_rgba(169,169,169,0.2)] lg:h-194 lg:w-150 lg:p-8">
        <div className="flex flex-col gap-10 gap-[26px]">
          <div className="flex justify-between">
            <p className="text-black-400 text-[24px] leading-[32px] font-semibold">리뷰 쓰기</p>
            <Image
              onClick={() => setIsModal(false)}
              src={XIcon}
              width={36}
              height={36}
              alt="X_icon"
              className="cursor-pointer"
            />
          </div>
          <ModalContent setIsValid={setIsValid} />
          <Button type={isValid ? "orange" : "gray"} text="리뷰 등록" className="h-[64px]" />
        </div>
      </div>
    </div>
  );
}
