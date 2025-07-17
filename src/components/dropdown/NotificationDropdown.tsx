"use client";

import Image from "next/image";
import { EventSourcePolyfill } from "event-source-polyfill";
import React, { useEffect, useRef, useState } from "react";
import iconNotification from "/public/assets/icons/ic_alarm.svg";
import ImgXBtn from "/public/assets/icons/ic_X.svg";
import { fetchNotifications } from "@/lib/api/api-notification";
import { useAuth } from "@/providers/AuthProvider";
import { authUtils } from "@/lib/FetchClient";
import { formatTimeFromNow, generateCalendarDates } from "@/utills/dateUtils";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Notification {
  ref: React.Ref<HTMLDivElement> | undefined;
  isOpen: boolean;
  className?: string;
  userId: string | undefined;
  onClick: () => void;
}

export interface NotificationData {
  id: string;
  title: string;
  createdAt: string;
  isRead: boolean;
}

export default function Notification({ ref, onClick, className, isOpen, userId }: Notification) {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const { user, isLoading } = useAuth();
  const hasUnread = notifications.some((n) => !n.isRead);

  useEffect(() => {
    if (isLoading || !user) {
      setNotifications([]); // 로그아웃 시 알림 목록 초기화
      return;
    }

    // 기존 알림 불러오기 (최신순)
    fetchNotifications()
      .then((data) => {
        if (data && Array.isArray(data)) {
          setNotifications(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        } else {
          setNotifications([]);
        }
      })
      .catch((error) => {
        console.error("알림을 불러오는 중 에러 발생:", error);
        setNotifications([]);
      });

    // SSE 연결
    const token = authUtils.getAccessToken();
    if (!token) return;

    // EventSourcePolyfill : 브라우저 호환성, JS버전을 내부적으로 인식, 호환성 보충
    const eventSource = new EventSourcePolyfill(`${API_URL}/notification/sse`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true, // 필요 시 쿠키 전송 옵션 유지
      heartbeatTimeout: 300000 // 3분마다 연결 유지 신호
    });
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "MESSAGE") {
        // 회원가입 축하 알림
        setNotifications((prev) => [
          {
            id: data.id,
            title: data.title,
            createdAt: data.createdAt,
            isRead: false
          },
          ...prev
        ]);
      }
    };
    eventSource.onerror = (err) => {
      console.error("SSE 에러:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [userId, isLoading]);

  useEffect(() => {
    if (isOpen && notifications.some((n) => !n.isRead)) {
      // 모든 알림을 읽음 처리하는 API 호출 예시
      // await markAllNotificationsAsRead();

      // 또는 프론트에서 상태만 업데이트
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    }
  }, [isOpen]);

  return (
    <div className={`${className} relative z-50 flex`} ref={ref}>
      <button onClick={onClick} className="relative cursor-pointer">
        <div className="flax-col relative flex">
          <Image src={iconNotification} alt="알림" height={24} width={24} className="opacity-50" />
          {hasUnread && (
            <span className="absolute top-0.5 right-0.5 flex size-2 cursor-pointer">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-300 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-orange-400"></span>
            </span>
          )}
        </div>
      </button>

      {/* 알림 레이어 */}
      {isOpen && (
        <div className="border-line-200 absolute top-8 z-99 flex h-78 w-78 -translate-x-48 flex-col rounded-3xl border bg-gray-50 p-4 shadow-gray-300 lg:top-10 xl:-translate-x-1/10">
          <div className="flex items-center justify-between px-3 py-[10px]">
            <span className="text-black-300 text-base font-bold">알림</span>
            <button className="cursor-pointer" onClick={onClick}>
              <Image src={ImgXBtn} alt="닫는버튼" width={24} height={24} />
            </button>
          </div>
          <div className="overflow-y-auto scroll-smooth">
            {notifications.length === 0 ? (
              <div>
                {userId}
                알림이 없습니다.
              </div>
            ) : (
              notifications.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="text-black-400 border-line-200 flex flex-col gap-[2px] border-b p-3 text-sm font-medium"
                  >
                    <span>{item.title}</span>
                    <span className="text-[13px] text-gray-300">{formatTimeFromNow(item.createdAt)}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
