import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface EstimateRequestModalType {
  errorMsg: string;
  onClose: () => void;
}

function EstimateRequestModal({ errorMsg, onClose }: EstimateRequestModalType) {
  const router = useRouter();
  const t = useTranslations("FindDriver");
  const handleClick = () => {
    router.push("/customer/estimate-request");
    onClose();
  };
  return (
    <div className="z-50 w-[293px] rounded-[32px] bg-white p-6 px-4 py-6 shadow-lg md:w-[608px] md:px-6 md:py-8">
      <div className="flex justify-between">
        <p className="mb-4 text-lg font-semibold md:text-2xl">{t("driverPage.requestQuote")}</p>
        <button className="relative h-6 w-6 md:h-9 md:w-9" onClick={onClose}>
          <Image src="/assets/icons/ic_X.svg" alt="닫기" fill className="object-contain" />
        </button>
      </div>
      <p className="mt-[30px] mb-6 text-lg md:my-10">{errorMsg}</p>
      <button
        onClick={handleClick}
        className="md: h-[54px] w-[260px] rounded-xl bg-orange-400 text-lg font-semibold text-white md:h-[64px] md:w-[560px] md:rounded-2xl"
      >
        {t("requestQuote.modal.generalBtn")}
      </button>
    </div>
  );
}

export default EstimateRequestModal;
