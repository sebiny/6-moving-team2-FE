import { ReviewType } from "@/constant/reviewType";

export function ReviewAverage(reviews: ReviewType[]) {
  const result = {
    average: 0,
    total: 0,
    num: [0, 0, 0, 0, 0]
  };
  let sum = 0;
  result.total = reviews.length;
  for (let i = 0; i < reviews.length; i++) {
    sum += reviews[i].rating;
    if (reviews[i].rating === 1) result.num[0] += 1;
    else if (reviews[i].rating === 2) result.num[1] += 1;
    else if (reviews[i].rating === 3) result.num[2] += 1;
    else if (reviews[i].rating === 4) result.num[3] += 1;
    else result.num[4] += 1;
  }
  result.average = Math.round((sum / result.total) * 10) / 10;

  return result;
}
