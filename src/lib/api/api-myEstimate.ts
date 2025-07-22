import { PendingEstimateType } from "@/types/estimateType";
import { cookieFetch } from "../FetchClient";
import { useQuery } from "@tanstack/react-query";

// API 함수
export const estimateService = {
  getPendingEstimates: async (): Promise<PendingEstimateType | null> => {
    return await cookieFetch("/customer/estimate/pending");
  }
};

// React Query Hook
export const usePendingEstimates = () => {
  return useQuery<PendingEstimateType | null>({
    queryKey: ["pendingEstimates"],
    queryFn: estimateService.getPendingEstimates,
    staleTime: 1000 * 60 * 1 // 1분 동안은 fresh 상태로 유지
  });
};
