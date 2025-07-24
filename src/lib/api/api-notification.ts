import { NotificationData } from "@/components/notification/NotificationDropdown";
import { cookieFetch } from "../FetchClient";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchNotifications(): Promise<NotificationData[] | null> {
  try {
    const notifications = await cookieFetch<NotificationData[]>("/notification");
    return notifications;
  } catch (error) {
    console.error("알림 목록을 불러오는 데 실패했습니다:", error);
    throw error;
  }
}

/**
 * 특정 ID의 알림을 읽음 상태로 변경하는 API 함수
 * @param notificationId 읽음 처리할 알림의 ID
 */
export async function markNotificationAsReadAPI(notificationId: string): Promise<void> {
  await cookieFetch(`/notification/${notificationId}`, {
    method: "PATCH"
  });
}
