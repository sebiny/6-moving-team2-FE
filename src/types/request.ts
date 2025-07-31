import { MoveType } from "@/constant/moveTypes";

export interface Request {
  id: string;
  moveType: MoveType;
  isDesignated: boolean;
  createdAt: string;
  originalCreatedAt?: string; // 정렬용 원본 날짜
  customerName: string;
  fromAddress: string;
  toAddress: string;
  moveDate: string;
  originalMoveDate?: string; // 정렬용 원본 이사일
  price?: number; // 추가 (optional)
  estimateCount?: number; // 견적 개수
}

// 백엔드 응답 데이터 형식
export interface BackendRequest {
  id: string;
  moveType: MoveType;
  moveDate: string;
  status: string;
  createdAt: string;
  isDesignated?: boolean; // 지정견적 여부
  estimateCount?: number; // 견적 개수
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
