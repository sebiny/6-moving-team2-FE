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
      <div className="mt-[22px] flex gap-4">
        <button
          className="border-line-200 flex h-16 w-16 items-center justify-center rounded-2xl border"
          onClick={handleCopy}
        >
          <Image src="/assets/icons/ic_clip.svg" alt="링크 복사하기" width={36} height={36} />
        </button>
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FAE100]">
          <Image src="/assets/icons/ic_share_kakao.svg" alt="카카오톡으로 공유하기" width={28} height={28} />
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-400">
          <Image src="/assets/icons/ic_share_facebook.svg" alt="페이스북으로 공유하기" width={28} height={28} />
        </div>
      </div>
    </div>
  );
}

export default ShareDriver;
