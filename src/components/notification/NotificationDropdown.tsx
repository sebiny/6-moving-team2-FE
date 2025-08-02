"use client";

import Image from "next/image";
import { EventSourcePolyfill } from "event-source-polyfill";
import React, { useCallback, useEffect, useState } from "react";
import iconNotification from "/public/assets/icons/ic_alarm.svg";
import ImgXBtn from "/public/assets/icons/ic_X.svg";
import { fetchNotifications, markNotificationAsReadAPI } from "@/lib/api/api-notification";
import { useAuth } from "@/providers/AuthProvider";
import { authUtils } from "@/lib/FetchClient";
import { useTranslations } from "next-intl";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5분
      refetchOnWindowFocus: false
    }
  }
});

export default function Notification({ ref, onClick, className, isOpen }: NotificationProps) {
  const { user, isLoading } = useAuth();
  const queryClient = useQueryClient();

  const t = useTranslations("Notification");

  // '읽음 상태' 스냅샷을 위한 새로운 state 추가
  const [initialReadIds, setInitialReadIds] = useState<Set<string>>(new Set());

  // 알림 목록 조회
  const { data: notifications = [], isLoading: isNotificationsLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    enabled: !isLoading && !!user,
    select: (data) => {
      if (data && Array.isArray(data)) {
        return data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
      return [];
    },
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
    staleTime: 2 * 60 * 1000
  });

  // 읽음 처리 뮤테이션
  const { mutateAsync: markAsRead } = useMutation({
    mutationFn: markNotificationAsReadAPI,
    onMutate: async (notificationId: string) => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });

      const previousNotifications = queryClient.getQueryData(["notification"]);

      queryClient.setQueryData(["notifications"], (old: NotificationData[] | undefined) => {
        if (!old) return [];
        return old.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n));
      });
      return { previousNotifications };
    },
    onError: (err, notificationId, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(["notifications"], context.previousNotifications);
      }
      console.error("알림 읽음 처리 실패:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    }
  });

  const hasUnread = notifications.some((n) => !n.isRead);

  // SSE로 새 알림 추가
  const addNewNotification = useCallback(
    (newNotification: NotificationData) => {
      queryClient.setQueryData(["notifications"], (old: NotificationData[] | undefined) => {
        if (!old) return [newNotification];
        return [newNotification, ...old];
      });
    },
    [queryClient]
  );

  useEffect(() => {
    // 로딩 중이거나 로그인 상태가 아니면 아무 작업도 하지 않고 종료
    if (isLoading || !user) {
      if (!user) {
        //   setNotifications([]);
      }
      return;
    }
  });

  useEffect(() => {
    if (isLoading || !user) {
      return;
    }

    const token = authUtils.getAccessToken();
    if (!token) return;

    let eventSource: EventSourcePolyfill | null = null;
    let reconnectTimer: NodeJS.Timeout | null = null;
    let reconnectAttempts = 0;

    const connectSSE = () => {
      // 토큰 유효성 검사
      if (!token) {
        console.warn("SSE: 토큰이 없습니다.");
        return;
      }

      // 토큰 만료 검사 (JWT인 경우)
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.exp * 1000 < Date.now()) {
          console.warn("SSE: 토큰이 만료되었습니다.");
          return;
        }
      } catch (e) {
        console.warn("SSE: 토큰 파싱 실패");
      }
      try {
        eventSource = new EventSourcePolyfill(`${API_URL}/notification/sse`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
          heartbeatTimeout: 120000 // 2분
        });

        eventSource.addEventListener("open", (event: Event) => {
          reconnectAttempts = 0; // 성공 시 재연결 횟수 초기화
        });

        // 일반 알림 메시지 처리
        eventSource.addEventListener("message", (event: MessageEvent) => {
          try {
            const data = JSON.parse(event.data);

            addNewNotification({
              id: data.id,
              message: data.translated || data.message || "",
              createdAt: data.createdAt,
              isRead: false
            });
          } catch (parseError) {
            console.error("SSE 메시지 파싱 오류:", parseError);
          }
        });

        eventSource.addEventListener("ping", (event) => {});

        eventSource.addEventListener("error", (err: Event) => {
          console.error("SSE 에러 상세:", {
            error: err,
            readyState: eventSource?.readyState,
            url: `${API_URL}/notification/sse`,
            timestamp: new Date().toISOString()
          });

          if (eventSource) {
            console.log(
              "EventSource readyState:",
              {
                0: "CONNECTING",
                1: "OPEN",
                2: "CLOSED"
              }[eventSource.readyState]
            );
          }

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
        });
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
  }, [isLoading, user, addNewNotification]);

  // 드롭다운 열릴 때 스냅샷 생성
  useEffect(() => {
    if (isOpen) {
      const alreadyReadIds = new Set(notifications.filter((n) => n.isRead).map((n) => n.id));
      setInitialReadIds(alreadyReadIds);
    }
  }, [isOpen, notifications]);

  const handleMarkAsRead = useCallback(
    async (notificationId: string) => {
      try {
        await markAsRead(notificationId);
      } catch (error) {
        console.error("알림 읽음 처리 오류:", error);
      }
    },
    [markAsRead]
  );

  return (
    <div className={`${className} relative z-50 flex`} ref={ref}>
      <button
        onClick={onClick}
        className="relative cursor-pointer"
        aria-label={hasUnread ? t("hasUnread") : t("notification")}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-describedby={hasUnread ? "notification-badge" : undefined}
      >
        <div className="flax-col relative flex">
          <Image src={iconNotification} alt="알림" height={24} width={24} className="opacity-50" aria-hidden="true" />
          {hasUnread && (
            <span
              id="notification-badge"
              className="absolute top-0.5 right-0.5 flex size-2 cursor-pointer"
              aria-label={t("hasUnreadList")}
              role="status"
            >
              <span className="absolute top-[0.5px] right-[1px] flex size-2 cursor-pointer">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-300 opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-orange-400"></span>
              </span>
            </span>
          )}
        </div>
      </button>

      {/* 알림 레이어 */}
      {isOpen && (
        <section
          className="border-line-200 absolute top-8 z-99 flex h-78 w-78 -translate-x-48 flex-col rounded-3xl border bg-gray-50 p-4 shadow-gray-300 lg:top-10 2xl:-translate-x-1/10"
          aria-labelledby="notification-title"
          aria-modal="false"
          aria-live="polite"
        >
          <header className="flex items-center justify-between px-3 py-[10px]">
            <span className="text-black-300 text-base font-bold" id="notification-title">
              {t("notification")}
            </span>
            <button className="cursor-pointer" onClick={onClick} aria-label={t("closeNotificationLayer")}>
              <Image src={ImgXBtn} alt={t("buttonClose")} width={24} height={24} />
            </button>
          </header>
          <ul className="overflow-y-auto scroll-smooth" role="list" aria-label={t("notificationList")}>
            {notifications.length === 0 ? (
              <li className="p-4 text-center text-gray-400" role="status" aria-live="polite">
                t("hasNotUnread")
              </li>
            ) : (
              notifications.map((item) => (
                <NotificationItem
                  key={item.id}
                  item={item}
                  onVisible={handleMarkAsRead}
                  isInitiallyRead={initialReadIds.has(item.id)}
                  role="listitem"
                  aria-describedby={`notification-${item.id}`}
                />
              ))
            )}
          </ul>
        </section>
      )}
    </div>
  );
}
