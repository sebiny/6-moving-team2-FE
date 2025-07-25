import { DriverType } from "@/types/driverType";
import { cookieFetch, defaultFetch } from "../FetchClient";
import qs from "query-string";
import { ReviewType } from "@/types/reviewType";
import { BackendRequest } from "@/types/request";

export const driverService = {
  getAllDriversDefault: async (options: {
    keyword?: string;
    orderBy?: string;
    region?: string;
    service?: string;
    page: number;
  }): Promise<{ data: DriverType[]; hasNext: boolean } | null> => {
    const query = qs.stringify(options, { skipEmptyString: true, skipNull: true });
    return await defaultFetch(`/drivers?${query}`, {
      method: "GET"
    });
  },
  getAllDriversCookie: async (options: {
    keyword?: string;
    orderBy?: string;
    region?: string;
    service?: string;
    page: number;
  }): Promise<{ data: DriverType[]; hasNext: boolean } | null> => {
    const query = qs.stringify(options, { skipEmptyString: true, skipNull: true });
    return await cookieFetch(`/drivers/auth?${query}`);
  },
  getDriverDetailDefault: async (id: string): Promise<DriverType | null> => {
    return await defaultFetch(`/drivers/${id}`);
  },
  getDriverDetailCookie: async (id: string): Promise<DriverType | null> => {
    return await cookieFetch(`/drivers/${id}/auth`);
  },
  getDriverReviews: async (id: string, page: number): Promise<ReviewType[] | null> => {
    return await defaultFetch(`/drivers/${id}/reviews?page=${page}`);
  },
  // 기사가 받은 지정 견적 요청 조회
  getDesignatedRequests: async (): Promise<BackendRequest[] | null> => {
    return await cookieFetch("/driver/estimate-requests/designated");
  },
  // 기사가 받은 서비스 가능 지역 견적 요청 조회
  getAvailableRequests: async (): Promise<BackendRequest[] | null> => {
    return await cookieFetch("/driver/estimate-requests/available");
  },
  // 기사가 받은 모든 견적 요청 조회
  getAllRequests: async (): Promise<BackendRequest[] | null> => {
    return await cookieFetch("/driver/estimate-requests");
  },
  // 견적 제안 생성
  createEstimate: async (requestId: string, data: { price: number; message: string }): Promise<unknown> => {
    return await cookieFetch(`/driver/estimate-requests/${requestId}/estimates`, {
      method: "POST",
      body: JSON.stringify(data)
    });
  },
  // 견적 요청 반려
  rejectEstimateRequest: async (requestId: string, data: { reason: string }): Promise<unknown> => {
    return await cookieFetch(`/driver/estimate-requests/${requestId}/reject`, {
      method: "POST",
      body: JSON.stringify(data)
    });
  },
  // 보낸 기사견적 리스트 조회
  getDriverEstimates: async (): Promise<unknown> => {
    return await cookieFetch("/driver/estimates");
  },
  // 보낸 기사견적 상세정보 조회
  getDriverEstimateDetail: async (estimateId: string): Promise<unknown> => {
    return await cookieFetch(`/driver/estimates/${estimateId}`);
  },
  // 반려한 고객견적요청 리스트 조회
  getRejectedRequests: async (): Promise<BackendRequest[] | null> => {
    return await cookieFetch("/driver/estimate-requests/rejected");
  }
};
