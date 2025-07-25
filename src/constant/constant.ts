import { DriverType } from "@/types/driverType";
import { ReviewType } from "@/types/reviewType";

export const getGnbUserRole = (t: (key: string) => string) => ({
  guest: [
    { label: t("findDeliver"), path: "/drivers" },
    { label: t("login"), path: "/customer/login" }
  ],
  CUSTOMER: [
    { label: t("estimateRequest"), path: "/customer/estimate-request" },
    { label: t("findDeliver"), path: "/drivers" },
    { label: t("myEstimate"), path: "/customer/my-estimates" }
  ],
  DRIVER: [
    { label: t("receivedRequest"), path: "/driver/received-requests" },
    { label: t("myEstimate"), path: "/driver/my-estimates/sent" }
  ]
});

export type UserType = "CUSTOMER" | "DRIVER";
type MenuType = "CUSTOMER" | "DRIVER";

export const getProfileDropdownMenu = (
  t: (key: string) => string
): Record<MenuType, { label: string; path: string }[]> => ({
  CUSTOMER: [
    { label: t("myProfile"), path: "/customer/profile/edit" },
    { label: t("likedDrivers"), path: "/customer/my-estimates/favorite-drivers" },
    { label: t("moveReviews"), path: "/customer/review" }
  ],
  DRIVER: [{ label: t("myPage"), path: "/driver/my-page" }]
});

export const driver: DriverType = {
  id: "firstDriver",
  nickname: "김코드",
  shortIntro: "고객님의 물품을 안전하게 운송해 드립니다.",
  detailIntro: "안녕하세요. 이사 업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다.",
  career: 7,
  services: ["SMALL", "HOME"],
  serviceAreas: [],
  work: 334,
  favoriteCount: 136,
  reviewsReceived: [],
  isFavorite: false,
  averageRating: 3.5,
  reviewCount: 20,
  moveType: ["SMALL"]
};

export const drivers: DriverType[] = [
  {
    id: "firstDriver",
    nickname: "김코드",
    shortIntro: "고객님의 물품을 안전하게 운송해 드립니다.",
    detailIntro: "이사 업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다.",
    career: 7,
    services: ["SMALL", "HOME"],
    serviceAreas: [],
    work: 334,
    favoriteCount: 136,
    reviewsReceived: [],
    isFavorite: false,
    averageRating: 2.5,
    reviewCount: 10,
    moveType: ["SMALL"]
  },
  {
    id: "secondDriver",
    nickname: "최코드",
    shortIntro: "고객님의 물품을 안전하게 운송해 드립니다.",
    detailIntro: "이사 업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다.",
    career: 7,
    services: ["SMALL", "HOME"],
    serviceAreas: [],
    work: 250,
    favoriteCount: 226,
    reviewsReceived: [],
    isFavorite: false,
    averageRating: 4.5,
    reviewCount: 30,
    moveType: ["SMALL"]
  }
];

export const review: ReviewType = {
  id: "firstReview",
  customerId: "customer",
  rating: 5,
  content:
    "듣던대로 정말 친절하시고 물건도 잘 옮겨주셨어요~~ 나중에 또 짐 옮길 일 있으면 김코드 기사님께 부탁드릴 예정입니다!! 비 오는데 꼼꼼히 잘 해주셔서 감사드립니다 :)",
  createdAt: new Date("2024-07-01")
};

export const reviews: ReviewType[] = [
  {
    id: "firstReview",
    customerId: "customer",
    rating: 5,
    content: "기사님 덕분에 안전하고 신속한 이사를 했습니다! 정말 감사합니다~",
    createdAt: new Date("2024-07-01")
  },
  {
    id: "secondReview",
    customerId: "customer",
    rating: 3,
    content:
      "듣던대로 정말 친절하시고 물건도 잘 옮겨주셨어요~~ 나중에 또 짐 옮길 일 있으면 김코드 기사님께 부탁드릴 예정입니다!! 비 오는데 꼼꼼히 잘 해주셔서 감사드립니다 :)",
    createdAt: new Date("2024-07-01")
  },
  {
    id: "thirdReview",
    customerId: "customer",
    rating: 2,
    content: "김코드 기사님께 두 번째 받은 견적인데, 항상 친절하시고 너무 좋으세요!",
    createdAt: new Date("2024-07-01")
  }
];
