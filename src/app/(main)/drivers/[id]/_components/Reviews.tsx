import Image from "next/image";
import React from "react";
import Review from "./Review";
import StarIcon from "../../../../../components/StarIcon";

function Reviews() {
  const reviews = [{ rating: 3 }, { rating: 2 }];
  const result = {
    average: 0,
    total: 0,
    num: [0, 0, 0, 0, 0]
  };

  function StarBar(count: number) {
    return (count / result.total) * 100;
  }

  function calReviews() {
    //후에 utils로 이동
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
  }

  calReviews();

  const levels = [5, 4, 3, 2, 1];

  return (
    <div>
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
            <Review />
          </div>
        </div>
      ) : (
        <div>
          <p>아직 등록된 리뷰가 없어요!</p>
          <p className="text-sm text-gray-400">가장 먼저 리뷰를 등록해보세요</p>
        </div>
      )}
    </div>
  );
}

export default Reviews;
