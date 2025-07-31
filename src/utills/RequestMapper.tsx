import { BackendRequest, Request } from "@/types/request";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
  return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
};

export const formatTimeAgo = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours}시간 전`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    return `${days}일 전`;
  }
};

export const formatAddress = (address: { street: string; detail?: string; region?: string; district?: string }) =>
  address.region && address.district
    ? `${["서울시", "부산시", "대구시", "인천시", "광주시", "대전시", "울산시", "세종시", "경기도", "강원도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주도"][["SEOUL", "BUSAN", "DAEGU", "INCHEON", "GWANGJU", "DAEJEON", "ULSAN", "SEJONG", "GYEONGGI", "GANGWON", "CHUNGBUK", "CHUNGNAM", "JEONBUK", "JEONNAM", "GYEONGBUK", "GYEONGNAM", "JEJU"].indexOf(address.region)] || address.region} ${address.district}`
    : address.detail
      ? `${address.street} ${address.detail}`
      : address.street;

export const mapBackendRequestToFrontend = (backendRequest: BackendRequest): Request => {
  return {
    id: backendRequest.id,
    moveType: backendRequest.moveType,
    isDesignated: backendRequest.isDesignated || false, // 백엔드에서 전달받은 값 사용
    createdAt: formatTimeAgo(backendRequest.createdAt),
    originalCreatedAt: backendRequest.createdAt, // 정렬용 원본 날짜
    customerName: backendRequest.customer.authUser?.name || "고객",
    fromAddress: formatAddress(backendRequest.fromAddress),
    toAddress: formatAddress(backendRequest.toAddress),
    moveDate: formatDate(backendRequest.moveDate),
    originalMoveDate: backendRequest.moveDate, // 정렬용 원본 이사일
    estimateCount: backendRequest.estimateCount || 0 // 견적 개수
  };
};

// 반려된 요청을 위한 매핑 함수
export const mapBackendRejectedRequestToFrontend = (rejection: {
  estimateRequest: BackendRequest;
  reason?: string;
  createdAt: string;
}): Request & { rejectReason?: string; rejectedAt: string } => {
  const request = mapBackendRequestToFrontend(rejection.estimateRequest);

  return {
    ...request,
    rejectReason: rejection.reason,
    rejectedAt: rejection.createdAt
  };
};
