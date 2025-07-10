export interface ReviewType {
  id: string;
  customerId: string;
  rating: number;
  content: string;
  createdAt: Date;
}

export interface ResultType {
  average: number;
  total: number;
  num: number[];
}

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
