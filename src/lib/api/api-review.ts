import { cookieFetch } from "../FetchClient";

//작성가능한 리뷰(견적) 가져오기
export async function getWritableReviews(page?: number) {
  const query = page ? `?page=${page}` : "";
  const res = await cookieFetch(`/reviews/reviewable${query}`, {
    method: "GET"
  });
  return res;
}

//내가 쓴 리뷰 가져오기
export async function getMyReviews(page: number) {
  return cookieFetch(`/reviews/mine?page=${page}`, {
    method: "GET"
  });
}
//리뷰 생성하기
export async function createReview(data: {
  estimateRequestId: string;
  driverId: string;
  rating: number;
  content: string;
}) {
  return cookieFetch("/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

//리뷰 삭제
export async function deleteMyReview(reviewId: string, driverId: string) {
  const response = await cookieFetch(`/reviews/mine/${reviewId}?driverId=${driverId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  });
  return response;
}
//리뷰 수정
export async function updateMyReview(reviewId: string, driverId: string, data: { rating: number; content: string }) {
  return cookieFetch(`/reviews/mine/${reviewId}?driverId=${driverId}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
}
