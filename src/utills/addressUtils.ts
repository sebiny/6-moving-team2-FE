// 대기 중인 견적 리스트 : 견적 요청 정보에서 도착지, 출발지 조회
import { Address, StreetAddress } from "@/types/estimateType";

// 영어 -> 한글
const regionMapToKorean: Record<string, string> = {
  SEOUL: "서울",
  GYEONGGI: "경기",
  BUSAN: "부산",
  DAEGU: "대구",
  INCHEON: "인천",
  GWANGJU: "광주",
  DAEJEON: "대전",
  ULSAN: "울산",
  SEJONG: "세종",
  GANGWON: "강원",
  CHUNGBUK: "충북",
  CHUNGNAM: "충남",
  JEONBUK: "전북",
  JEONNAM: "전남",
  GYEONGBUK: "경북",
  GYEONGNAM: "경남",
  JEJU: "제주"
};

// "시 군구" 형식으로 포맷팅 (대기 중인 견적용)
export const formatAddress = (address: Address): string => {
  const regionKor = regionMapToKorean[address.region] || address.region;
  return `${regionKor} ${address.district}`;
};

// "도로명"만 반환 (받았던 견적용)
export const formatStreetAddress = (address: StreetAddress): string => {
  return `${address.street}`;
};
