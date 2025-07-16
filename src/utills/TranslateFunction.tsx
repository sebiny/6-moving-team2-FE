import { MoveType } from "@/constant/moveTypes";

const ServiceMap: Record<string, string> = {
  SMALL: "소형이사",
  HOME: "가정이사",
  OFFICE: "사무실이사"
};

export const TranslateService = (service: string) => {
  return ServiceMap[service] ?? "기타이사";
};

const RegionMap: Record<string, string> = {
  SEOUL: "서울",
  BUSAN: "부산",
  DAEGU: "대구",
  INCHEON: "인천",
  GWANGJU: "광주",
  DAEJEON: "대전",
  ULSAN: "울산",
  SEJONG: "세종",
  GYEONGGI: "경기",
  GANGWON: "강원",
  CHUNGBUK: "충북",
  CHUNGNAM: "충남",
  JEONBUK: "전북",
  JEONNAM: "전남",
  GYEONGBUK: "경북",
  GYEONGNAM: "경남",
  JEJU: "제주"
};

export const TranslateRegion = (region: string) => {
  return RegionMap[region] ?? "기타";
};

const SortingMap: Record<string, string> = {
  reviewCount: "리뷰 많은순",
  rating: "평점 높은순",
  career: "경력 높은순",
  work: "확정 많은순",
  date: "이사 빠른순",
  request: "요청일 빠른순"
};

export const TranslateSorting = (sort: string) => {
  return SortingMap[sort] ?? "기타 순";
};
