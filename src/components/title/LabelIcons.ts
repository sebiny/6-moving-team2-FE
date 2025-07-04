// 피그마 데브 모드 설정하고 코드로 바꾸고 이미지도 지우겠습니다!

// 아이콘 경로 타입
export const iconAssets = {
  star: "/assets/icons/ic_star_yellow.svg",
  profileMark: "/assets/icons/ic_profileMark.svg",
  heartBlack: "/assets/icons/ic_like_black.svg",
} as const;

export type IconAssetKey = keyof typeof iconAssets;

// 견적 상태 enum과 매핑
export enum EstimateStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
}

export const statusIconMap: Record<EstimateStatus, string> = {
  [EstimateStatus.PENDING]: "/assets/labels/lb_pending.svg",
  [EstimateStatus.CONFIRMED]: "/assets/labels/lb_confirmed.svg",
};

// 라벨 텍스트에 대한 아이콘 매핑
export type LabelText = "소형이사" | "지정 견적 요청";

export const labelIconMap: Record<LabelText, string> = {
  소형이사: "/assets/labels/lb_small.svg",
  "지정 견적 요청": "/assets/labels/lb_pick.svg",
};

