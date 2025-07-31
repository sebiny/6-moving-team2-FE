"use client";

import Button from "@/components/Button";
import { ToastModal } from "@/components/common-modal/ToastModal";

export default function TestPage() {
  const handleShowToast = () => {
    ToastModal("견적요청에 실패했습니다!");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50">
      <h1 className="text-xl font-semibold">토스트 모달 테스트 페이지</h1>
      <Button type="orange" text="토스트" onClick={handleShowToast} />
    </div>
  );
}
