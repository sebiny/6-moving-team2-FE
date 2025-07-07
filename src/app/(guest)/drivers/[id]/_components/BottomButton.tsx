import Button from "@/components/Button";
import Image from "next/image";
import React from "react";

function BottomNav() {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 flex gap-2 bg-white px-6 py-7 lg:hidden">
      <button className="border-line-100 flex h-[54px] w-[54px] items-center justify-center rounded-2xl border">
        <Image src="/assets/icons/ic_like_black.svg" alt="찜하기" width={24} height={24} />
      </button>
      <Button text="지정 견적 요청하기" type="orange" />
    </div>
  );
}

export default BottomNav;
