import Image from "next/image";
import React from "react";

function Reviews() {
  return (
    <div>
      <div className="text-black-400 font-semibold text-xl">리뷰</div>
      <div>
        <div>
          <div>5.0</div>
          <div>
            <Image
              src="/assets/icons/ic_star_yellow.svg"
              alt="별점"
              width={14}
              height={14}
            />
            <div>178개의 리뷰</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
