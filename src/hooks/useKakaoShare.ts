"use client";

import { useEffect, useCallback, useState } from "react";

interface KakaoShareOptions {
  title: string;
  description?: string;
  imageUrl?: string;
  link: { mobileWebUrl: string; webUrl: string };
  buttons?: { title: string; link: { mobileWebUrl: string; webUrl: string } }[];
}

export const useKakaoShare = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // SDK가 로드될 때까지 interval로 체크
    const interval = setInterval(() => {
      if (window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
        }
        setIsReady(true);
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const share = useCallback(
    ({ title, description, imageUrl, link, buttons }: KakaoShareOptions) => {
      if (!isReady || !window.Kakao) {
        alert("카카오톡 공유 기능을 사용할 수 없습니다. 잠시 후 다시 시도해주세요.");
        return;
      }

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
    },
    [isReady]
  );

  return share;
};
