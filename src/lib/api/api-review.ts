import { cookieFetch } from "../FetchClient";

//작성가능한 리뷰(견적) 가져오기
export async function getWritableReviews() {
  return cookieFetch("/reviewable", {
    method: "GET"
  });
}
