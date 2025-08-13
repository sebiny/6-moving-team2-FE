import React, { useEffect, useState } from "react";
import StarIcon from "@/components/icon/StarIcon";
import InputText from "@/components/InputText";
import useMediaHook from "@/hooks/useMediaHook";
import { useTranslations } from "next-intl";

interface Props {
  setIsValid: (value: boolean) => void;
  setRating: (value: number) => void;
  setContent: (value: string) => void;
}

export default function ReviewWrite({ setIsValid, setRating, setContent }: Props) {
  const t = useTranslations("Review");
  const { isLg, isSm } = useMediaHook();
  const [InputValid, setInputValid] = useState(false);
  const [localRating, setLocalRating] = useState(0);
  const [localContent, setLocalContent] = useState("");

  useEffect(() => {
    setIsValid(localRating > 0 && InputValid);
    if (localContent) {
      setContent(localContent);
    }
  }, [localRating, InputValid, localContent]);

  const handleRating = (num: number) => {
    setLocalRating(num);
    setRating(num); // 부모로 전달
  };

  const textClass = "text-black-300 mb-3 lg:text-[18px] text-[16px] leading-[26px] font-semibold ";

  return (
    <div className="flex flex-col gap-7 lg:gap-8">
      <div>
        <p className={textClass}>{t("modal.rate")}</p>
        <div className="relative h-6 w-30 lg:h-9 lg:w-45">
          {isSm && !isLg && <StarIcon width={120} height={24} rating={localRating} />}
          {isLg && <StarIcon width={180} height={36} rating={localRating} />}
          <div className="absolute top-0 left-0 flex">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="h-6 w-6 cursor-pointer lg:h-9 lg:w-9" onClick={() => handleRating(num)} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <p className={textClass}>{t("modal.detail")}</p>
        <InputText value={localContent} setInputValid={setInputValid} onChange={setLocalContent} />
      </div>
    </div>
  );
}
