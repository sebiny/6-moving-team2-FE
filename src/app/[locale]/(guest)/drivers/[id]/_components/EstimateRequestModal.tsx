import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface EstimateRequestModalType {
  errorMsg: string;
  setErrorMsg: (value: string) => void;
}

function EstimateRequestModal({ errorMsg, setErrorMsg }: EstimateRequestModalType) {
  const router = useRouter();
  const handleClick = () => {
    router.push("/customer/estimate-request");
  };
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
      <div className="z-50 w-[293px] rounded-[32px] bg-white p-6 px-4 py-6 shadow-lg md:w-[608px] md:px-6 md:py-8">
        <div className="flex justify-between">
          <p className="mb-4 text-lg font-semibold md:text-2xl">지정 견적 요청하기</p>
          <button className="relative h-6 w-6 md:h-9 md:w-9" onClick={() => setErrorMsg("")}>
            <Image src="/assets/icons/ic_X.svg" alt="닫기" fill className="object-contain" />
          </button>
        </div>
        <p className="mt-[30px] mb-6 text-lg md:my-10">{errorMsg}</p>
        <button
          onClick={handleClick}
          className="md: h-[54px] w-[260px] rounded-xl bg-orange-400 text-lg font-semibold text-white md:h-[64px] md:w-[560px] md:rounded-2xl"
        >
          일반 견적 요청 하기
        </button>
      </div>
    </div>
  );
}

export default EstimateRequestModal;
