import { favoriteService } from "@/lib/api/api-favorite";
import { useMutation } from "@tanstack/react-query";

export const useFavoriteToggle = ({
  driverId,
  initialIsFavorite,
  onSuccess
}: {
  driverId?: string; // undefined 허용 → 나중에 방지 로직
  initialIsFavorite: boolean;
  onSuccess?: (isNowFavorite: boolean) => void;
}) => {
  return useMutation({
    mutationFn: async (isFavorite: boolean) => {
      if (!driverId) {
        throw new Error("driverId가 없습니다. API를 호출할 수 없습니다.");
      }

      const ok = (res: any) => res && (res.success === undefined || res.success !== false);

      if (isFavorite) {
        const res = await favoriteService.deleteFavorite(driverId);
        if (!ok(res)) throw new Error(res?.message || "찜 해제 실패");
        return false;
      } else {
        const res = await favoriteService.createFavorite(driverId);
        if (!ok(res)) throw new Error(res?.message || "찜 등록 실패");
        return true;
      }
    },
    onSuccess: (isNowFavorite) => {
      onSuccess?.(isNowFavorite);
    },
    onError: (error: any) => {
      console.error("찜하기 실패:", error?.message || error);
    }
  });
};
