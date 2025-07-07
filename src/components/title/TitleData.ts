// 더미데이터

import { EstimateStatus, LabelText } from "./LabelIcons";

// 기사 정보 타입
export interface DriverInfo {
  name: string;
  rating: number;
  reviewCount: number;
  experienceYear: number;
  confirmedCount: number;
  likes: number;
}

// 타이틀 데이터 타입
export interface TitleData {
  id: number;
  status: EstimateStatus;
  labels: LabelText[];
  driver: DriverInfo;
  message: string;
  estimatePrice?: number; // optional: 견적가 표시 여부에 따라
}

// 더미 데이터
export const titleMockData: TitleData[] = [
  {
    id: 1,
    status: EstimateStatus.PENDING,
    labels: ["소형이사", "지정 견적 요청"],
    driver: {
      name: "김코드",
      rating: 5.0,
      reviewCount: 178,
      experienceYear: 7,
      confirmedCount: 334,
      likes: 136,
    },
    message: "고객님의 물품을 안전하게 운송해 드립니다.",
    estimatePrice: 180000,
  },
  {
    id: 2,
    status: EstimateStatus.CONFIRMED,
    labels: ["소형이사", "지정 견적 요청"],
    driver: {
      name: "김코드",
      rating: 5.0,
      reviewCount: 178,
      experienceYear: 7,
      confirmedCount: 334,
      likes: 136,
    },
    message: "고객님의 물품을 안전하게 운송해 드립니다.",
    estimatePrice: 180000,
  },
];
