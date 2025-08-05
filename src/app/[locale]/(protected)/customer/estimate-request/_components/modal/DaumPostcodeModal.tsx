import DaumPostcode, { Address } from "react-daum-postcode";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface PostcodeProps {
  query: string;
  onComplete: (data: {
    zonecode: string;
    roadAddress: string;
    jibunAddress: string;
    buildingName: string;
    apartment: "Y" | "N";
  }) => void;
  onClose: () => void;
}

export default function DaumPostcodeModal({ onComplete, onClose, query }: PostcodeProps) {
  const t = useTranslations("EstimateReq");
  const handleComplete = (data: Address) => {
    const fullRoadAddress = data.buildingName ? `${data.roadAddress} (${data.buildingName})` : data.roadAddress;

    onComplete({
      zonecode: data.zonecode,
      roadAddress: fullRoadAddress,
      jibunAddress: data.jibunAddress || data.autoJibunAddress,
      buildingName: data.buildingName,
      apartment: data.apartment
    });

    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-[608px] max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* 상단 헤더 */}
        <header className="flex items-center gap-2 border-gray-100 p-4">
          <button onClick={onClose}>
            <Image
              src="/assets/icons/ic_chevron_left_black.svg"
              alt="뒤로가기"
              width={28}
              height={28}
              loading="lazy"
              className="transition hover:opacity-70"
            />
          </button>
          <h2 className="text-lg font-bold text-gray-800">{t("searchResult")}</h2>
        </header>

        {/* 다음 우편번호 검색창 */}
        <div className="p-1">
          <DaumPostcode
            onComplete={handleComplete}
            autoClose={false}
            defaultQuery={query}
            style={{
              width: "100%",
              height: "400px"
            }}
          />
        </div>
      </div>
    </div>
  );
}
