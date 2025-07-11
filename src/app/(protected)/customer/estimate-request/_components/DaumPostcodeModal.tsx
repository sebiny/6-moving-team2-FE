import DaumPostcode from "react-daum-postcode";
import Image from "next/image";

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
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-[608px] max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* 상단 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-800">주소를 검색해주세요</h2>
          <button onClick={onClose}>
            <Image
              src="/assets/icons/ic_X.svg"
              alt="닫기"
              width={28}
              height={28}
              className="transition hover:opacity-70"
            />
          </button>
        </div>

        {/* 다음 우편번호 검색창 */}
        <div className="p-4">
          <DaumPostcode
            onComplete={(data) => {
              const fullRoadAddress = data.buildingName
                ? `${data.roadAddress} (${data.buildingName})`
                : data.roadAddress;

              onComplete({
                zonecode: data.zonecode,
                roadAddress: fullRoadAddress,
                jibunAddress: data.jibunAddress || data.autoJibunAddress,
                buildingName: data.buildingName,
                apartment: data.apartment
              });

              onClose();
            }}
            autoClose={false}
            defaultQuery={query}
            style={{
              width: "100%",
              height: "400px",
              border: "1px solid #E5E7EB"
            }}
          />
        </div>
      </div>
    </div>
  );
}
