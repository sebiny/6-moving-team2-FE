"use client";
import Image from "next/image";
import React, { useCallback } from "react";
import { ToastModal } from "./common-modal/ToastModal";
import { useTranslations } from "next-intl";

interface ShareDriverType {
  text: string;
  onKakaoShare?: () => void;
  onFacebookShare?: () => void;
}

const ShareDriver = React.memo(function ShareDriver({ text, onKakaoShare, onFacebookShare }: ShareDriverType) {
  const tm = useTranslations("ToastModal");

  const handleCopyLink = useCallback(async () => {
    try {
      const href = typeof window !== "undefined" ? window.location.href : "";
      await navigator.clipboard.writeText(href);
      ToastModal(tm("shareDriver.isCopyLinkTrue"));
    } catch {
      ToastModal(tm("shareDriver.isCopyLinkFalse"));
    }
  }, [tm]);

  const kakaoDisabled = !onKakaoShare;
  const fbDisabled = !onFacebookShare;

  return (
    <section className="mt-4 lg:mt-[40px]" role="group" aria-labelledby="share-actions-heading">
      <h3 id="share-actions-heading" className="text-black-400 text-xl font-semibold">
        {text}
      </h3>

      <div className="mt-3 flex gap-4 lg:mt-[22px]">
        {/* 링크 복사 */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="border-line-200 flex h-10 w-10 items-center justify-center rounded-[8px] border focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:outline-none lg:h-16 lg:w-16 lg:rounded-2xl"
          aria-label="링크 복사"
          title="링크 복사"
        >
          <Image
            src="/assets/icons/ic_clip.svg"
            alt=""
            aria-hidden="true"
            width={36}
            height={36}
            className="w-6 lg:w-9"
          />
        </button>

        {/* 카카오톡 공유 */}
        <button
          type="button"
          onClick={onKakaoShare}
          className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#FAE100] focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 lg:h-16 lg:w-16 lg:rounded-2xl"
          aria-label="카카오톡으로 공유"
          title="카카오톡으로 공유"
          disabled={kakaoDisabled}
          aria-disabled={kakaoDisabled}
        >
          <Image
            src="/assets/icons/ic_share_kakao.svg"
            alt=""
            aria-hidden="true"
            width={28}
            height={28}
            className="w-6 lg:w-7"
          />
        </button>

        {/* 페이스북 공유 */}
        <button
          type="button"
          onClick={onFacebookShare}
          className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-orange-400 focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 lg:h-16 lg:w-16 lg:rounded-2xl"
          aria-label="페이스북으로 공유"
          title="페이스북으로 공유"
          disabled={fbDisabled}
          aria-disabled={fbDisabled}
        >
          <Image
            src="/assets/icons/ic_share_facebook.svg"
            alt=""
            aria-hidden="true"
            width={28}
            height={28}
            className="w-6 lg:w-7"
          />
        </button>
      </div>
    </section>
  );
});

export default ShareDriver;
