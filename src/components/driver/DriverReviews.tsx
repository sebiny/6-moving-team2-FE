"use client";
import React, { useState } from "react";
import DriverReview from "./DriverReview";
import StarIcon from "../icon/StarIcon";
import Pagination from "../Pagination";
import { DriverType } from "@/types/driverType";
import { ReviewRatio } from "@/utills/ReviewRatio";
import { useQuery } from "@tanstack/react-query";
import { driverService } from "@/lib/api/api-driver";
import { ReviewType } from "@/types/reviewType";

interface ReviewsType {
  driver: DriverType;
}

function DriverReviews({ driver }: ReviewsType) {
  const [page, setPage] = useState<number>(1);

  const { data: reviews, isPending } = useQuery<ReviewType[] | null>({
    queryKey: ["reviews", driver.id, page],
    queryFn: () => driverService.getDriverReviews(driver.id, page)
  });
  if (isPending) return <div>로딩중...</div>;
  if (!reviews) return <p>리뷰 데이터를 불러오지 못했습니다.</p>;

  function StarBar(count: number) {
    return (count / reviews!.length) * 100;
  }

  const levels = [5, 4, 3, 2, 1];
  const result = ReviewRatio(reviews!);
  return (
    <div className="mb-50">
      <div className="text-black-400 text-xl font-semibold">리뷰</div>
      {reviews.length ? (
        <div>
          <div className="mt-4 flex justify-between">
            <div className="flex gap-[18px]">
              <div className="text-black-400 text-[40px] font-normal">{driver.averageRating}</div>
              <div>
                <StarIcon width={100} rating={driver.averageRating} />
                <div>{reviews.length}개의 리뷰</div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              {levels.map((level) => (
                <div key={level} className="flex items-center gap-4">
                  <p className="w-6">{level}점</p>
                  <div className="bg-background-300 h-2 w-[180px] rounded">
                    <div className="h-full rounded bg-[#FFC149]" style={{ width: `${StarBar(result[level - 1])}%` }} />
                  </div>
                  <p className="text-sm text-gray-300">{result[level - 1]}</p>
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
            <Pagination currentPage={page} setCurrentPage={setPage} />
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
