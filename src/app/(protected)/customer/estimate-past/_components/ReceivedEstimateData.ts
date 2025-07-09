import { EstimateStatus, LabelText } from "@/components/title/LabelIcons";

export interface ReceivedEstimateData {
  id: number;
  status: EstimateStatus;
  labels: LabelText[];
  driver: {
    name: string;
    imageUrl: string;
    rating: number;
    reviewCount: number;
    experienceYear: number;
    confirmedCount: number;
    likes: number;
  };
  message: string;
  price: number;
}

export const receivedEstimateData: ReceivedEstimateData[] = [
  {
    id: 1,
    status: EstimateStatus.CONFIRMED,
    labels: ["소형이사", "지정 견적 요청"],
    driver: {
      name: "김코드",
      imageUrl: "/assets/icons/ic_profile_bear.svg",
      rating: 5.0,
      reviewCount: 178,
      experienceYear: 7,
      confirmedCount: 334,
      likes: 136
    },
    message: "고객님의 물품을 안전하게 운송해 드립니다.",
    price: 180000
  },
  {
    id: 2,
    status: EstimateStatus.PENDING,
    labels: ["소형이사", "지정 견적 요청"],
    driver: {
      name: "이노코드",
      imageUrl: "/assets/icons/ic_profile_bear.svg",
      rating: 4.8,
      reviewCount: 112,
      experienceYear: 5,
      confirmedCount: 201,
      likes: 98
    },
    message: "책임감 있게 운송해 드릴게요.",
    price: 175000
  }
];
