// 우편번호 서비스 UI용 주소 타입
export interface Address {
  id: string;
  postalCode: string;
  roadAddress: string;
  jibunAddress: string;
  translations?: {
    roadAddress?: string;
    jibunAddress?: string;
  };
}

export type RegionType =
  | "SEOUL"
  | "BUSAN"
  | "DAEGU"
  | "INCHEON"
  | "GWANGJU"
  | "DAEJEON"
  | "ULSAN"
  | "SEJONG"
  | "GYEONGGI"
  | "GANGWON"
  | "CHUNGBUK"
  | "CHUNGNAM"
  | "JEONBUK"
  | "JEONNAM"
  | "GYEONGBUK"
  | "GYEONGNAM"
  | "JEJU";

export interface DaumPostcodeAddress {
  zonecode: string;
  roadAddress: string;
  jibunAddress: string;
  buildingName: string;
  apartment?: string;
  addressType?: string;
  bname?: string;
  userSelectedType?: "R" | "J";
}
