export interface Request {
  id: string;
  moveType: string; // "소형이사" | "가정이사" | "사무실이사"
  isDesignated: boolean;
  createdAt: string;
  originalCreatedAt?: string; // 정렬용 원본 날짜
  customerName: string;
  fromAddress: string;
  toAddress: string;
  moveDate: string;
  originalMoveDate?: string; // 정렬용 원본 이사일
  price?: number; // 추가 (optional)
}

// 백엔드 응답 데이터 형식
export interface BackendRequest {
  id: string;
  moveType: "SMALL" | "HOME" | "OFFICE";
  moveDate: string;
  status: string;
  createdAt: string;
  isDesignated?: boolean; // 지정견적 여부
  customer: {
    id: string;
    authUser: {
      name: string;
    };
  };
  fromAddress: {
    street: string;
    detail?: string;
    region?: string;
    district?: string;
  };
  toAddress: {
    street: string;
    detail?: string;
    region?: string;
    district?: string;
  };
}
