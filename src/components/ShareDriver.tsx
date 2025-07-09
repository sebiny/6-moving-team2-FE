"use client";
import Image from "next/image";
import React from "react";

interface ShareDriverType {
  text: string;
}

function ShareDriver({ text }: ShareDriverType) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("링크가 복사되었습니다!");
    } catch (err) {
      alert("복사에 실패했습니다");
    }
  };
  return (
    <div className="mt-8 lg:mt-[70px]">
      <p className="text-black-400 text-xl font-semibold">{text}</p>
      <div className="mt-3 flex gap-4 lg:mt-[22px]">
        <button
          className="border-line-200 flex h-10 w-10 items-center justify-center rounded-[8px] border lg:h-16 lg:w-16 lg:rounded-2xl"
          onClick={handleCopy}
        >
          <Image src="/assets/icons/ic_clip.svg" alt="링크 복사하기" width={36} height={36} className="w-6 lg:w-9" />
        </button>
        <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#FAE100] lg:h-16 lg:w-16 lg:rounded-2xl">
          <Image
            src="/assets/icons/ic_share_kakao.svg"
            alt="카카오톡으로 공유하기"
            width={28}
            height={28}
            className="w-6 lg:w-7"
          />
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-orange-400 lg:h-16 lg:w-16 lg:rounded-2xl">
          <Image
            src="/assets/icons/ic_share_facebook.svg"
            alt="페이스북으로 공유하기"
            width={28}
            height={28}
            className="w-6 lg:w-7"
          />
        </div>
      </div>
    </div>
  );
}

export default ShareDriver;
