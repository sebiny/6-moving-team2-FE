"use client";

import Image from "next/image";
import { EventSourcePolyfill } from "event-source-polyfill";
import React, { useEffect, useState } from "react";
import iconNotification from "/public/assets/icons/ic_alarm.svg";
import ImgXBtn from "/public/assets/icons/ic_X.svg";
import { fetchNotifications, markNotificationAsReadAPI } from "@/lib/api/api-notification";
import { useAuth } from "@/providers/AuthProvider";
import { authUtils } from "@/lib/FetchClient";
import { useTranslations } from "next-intl";

import NotificationItem from "./_components/NotificationItem";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface NotificationProps {
  ref: React.Ref<HTMLDivElement> | undefined;
  isOpen: boolean;
  className?: string;
  onClick: () => void;
}

export interface NotificationData {
  id: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export default function Notification({ ref, onClick, className, isOpen }: NotificationProps) {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const { user, isLoading } = useAuth();
  const hasUnread = notifications.some((n) => !n.isRead);
  const t = useTranslations("Gnb");

  // '읽음 상태' 스냅샷을 위한 새로운 state 추가
  const [initialReadIds, setInitialReadIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // 로딩 중이거나 로그인 상태가 아니면 아무 작업도 하지 않고 종료
    if (isLoading || !user) {
      if (!user) {
        //   setNotifications([]);
      }
      return; // 이 return은 아무것도 반환하지 않으므로(void) 올바른 사용법입니다.
    }
  });

  useEffect(() => {
    if (isLoading || !user) {
      setNotifications([]);
      return;
    }

    // 기존 알림 불러오기
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

    const token = authUtils.getAccessToken();
    if (!token) return;

    let eventSource: EventSourcePolyfill | null = null;
    let reconnectTimer: NodeJS.Timeout | null = null;
    let reconnectAttempts = 0;

    const connectSSE = () => {
      try {
        eventSource = new EventSourcePolyfill(`${API_URL}/notification/sse`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
          heartbeatTimeout: 300000 // 5분
        });

        eventSource.onopen = (event) => {
          reconnectAttempts = 0; // 성공 시 재연결 횟수 초기화
        };

        // 일반 알림 메시지 처리
        eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            setNotifications((prev) => [
              { id: data.id, message: data.message, createdAt: data.createdAt, isRead: false },
              ...prev
            ]);
          } catch (parseError) {
            console.error("SSE 메시지 파싱 오류:", parseError);
          }
        };

        // 특정 이벤트 타입 처리 (ping 등)
        eventSource.addEventListener("ping", (event) => {
          // ping 메시지는 단순히 연결 유지용이므로 특별한 처리 불필요
        });

        eventSource.onerror = (err) => {
          console.error("SSE 에러:", err);

          if (eventSource) {
            eventSource.close();
            eventSource = null;
          }

          // 재연결 로직 (최대 5회까지)
          if (reconnectAttempts < 5) {
            reconnectAttempts++;
            const delay = Math.min(30000, 3000 * Math.pow(2, reconnectAttempts - 1)); // 지수백오프

            console.log(`${delay / 1000}초 후 SSE 재연결 시도... (${reconnectAttempts}/5)`);

            reconnectTimer = setTimeout(() => {
              reconnectTimer = null;
              connectSSE();
            }, delay);
          } else {
            console.error("SSE 재연결 한도 초과. 페이지를 새로고침해주세요.");
          }
        };
      } catch (error) {
        console.error("SSE 초기화 오류:", error);
      }
    };

    connectSSE();

    return () => {
      console.log("SSE 정리 중...");

      if (eventSource) {
        eventSource.close();
      }

      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }
    };
  }, [isLoading, user]);

  // 💡 2. 드롭다운이 열릴 때만 스냅샷을 생성하는 useEffect 추가
  useEffect(() => {
    // isOpen이 true가 되는 순간, 즉 드롭다운이 열릴 때만 실행
    if (isOpen) {
      const alreadyReadIds = new Set(notifications.filter((n) => n.isRead).map((n) => n.id));
      setInitialReadIds(alreadyReadIds);
    }
    // `notifications`는 의존성 배열에서 의도적으로 제외합니다.
    // 드롭다운이 열려있는 동안 알림이 읽음 처리되어도 스냅샷이 갱신되지 않도록 하기 위함입니다.
  }, [isOpen]);

  const handleMarkAsRead = async (notificationId: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n)));

    try {
      await markNotificationAsReadAPI(notificationId);
    } catch (error) {
      console.error("알림 읽음 처리 API 실패:", error);

      alert("오류가 발생하여 알림을 읽음 처리하지 못했습니다.");
      setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, isRead: false } : n)));
    }
  };

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
        <section className="border-line-200 absolute top-8 z-99 flex h-78 w-78 -translate-x-48 flex-col rounded-3xl border bg-gray-50 p-4 shadow-gray-300 lg:top-10 2xl:-translate-x-1/10">
          <header className="flex items-center justify-between px-3 py-[10px]">
            <span className="text-black-300 text-base font-bold">{t("notification")}</span>
            <button className="cursor-pointer" onClick={onClick}>
              <Image src={ImgXBtn} alt="닫는버튼" width={24} height={24} />
            </button>
          </header>
          <ul className="overflow-y-auto scroll-smooth">
            {notifications.length === 0 ? (
              <li className="p-4 text-center text-gray-400">알림이 없습니다.</li>
            ) : (
              notifications.map((item) => (
                <NotificationItem
                  key={item.id}
                  item={item}
                  onVisible={handleMarkAsRead}
                  isInitiallyRead={initialReadIds.has(item.id)} // 현재 ID가 스냅샷에 있는지 확인
                />
              ))
            )}
          </ul>
        </section>
      )}
    </div>
  );
}
