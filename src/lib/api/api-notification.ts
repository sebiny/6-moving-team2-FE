import { NotificationData } from "@/components/dropdown/NotificationDropdown";
import { cookieFetch } from "../FetchClient";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchNotifications(): Promise<NotificationData[] | null> {
  try {
    // 2. 모든 인증 로직이 포함된 cookieFetch를 사용해 API를 호출합니다.
    const notifications = await cookieFetch<NotificationData[]>("/notification");
    return notifications;
  } catch (error) {
    // cookieFetch 내부에서 발생하는 에러를 처리하거나 다시 던져서
    // React Query 같은 라이브러리가 에러 상태를 관리하도록 할 수 있습니다.
    console.error("알림 목록을 불러오는 데 실패했습니다:", error);
    throw error;
  }
}
