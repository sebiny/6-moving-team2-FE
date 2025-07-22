// Address 객체들을 "시 군구 도로명" 형식으로 포맷팅
import { Address } from "@/types/estimateType";

export const formatAddress = (address: Address): string => {
  return `${address.region} ${address.district} ${address.street}`;
};
