//  FetchClient 간단 사용법 await fetch(); 형태 말고 import { defaultFetch, cookieFetch } from "./fetch-client"; 한다음
//  인증이 필요없으면 await defaultFetch(); 인증이 필요하면 await cookieFetch();

//  AuthProvider 실시간 인증 상태 관리 사용법
//  import { useAuth } from "@/providers/AuthProvider"; 이후에
//  const { user, isLoading } = useAuth(); 하고 if (user) 면 로그인 상태 if (!user)면 로그아웃 상태
import { parseBackendError } from "../utills/ErrorParser";
import { getCookieDomain } from "../utills/getCookieDomain";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authUtils = {
  setAccessToken: (accessToken: string): void => {
    if (typeof window !== "undefined") {
      try {
        const tokenData = JSON.parse(atob(accessToken.split(".")[1]));
        const expiresIn = tokenData.exp - Math.floor(Date.now() / 1000);
        const cookieParts = [`accessToken=${accessToken}`, "path=/", `max-age=${expiresIn}`, "SameSite=lax"];

        const domain = getCookieDomain();
        if (domain) {
          cookieParts.push(`domain=${domain}`);
        }

        document.cookie = cookieParts.join("; ");
      } catch (e) {
        console.error("accessToken 쿠키 설정 중 오류:", e);
      }
    }
  },

  getAccessToken: (): string | null => {
    if (typeof window !== "undefined") {
      try {
        const cookies = document.cookie.split("; ");
        const tokenCookie = cookies.find((row) => row.startsWith("accessToken="));
        return tokenCookie ? tokenCookie.split("=")[1] : null;
      } catch (e) {
        return null;
      }
    }
    return null;
  },

  clearAccessToken: (): void => {
    if (typeof window !== "undefined") {
      try {
        // domain 없이 설정된 쿠키 삭제
        document.cookie = "accessToken=; path=/; max-age=0; SameSite=Lax; Secure";

        // domain=.moving-2.click 로 설정된 쿠키도 삭제
        document.cookie = "accessToken=; path=/; max-age=0; SameSite=Lax; Secure; domain=.moving-2.click";
      } catch (e) {
        console.error("accessToken 쿠키 삭제 중 오류:", e);
      }
    }
  },

  refreshAccessToken: async (): Promise<string> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
        headers: {}
      });

      const responseText = await response.text();
      if (!response.ok) {
        throw new Error(parseBackendError(response.status, responseText));
      }

      if (!responseText) {
        throw new Error("토큰 갱신 응답이 비어있습니다.");
      }

      const refreshData: { accessToken?: string } = JSON.parse(responseText);
      if (!refreshData?.accessToken) {
        throw new Error("갱신된 응답에 accessToken이 없습니다.");
      }

      authUtils.setAccessToken(refreshData.accessToken);
      return refreshData.accessToken;
    } catch (error: any) {
      authUtils.clearAccessToken();
      throw new Error(`토큰 갱신 중 오류가 발생하였습니다: ${error.message}`);
    }
  }
};

export const defaultFetch = async <T = any>(endpoint: string, options: RequestInit = {}): Promise<T | null> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const requestHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>)
  };

  let processedBody = options.body;

  if (
    processedBody &&
    typeof processedBody === "object" &&
    !(processedBody instanceof FormData) &&
    ((requestHeaders as Record<string, string>)["Content-Type"] || "").toLowerCase().includes("application/json")
  ) {
    try {
      processedBody = JSON.stringify(processedBody);
    } catch (e) {
      throw new Error("요청 데이터 JSON 변환 실패");
    }
  } else if (processedBody instanceof FormData) {
    delete requestHeaders["Content-Type"];
  }

  const config: RequestInit = {
    ...options,
    headers: requestHeaders,
    body: processedBody as BodyInit
  };

  const response = await fetch(url, config);

  if (response.status === 204) return null;

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(parseBackendError(response.status, responseText));
  }

  if (!responseText) return null;

  try {
    return JSON.parse(responseText) as T;
  } catch (e) {
    throw new Error("API 응답 JSON 파싱 실패");
  }
};

export const cookieFetch = async <T = any>(endpoint: string, options: RequestInit = {}): Promise<T | null> => {
  let accessToken = authUtils.getAccessToken();
  const url = `${API_BASE_URL}${endpoint}`;

  const performFetchWithToken = async (token: string): Promise<Response> => {
    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
      Authorization: `Bearer ${token}`
    };
    let processedBody = options.body;

    if (
      processedBody &&
      typeof processedBody === "object" &&
      !(processedBody instanceof FormData) &&
      (requestHeaders["Content-Type"] || "").toLowerCase().includes("application/json")
    ) {
      try {
        processedBody = JSON.stringify(processedBody);
      } catch (e) {
        throw new Error("요청 데이터 JSON 변환 실패");
      }
    } else if (processedBody instanceof FormData) {
      delete requestHeaders["Content-Type"];
    }

    const config: RequestInit = {
      ...options,
      headers: requestHeaders,
      body: processedBody as BodyInit
    };
    return fetch(url, config);
  };

  if (!accessToken) {
    try {
      accessToken = await authUtils.refreshAccessToken();
    } catch (refreshError: any) {
      throw new Error(`초기 토큰 갱신 실패: ${refreshError.message}`);
    }
  }

  let response = await performFetchWithToken(accessToken);

  if (response.status === 401) {
    try {
      const newAccessToken = await authUtils.refreshAccessToken();
      response = await performFetchWithToken(newAccessToken);
    } catch (refreshError: any) {
      throw new Error(`401 후 토큰 갱신 실패: ${refreshError.message}`);
    }
  }

  if (response.status === 204) return null;

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(parseBackendError(response.status, responseText));
  }

  if (!responseText) return null;

  try {
    return JSON.parse(responseText) as T;
  } catch (e) {
    throw new Error("API 응답 JSON 파싱 실패");
  }
};
