import React from "react";
import StarIcon from "../icon/StarIcon";
import { format } from "date-fns";
import { ReviewType } from "@/types/reviewType";

interface DriverReviewType {
  review: ReviewType;
}

function DriverReview({ review }: DriverReviewType) {
  return (
    <div className="flex flex-col gap-6 py-6">
      <div>
        <div className="flex gap-[14px]">
          <div className="">{review.id}</div>
          <div className="border-line-200 w-[1px] border-l"></div>
          <div className="text-gray-300">{format(new Date(review.createdAt), "yyyy-MM-dd")}</div>
        </div>
        <div className="mt-2">
          <StarIcon rating={review.rating} width={100} />
        </div>
      </div>
      <p>{review.content}</p>
    </div>
  );
}

export default DriverReview;
