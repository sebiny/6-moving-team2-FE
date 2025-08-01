"use client";

import { useEffect } from "react";

interface KakaoShareOptions {
  title: string;
  description?: string;
  imageUrl?: string;
  link: { mobileWebUrl: string; webUrl: string };
  buttons?: { title: string; link: { mobileWebUrl: string; webUrl: string } }[];
}

export const useKakaoShare = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
  }, []);

  const share = ({ title, description, imageUrl, link, buttons }: KakaoShareOptions) => {
    if (typeof window !== "undefined" && window.Kakao) {
      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title,
          description,
          imageUrl,
          link
        },
        buttons
      });
    } else {
      alert("카카오톡 공유 기능을 사용할 수 없습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return share;
};
