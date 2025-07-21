import { ReviewType } from "@/types/reviewType";

export function ReviewRatio(reviews: ReviewType[]) {
  const result = [0, 0, 0, 0, 0];
  for (let i = 0; i < reviews.length; i++) {
    if (reviews[i].rating === 1) result[0] += 1;
    else if (reviews[i].rating === 2) result[1] += 1;
    else if (reviews[i].rating === 3) result[2] += 1;
    else if (reviews[i].rating === 4) result[3] += 1;
    else result[4] += 1;
  }

  return result;
}
