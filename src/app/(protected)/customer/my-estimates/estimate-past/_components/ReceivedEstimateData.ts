// ReceivedEstimateData.ts

export interface DriverInfo {
  name: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  experienceYear: number;
  confirmedCount: number;
  likes: number;
}

export interface ReceivedEstimateItem {
  id: number;
  status: "PROPOSED" | "AUTO_REJECTED" | "ACCEPTED";
  labels: ("SMALL" | "HOME" | "OFFICE" | "REQUEST")[];
  driver: DriverInfo;
  message: string;
  price: number;
}

export interface EstimateGroup {
  id: number;
  moveType: string;
  startAddress: string;
  endAddress: string;
  date: string;
  createdDate: string;
  estimates: ReceivedEstimateItem[];
}

export const receivedEstimateData: EstimateGroup[] = [
  {
    id: 1,
    moveType: "소형이사",
    startAddress: "서울 중구 삼일대로 343",
    endAddress: "경기도 수원시 장안구 정자동",
    date: "2024년 07월 01일 (월)",
    createdDate: "24. 06. 24.",
    estimates: [
      {
        id: 101,
        status: "ACCEPTED",
        labels: ["SMALL", "REQUEST"],
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
        id: 102,
        status: "PROPOSED",
        labels: ["SMALL", "REQUEST"],
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
    ]
  },
  {
    id: 2,
    moveType: "사무실 이사",
    startAddress: "서울 강남구 선릉로 428",
    endAddress: "인천광역시 계양구 작전동",
    date: "2024년 07월 03일 (수)",
    createdDate: "24. 06. 25.",
    estimates: [
      {
        id: 201,
        status: "AUTO_REJECTED",
        labels: ["OFFICE", "REQUEST"],
        driver: {
          name: "박정우",
          imageUrl: "/assets/icons/ic_profile_bear.svg",
          rating: 4.6,
          reviewCount: 82,
          experienceYear: 3,
          confirmedCount: 95,
          likes: 44
        },
        message: "빠르고 안전하게 도와드릴게요.",
        price: 200000
      }
    ]
  }
];
