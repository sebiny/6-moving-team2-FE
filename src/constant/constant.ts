export const GNB_ROUTE_USER_ROLE = {
  guest: [
    { label: "기사님 찾기", path: "/drivers" },
    { label: "로그인", path: "/customer/login" }
  ],
  customer: [
    { label: "견적 요청", path: "/" },
    { label: "기사님 찾기", path: "/drivers" },
    { label: "내 견적 관리", path: "/member/my-estimates" }
  ],
  driver: [
    { label: "받은 요청", path: "/driver/received-requests" },
    { label: "내 견적 관리", path: "/driver/my-page" }
  ]
} as const;
