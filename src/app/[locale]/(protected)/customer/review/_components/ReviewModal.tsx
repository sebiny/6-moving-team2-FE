import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import XIcon from "/public/assets/icons/ic_X_gray.svg";
import ModalContent from "./ModalContent";
import clsx from "clsx";

interface Props {
  setIsModal: (value: boolean) => void;
}

export default function ReviewModal({ setIsModal }: Props) {
  const [isValid, setIsValid] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 md:items-center">
      <div
        className={clsx(
          "h-[678px] w-full rounded-t-[32px] bg-gray-50 px-6 py-8 shadow-[4px_4px_10px_rgba(169,169,169,0.2)]",
          "sm:max-h-none",
          "md:w-[375px] md:items-center md:justify-center md:rounded-b-[32px]",
          "lg:h-194 lg:w-150 lg:p-8"
        )}
      >
        <div className="flex flex-col gap-[26px] lg:gap-10">
          <div className="flex justify-between">
            <p className="text-black-400 text-[18px] leading-[26px] font-semibold lg:text-[24px] lg:leading-[32px]">
              리뷰 쓰기
            </p>
            <Image
              onClick={() => setIsModal(false)}
              src={XIcon}
              alt="X_icon"
              className="h-6 w-6 cursor-pointer lg:w-9"
            />
          </div>
          <ModalContent setIsValid={setIsValid} />
          <Button type={isValid ? "orange" : "gray"} text="리뷰 등록" className="h-[54px] lg:h-[64px]" />
        </div>
      </div>
    </div>
  );
}
