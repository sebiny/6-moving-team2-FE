"use client";

import React, { useEffect, useRef } from "react";
import { NotificationData } from "../NotificationDropdown"; // 기존 Notification 컴포넌트에서 export
import { formatTimeFromNow } from "@/utills/dateUtils";

interface NotificationItemProps {
  item: NotificationData;
  onVisible: (id: string) => void; // 화면에 보였을 때 호출될 함수
  isInitiallyRead: boolean;
}

export default function NotificationItem({ item, onVisible, isInitiallyRead }: NotificationItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={itemRef}
      className={`border-line-200 flex flex-col gap-[2px] border-b p-3 text-sm font-medium transition-colors ${
        // 스타일링을 실시간 상태(item.isRead)가 아닌, 스냅샷(isInitiallyRead) 기준으로 결정합니다.
        isInitiallyRead ? "text-gray-300" : "text-black-400"
      }`}
    >
      <span>{item.message}</span>
      <span className={`text-[13px] ${isInitiallyRead ? "text-gray-300" : "text-gray-400"}`}>
        {formatTimeFromNow(item.createdAt)}
      </span>
    </div>
  );
}
