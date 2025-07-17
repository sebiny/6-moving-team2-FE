import { DriverType } from "@/types/driverType";

export const GNB_ROUTE_USER_ROLE = {
  guest: [
    { label: "기사님 찾기", path: "/drivers" },
    { label: "로그인", path: "/customer/login" }
  ],
  CUSTOMER: [
    { label: "견적 요청", path: "/customer/estimate-request" },
    { label: "기사님 찾기", path: "/drivers" },
    { label: "내 견적 관리", path: "/customer/my-estimates" }
  ],
  DRIVER: [
    { label: "받은 요청", path: "/driver/received-requests" },
    { label: "내 견적 관리", path: "/driver/my-estimates/sent" }
  ]
} as const;

export type UserType = "CUSTOMER" | "DRIVER";
type MenuType = "CUSTOMER" | "DRIVER";

export const PROFILE_DROPDOWN_MENU: Record<MenuType, { label: string; path: string }[]> = {
  CUSTOMER: [
    { label: "마이 프로필", path: "/customer/profile" },
    { label: "찜한 기사님", path: "/customer/my-estimates/favorite-drivers" },
    { label: "이사 리뷰", path: "/review" }
  ],
  DRIVER: [
    { label: "마이 페이지", path: "/driver/my-page" },
    { label: "마이 프로필", path: "/driver/profile" }
  ]
};

export const driver: DriverType = {
  id: "firstDriver",
  nickname: "김코드",
  shortIntro: "고객님의 물품을 안전하게 운송해 드립니다.",
  detailIntro: "안녕하세요. 이사 업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다.",
  career: 7,
  services: ["SMALL", "HOME"],
  serviceAreas: ["SEOUL", "GYEONGGI"],
  work: 334,
  favorite: 136,
  reviewsReceived: []
};

export const drivers: DriverType[] = [
  {
    id: "firstDriver",
    nickname: "김코드",
    shortIntro: "고객님의 물품을 안전하게 운송해 드립니다.",
    detailIntro: "이사 업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다.",
    career: 7,
    services: ["SMALL", "HOME"],
    serviceAreas: ["SEOUL", "GYEONGGI"],
    work: 334,
    favorite: 136,
    reviewsReceived: []
  },
  {
    id: "secondDriver",
    nickname: "최코드",
    shortIntro: "고객님의 물품을 안전하게 운송해 드립니다.",
    detailIntro: "이사 업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다.",
    career: 7,
    services: ["SMALL", "HOME"],
    serviceAreas: ["SEOUL", "DAEGU"],
    work: 250,
    favorite: 226,
    reviewsReceived: []
  }
];
