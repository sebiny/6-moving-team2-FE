import { EstimateStatus, LabelText } from "../../../../components/Title/LabelIcons";

export interface PendingData {
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
  from: string;
  to: string;
  date: string;
  price: number;
}

export const pendingData: PendingData[] = [
  {
    id: 1,
    status: EstimateStatus.PENDING,
    labels: ["소형이사", "지정 견적 요청"],
    driver: {
      name: "김코드",
      imageUrl: "/assets/icons/ic_profile_bear.svg", // 실제 프로필 이미지
      rating: 5.0,
      reviewCount: 178,
      experienceYear: 7,
      confirmedCount: 334,
      likes: 136,
    },
    message: "고객님의 물품을 안전하게 운송해 드립니다.",
    from: "서울시 중구",
    to: "경기도 수원시",
    date: "2024년 07월 01일 (월)",
    price: 180000,
  },
  {
    id: 2,
    status: EstimateStatus.PENDING,
    labels: ["소형이사", "지정 견적 요청"],
    driver: {
      name: "김코드",
      imageUrl: "/assets/icons/ic_profile_bear.svg", // 실제 프로필 이미지
      rating: 5.0,
      reviewCount: 178,
      experienceYear: 7,
      confirmedCount: 334,
      likes: 136,
    },
    message: "고객님의 물품을 안전하게 운송해 드립니다.",
    from: "서울시 중구",
    to: "경기도 수원시",
    date: "2024년 07월 01일 (월)",
    price: 180000,
  },
  {
    id: 3,
    status: EstimateStatus.PENDING,
    labels: ["소형이사", "지정 견적 요청"],
    driver: {
      name: "김코드",
      imageUrl: "/assets/icons/ic_profile_bear.svg", // 실제 프로필 이미지
      rating: 5.0,
      reviewCount: 178,
      experienceYear: 7,
      confirmedCount: 334,
      likes: 136,
    },
    message: "고객님의 물품을 안전하게 운송해 드립니다.",
    from: "서울시 중구",
    to: "경기도 수원시",
    date: "2024년 07월 01일 (월)",
    price: 180000,
  },
  {
    id: 4,
    status: EstimateStatus.PENDING,
    labels: ["소형이사", "지정 견적 요청"],
    driver: {
      name: "김코드",
      imageUrl: "/assets/icons/ic_profile_bear.svg", // 실제 프로필 이미지
      rating: 5.0,
      reviewCount: 178,
      experienceYear: 7,
      confirmedCount: 334,
      likes: 136,
    },
    message: "고객님의 물품을 안전하게 운송해 드립니다.",
    from: "서울시 중구",
    to: "경기도 수원시",
    date: "2024년 07월 01일 (월)",
    price: 180000,
  },
];
