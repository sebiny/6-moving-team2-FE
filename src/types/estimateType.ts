import { MoveType } from "@/constant/moveTypes";

// 대기 중인 견적용 주소 데이터
export type Address = {
  region: string;
  district: string;
};

// 받았던 견적용 주소 데이터
export type StreetAddress = {
  street: string;
};

export type Estimate = {
  id: string;
  price: number;
  comment: string;
  status: "PROPOSED" | "ACCEPTED" | "AUTO_REJECTED";
  isDesignated: boolean;
  driver: {
    profileImage: string | null;
    authUser: {
      id: string;
      name: string;
      email: string;
      phone: string;
    };
    avgRating: number | null;
    reviewCount: number;
    favoriteCount: number;
    career: number;
    work: number;
  };
};

export type PendingEstimateType = {
  estimateRequest: {
    id: string;
    moveType: "SMALL" | "HOME" | "OFFICE" | "REQUEST";
    moveDate: string;
    requestDate: string;
    fromAddress: Address;
    toAddress: Address;
  };
  estimates: Estimate[];
};

export type SinglePastEstimateType = {
  estimateRequest: {
    id: string;
    moveType: "SMALL" | "HOME" | "OFFICE" | "REQUEST";
    moveDate: string;
    requestDate: string;
    fromAddress: StreetAddress;
    toAddress: StreetAddress;
    estimateCount: number;
  };
  estimates: Estimate[];
};

export type PastEstimateType = SinglePastEstimateType[];

// ====================================================================

// 견적 상세 조회 타입
export type EstimateDetailType = {
  id: string;
  comment: string;
  price: number;
  status: "PROPOSED" | "ACCEPTED" | "AUTO_REJECTED";
  requestDate: string;

  moveType: "SMALL" | "HOME" | "OFFICE" | "REQUEST";
  moveDate: string;

  fromAddress: {
    street: string;
  };
  toAddress: {
    street: string;
  };

  driver: {
    profileImage: string;
    name: string;
    phone: string;
    email: string;
    avgRating: number | null;
    reviewCount: number;
    favoriteCount: number;
    career: number;
    work: number;
  };

  isDesignated: boolean;
};

// ===================================================================

export type AcceptEstimateResponse = {
  message: string;
  data: {
    success: boolean;
    estimateId: string;
  };
};

// ===================================================================
// 기사가 보낸 견적 타입
export type DriverEstimateType = {
  id: string;
  price: number;
  comment: string;
  status: "PROPOSED" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  completionStatus: "CONFIRMED_AND_PAST" | "DATE_PAST" | null;
  isCompleted: boolean;
  customerName: string;
  estimateRequest: {
    id: string;
    moveType: MoveType;
    moveDate: string;
    fromAddress: {
      street: string;
    };
    toAddress: {
      street: string;
    };
  };
};

// ===================================================================

// 기사 견적 상세 조회 타입 (백엔드 응답)
export type DriverEstimateDetailType = {
  id: string;
  price: number | null;
  comment: string | null;
  status: "PROPOSED" | "ACCEPTED" | "REJECTED";
  rejectReason: string | null;
  isDesignated: boolean;
  createdAt: string;
  updatedAt: string;
  estimateRequest: {
    id: string;
    moveType: MoveType;
    moveDate: string;
    status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
    createdAt: string;
    updatedAt: string;
    customer: {
      id: string;
      profileImage: string | null;
      moveType: MoveType[];
      currentArea: string;
      moveDate: string | null;
      authUser: {
        id: string;
        name: string;
        email: string;
        phone: string;
      };
    };
    fromAddress: {
      id: string;
      street: string;
      region: string;
      district: string;
    };
    toAddress: {
      id: string;
      street: string;
      region: string;
      district: string;
    };
  };
};

// 완료된 견적 카드 타입
export type CompletedEstimateCardType = {
  id: string;
  moveType: MoveType;
  isDesignated: boolean;
  isCompleted?: boolean;
  customerName: string;
  fromAddress: string;
  toAddress: string;
  moveDate: string;
  estimateAmount?: string;
  status?: string;
};
