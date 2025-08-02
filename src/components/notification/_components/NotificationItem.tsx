"use client";

import React, { useEffect, useRef, useState } from "react";
import { NotificationData } from "../NotificationDropdown"; // 기존 Notification 컴포넌트에서 export
import { formatTimeFromNow } from "@/utills/dateUtils";
import parse from "html-react-parser";
import { useLocale } from "next-intl";
import { translateWithDeepL } from "@/utills/translateWithDeepL";
import { NotificationItemSkeleton } from "./NotificationItemSkeleton";

interface NotificationItemProps {
  item: NotificationData;
  onVisible: (id: string) => void; // 화면에 보였을 때 호출될 함수
  isInitiallyRead: boolean;
  role?: string; // ARIA role prop 추가
  "aria-describedby"?: string; // aria 속성도 함께 정의
}

export default function NotificationItem({
  item,
  onVisible,
  isInitiallyRead,
  role = "listitem",
  "aria-describedby": ariaDescribedBy
}: NotificationItemProps) {
  const itemRef = useRef<HTMLLIElement>(null);

  const locale = useLocale();
  const [translatedMeta, setTranslatedMeta] = useState<Record<string, any>>({});
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    // 이미 읽은 알림은 관찰할 필요가 없음
    if (item.isRead) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // isIntersecting이 true이면 요소가 threshold 이상 보인다는 의미
        if (entry.isIntersecting) {
          onVisible(item.id);
          // 한 번 읽음 처리 후에는 관찰을 중단하여 성능 최적화
          if (itemRef.current) {
            observer.unobserve(itemRef.current);
          }
        }
      },
      {
        root: null, // null이면 뷰포트를 기준으로 함
        threshold: 1 / 3 // 요소가 33.3% 보였을 때 콜백 실행
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    // 컴포넌트가 언마운트될 때 observer 정리
    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, [item.id, item.isRead, onVisible]);

  useEffect(() => {
    const translateAllMeta = async () => {
      if (!item || translatedMeta[item.id]) return;

      // 한국어인 경우 번역 스킵
      if (locale.toLowerCase() === "ko") {
        setTranslatedMeta((prev) => ({
          ...prev,
          [item.id]: {
            message: item.message,
            createdAt: formatTimeFromNow(item.createdAt, locale)
          }
        }));
        return;
      }

      setIsTranslating(true);

      const updatedMeta: typeof translatedMeta = {};

      try {
        const { message } = item;

        const translatedMessage = await translateWithDeepL(message, locale.toUpperCase());

        // 번역 결과를 state에 저장
        setTranslatedMeta((prev) => ({
          ...prev,
          [item.id]: {
            message: translatedMessage,
            createdAt: formatTimeFromNow(item.createdAt) // 날짜는 포맷팅만
          }
        }));
      } catch (e) {
        console.warn("번역 실패, 원문 사용", e);
        // 번역 실패시 원문 사용
        setTranslatedMeta((prev) => ({
          ...prev,
          [item.id]: {
            message: item.message,
            createdAt: formatTimeFromNow(item.createdAt)
          }
        }));
      } finally {
        setIsTranslating(false);
      }
    };
    translateAllMeta();
  }, [item, locale, translatedMeta]);

  // 번역 중일 때 스켈레톤 UI 표시
  if (isTranslating && !translatedMeta[item.id]) {
    return <NotificationItemSkeleton />;
  }

  const displayMessage = translatedMeta[item.id]?.message || item.message;
  const displayTime = translatedMeta[item.id]?.createdAt || formatTimeFromNow(item.createdAt, locale);

  return (
    <li
      ref={itemRef}
      role={role}
      aria-describedby={ariaDescribedBy}
      className={`border-line-200 text-black-400 flex flex-col gap-[2px] border-b p-3 text-sm font-medium transition-colors`}
    >
      <p>{parse(displayMessage)}</p>
      <time dateTime={item.createdAt} className={`text-[13px] ${isInitiallyRead ? "text-gray-300" : "text-gray-400"}`}>
        {displayTime}
      </time>
    </li>
  );
}
