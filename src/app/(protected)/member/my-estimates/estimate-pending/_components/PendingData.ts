export interface PendingData {
  id: number;
  status: "PROPOSED" | "AUTO_REJECTED" | "ACCEPTED";
  labels: ("small" | "home" | "office" | "request")[];
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
    status: "PROPOSED",
    labels: ["small", "request"],
    driver: {
      name: "김코드",
      imageUrl: "/assets/icons/ic_profile_bear.svg", // 실제 프로필 이미지
      rating: 5.0,
      reviewCount: 178,
      experienceYear: 7,
      confirmedCount: 334,
      likes: 136
    },
    message: "고객님의 물품을 안전하게 운송해 드립니다.",
    from: "서울시 중구",
    to: "경기도 수원시",
    date: "2024년 07월 01일 (월)",
    price: 180000
  },
  {
    id: 2,
    status: "PROPOSED",
    labels: ["office", "request"],
    driver: {
      name: "김코드",
      imageUrl: "/assets/icons/ic_profile_bear.svg", // 실제 프로필 이미지
      rating: 5.0,
      reviewCount: 178,
      experienceYear: 7,
      confirmedCount: 334,
      likes: 136
    },
    message: "고객님의 물품을 안전하게 운송해 드립니다.",
    from: "서울시 중구",
    to: "경기도 수원시",
    date: "2024년 07월 01일 (월)",
    price: 180000
  },
  {
    id: 3,
    status: "PROPOSED",
    labels: ["home"],
    driver: {
      name: "김코드",
      imageUrl: "/assets/icons/ic_profile_bear.svg", // 실제 프로필 이미지
      rating: 5.0,
      reviewCount: 178,
      experienceYear: 7,
      confirmedCount: 334,
      likes: 136
    },
    message: "고객님의 물품을 안전하게 운송해 드립니다.",
    from: "서울시 중구",
    to: "경기도 수원시",
    date: "2024년 07월 01일 (월)",
    price: 180000
  },
  {
    id: 4,
    status: "PROPOSED",
    labels: ["office"],
    driver: {
      name: "김코드",
      imageUrl: "/assets/icons/ic_profile_bear.svg", // 실제 프로필 이미지
      rating: 5.0,
      reviewCount: 178,
      experienceYear: 7,
      confirmedCount: 334,
      likes: 136
    },
    message: "고객님의 물품을 안전하게 운송해 드립니다.",
    from: "서울시 중구",
    to: "경기도 수원시",
    date: "2024년 07월 01일 (월)",
    price: 180000
  }
];
