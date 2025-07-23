import React, { useEffect, useState } from "react";
import StarIcon from "@/components/icon/StarIcon";
import InputText from "@/components/InputText";
import useMediaHook from "@/hooks/useMediaHook";

interface Props {
  setIsValid: (value: boolean) => void;
}

export default function ReviewWrite({ setIsValid }: Props) {
  const { isLg, isSm } = useMediaHook();
  const [InputValid, setInputValid] = useState(false);
  const [rating, setRating] = useState(0);
  useEffect(() => {
    if (rating > 0 && InputValid) {
      setIsValid(true);
    }
  }, [rating, InputValid]);
  const textClass = "text-black-300 mb-3 lg:text-[18px] text-[16px] leading-[26px] font-semibold ";
  return (
    <div className="flex flex-col gap-7 lg:gap-8">
      <div>
        <p className={textClass}>평점을 선택해 주세요</p>
        <div className="relative h-6 w-30 lg:h-9 lg:w-45">
          {isSm && !isLg && <StarIcon width={120} height={24} rating={rating} />}
          {isLg && <StarIcon width={180} height={36} rating={rating} />}
          <div className="absolute top-0 left-0 flex">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="h-6 w-6 cursor-pointer lg:h-9 lg:w-9" onClick={() => setRating(num)} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <p className={textClass}>상세 후기를 작성해 주세요</p>
        <InputText setInputValid={setInputValid} />
      </div>
    </div>
  );
}
// rating이 0이 아니고 Input 유효성 통과하면 리뷰 등록 활성화
