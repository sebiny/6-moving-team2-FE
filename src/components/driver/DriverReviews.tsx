import React from "react";
import DriverReview from "./DriverReview";
import StarIcon from "../icon/StarIcon";
import Pagination from "../Pagination";
import { ResultType, ReviewType } from "@/constant/reviewType";

interface ReviewsType {
  reviews: ReviewType[];
  result: ResultType;
}

function DriverReviews({ reviews, result }: ReviewsType) {
  function StarBar(count: number) {
    return (count / result.total) * 100;
  }

  const levels = [5, 4, 3, 2, 1];

  return (
    <div className="mb-50">
      <div className="text-black-400 text-xl font-semibold">리뷰</div>
      {reviews.length ? (
        <div>
          <div className="mt-4 flex justify-between">
            <div className="flex gap-[18px]">
              <div className="text-black-400 text-[40px] font-normal">{result.average}</div>
              <div>
                <StarIcon width={100} rating={result.average} />
                <div>{reviews.length}개의 리뷰</div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              {levels.map((level) => (
                <div key={level} className="flex items-center gap-4">
                  <p className="w-6">{level}점</p>
                  <div className="bg-background-300 h-2 w-[180px] rounded">
                    <div
                      className="h-full rounded bg-[#FFC149]"
                      style={{ width: `${StarBar(result.num[level - 1])}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-300">{result.num[level - 1]}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            {reviews.map((review) => (
              <DriverReview key={review.id} review={review} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Pagination />
          </div>
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center">
          <p className="font-semibold">아직 등록된 리뷰가 없어요!</p>
          <p className="text-sm text-gray-400">가장 먼저 리뷰를 등록해보세요</p>
        </div>
      )}
    </div>
  );
}

export default DriverReviews;
