import { RegionType } from "@/types/Address";

// 카카오 → 백엔드 스키마 변환 함수
export function formatAddress(data: {
  postalcode: string;
  roadAddress: string;
  jibunAddress?: string;
  buildingName?: string;
}) {
  const regionMap: Record<string, RegionType> = {
    서울: "SEOUL",
    경기: "GYEONGGI",
    부산: "BUSAN",
    대구: "DAEGU",
    인천: "INCHEON",
    광주: "GWANGJU",
    대전: "DAEJEON",
    울산: "ULSAN",
    세종: "SEJONG",
    강원: "GANGWON",
    충북: "CHUNGBUK",
    충남: "CHUNGNAM",
    전북: "JEONBUK",
    전남: "JEONNAM",
    경북: "GYEONGBUK",
    경남: "GYEONGNAM",
    제주: "JEJU"
  };

  const roadParts = data.roadAddress.split(" ");
  const regionKo = roadParts[0];
  const district = roadParts[1];

  return {
    postalCode: data.postalcode,
    street: data.roadAddress,
    detail: data.buildingName || "",
    region: regionMap[regionKo] || "SEOUL",
    district
  };
}

// 빌딩(아파트) 이름 제거 유틸 함수
export const AddressSummary = (fullAddress: string) => {
  const parts = fullAddress.split(" ");
  return parts.length >= 4 ? `${parts[0]} ${parts[1]} ${parts[2]} ${parts[3]}` : fullAddress;
};
