import React, { useState } from "react";
import StarIcon from "@/components/icon/StarIcon";
import InputText from "@/components/InputText";

interface Props {
  setIsValid: (value: boolean) => void;
}

export default function ReviewWrite({ setIsValid }: Props) {
  const [rating, setRating] = useState(0);
  const textClass = "text-black-300 mb-3 text-[18px] leading-[26px] font-semibold";
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className={textClass}>평점을 선택해 주세요</p>
        <div className="relative h-9 w-45">
          <StarIcon width={180} height={36} rating={rating} />
          <div className="absolute top-0 left-0 flex">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="h-9 w-9 cursor-pointer" onClick={() => setRating(num)} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <p className={textClass}>상세 후기를 작성해 주세요</p>
        <InputText setIsValid={setIsValid} />
      </div>
    </div>
  );
}
// rating이 0이 아니고 Input 유효성 통과하면 리뷰 등록 활성화
