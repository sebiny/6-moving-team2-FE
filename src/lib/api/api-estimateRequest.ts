import { cookieFetch } from "../FetchClient";

// 주소 등록
export async function createAddress(data: {
  postalCode: string;
  street: string;
  detail?: string;
  region: string;
  district: string;
}) {
  return cookieFetch("/address", {
    method: "POST",
    body: JSON.stringify(data)
  });
}

// 고객 주소 연결
export async function linkCustomerAddress(data: { customerId: string; addressId: string; role: "FROM" | "TO" }) {
  return cookieFetch("/customer/address", {
    method: "POST",
    body: JSON.stringify(data)
  });
}

// 견적 요청 생성
export async function createEstimateRequest(data: {
  customerId: string;
  moveType: string;
  moveDate: string;
  fromAddressId: string;
  toAddressId: string;
}) {
  return cookieFetch("/customer/estimate-request", {
    method: "POST",
    body: JSON.stringify(data)
  });
}

// 지정 기사 견적 요청
// export async function createDesignatedEstimateRequest(data: { driverId: string }) {
//   return cookieFetch("/customer/estimate-request/designated", {
//     method: "POST",
//     body: JSON.stringify(data)
//   });
// }
