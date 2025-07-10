export interface ReceivedEstimateData {
  id: number;
  status: "PROPOSED" | "AUTO_REJECTED" | "ACCEPTED";
  labels: ("SMALL" | "HOME" | "OFFICE" | "REQUEST")[];
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
    id: 2,
    status: "AUTO_REJECTED",
    labels: ["OFFICE", "REQUEST"],
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
