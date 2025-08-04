import { useMutation, useQuery } from "@tanstack/react-query";
import { cookieFetch, defaultFetch } from "../FetchClient";

export const shareEstimateService = {
  // 공유 링크 생성 (로그인한 사용자가 자신의 견적서를 공유할 때)
  createShareLink: async (
    estimateId: string,
    sharedFrom: "CUSTOMER" | "DRIVER"
  ): Promise<{ shareUrl: string } | null> => {
    return await cookieFetch(`/estimate/${estimateId}/share`, {
      method: "POST",
      body: JSON.stringify({ sharedFrom }), // body에 타입 전달
      headers: {
        "Content-Type": "application/json"
      }
    });
  },

  // 공유 링크 접근 (비회원도 접근 가능)
  getSharedEstimate: async (token: string): Promise<any> => {
    return await defaultFetch(`/estimate/shared/${token}`);
  }
};

// 공유 링크 생성 훅
export const useCreateShareLink = () => {
  return useMutation({
    mutationFn: ({ estimateId, sharedFrom }: { estimateId: string; sharedFrom: "CUSTOMER" | "DRIVER" }) =>
      shareEstimateService.createShareLink(estimateId, sharedFrom)
  });
};

// 공유 링크 조회 훅
export const useSharedEstimate = (token: string | undefined) => {
  return useQuery({
    queryKey: ["sharedEstimate", token],
    queryFn: () => shareEstimateService.getSharedEstimate(token!),
    enabled: !!token
  });
};
