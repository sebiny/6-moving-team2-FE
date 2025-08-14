import {
  AcceptEstimateResponse,
  EstimateDetailType,
  PastEstimateType,
  PendingEstimateType
} from "@/types/estimateType";
import { cookieFetch } from "../FetchClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    refetchOnReconnect: true
  });
};

export const usePastEstimates = () => {
  return useQuery<PastEstimateType | null>({
    queryKey: ["pastEstimates"],
    queryFn: myEstimateService.getPastEstimates,
    staleTime: 15 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true
  });
};

export const useEstimateDetail = (estimateId: string | undefined) => {
  return useQuery<EstimateDetailType | null>({
    queryKey: ["estimateDetail", estimateId],
    queryFn: () => myEstimateService.getEstimateDetail(estimateId!),
    enabled: !!estimateId,
    staleTime: 15 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true
  });
};

export const useAcceptEstimate = () => {
  return useMutation({
    mutationFn: (estimateId: string) => myEstimateService.acceptEstimateById(estimateId)
  });
};
