import {
  AcceptEstimateResponse,
  EstimateDetailType,
  PastEstimateType,
  PendingEstimateType
} from "@/types/estimateType";
import { cookieFetch } from "../FetchClient";
import { useMutation, useQuery } from "@tanstack/react-query";

// API 함수
export const myEstimateService = {
  getPendingEstimates: async (): Promise<PendingEstimateType | null> => {
    return await cookieFetch(`/customer/estimate/pending`);
  },

  getPastEstimates: async (): Promise<PastEstimateType | null> => {
    return await cookieFetch(`/customer/estimate/approve`);
  },

  getEstimateDetail: async (estimateId: string): Promise<EstimateDetailType | null> => {
    return await cookieFetch(`/customer/estimate/${estimateId}`);
  },

  acceptEstimateById: async (estimateId: string): Promise<AcceptEstimateResponse | null> => {
    return await cookieFetch(`/customer/estimate/${estimateId}/accept`, {
      method: "PATCH"
    });
  }
};

// =======================================================================

// 리액트 쿼리 훅
export const usePendingEstimates = () => {
  return useQuery<PendingEstimateType | null>({
    queryKey: ["pendingEstimates"],
    queryFn: myEstimateService.getPendingEstimates,
    staleTime: 1000 * 60 * 1 // 1분 동안은 fresh 상태로 유지
  });
};

export const usePastEstimates = () => {
  return useQuery<PastEstimateType | null>({
    queryKey: ["pastEstimates"],
    queryFn: myEstimateService.getPastEstimates,
    staleTime: 1000 * 60 * 1
  });
};

export const useEstimateDetail = (estimateId: string | undefined) => {
  return useQuery<EstimateDetailType | null>({
    queryKey: ["estimateDetail", estimateId],
    queryFn: () => myEstimateService.getEstimateDetail(estimateId!),
    enabled: !!estimateId, // estimateId가 존재할 때만 데이터 실행
    staleTime: 1000 * 60 * 1
  });
};

export const useAcceptEstimate = () => {
  return useMutation({
    mutationFn: (estimateId: string) => myEstimateService.acceptEstimateById(estimateId)
  });
};
