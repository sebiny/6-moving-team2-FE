"use client";

import React, { useState } from "react";
import RequestCardList from "./_components/RequestCardList";
import { Request } from "@/types/request";
import SearchBar from "@/components/input/SearchBar";
import ChipCircle from "@/components/chip/ChipCircle";
import SortDropdown from "@/components/dropdown/SortDropdown";
import PageHeader from "@/components/common/PageHeader";
import CustomCheckbox from "@/components/button/CustomCheckbox";
import imgEmptyReview from "/public/assets/images/img_empty_review.svg";
import Image from "next/image";
import SendEstimateModal from "./_components/SendEstimateModal";
import RejectEstimateModal from "./_components/RejectEstimateModal";
import FilterSection from "@/components/filter/FilterSection";

const dummyRequests: Request[] = [
  {
    id: "1",
    moveType: "소형이사",
    isDesignated: true,
    createdAt: "1시간 전",
    customerName: "김인서",
    fromAddress: "서울시 중구",
    toAddress: "경기도 수원시",
    moveDate: "2024년 07월 01일 (월)"
  },
  {
    id: "2",
    moveType: "가정이사",
    isDesignated: false,
    createdAt: "2시간 전",
    customerName: "이현지",
    fromAddress: "서울시 강남구",
    toAddress: "인천광역시 남동구",
    moveDate: "2024년 07월 05일 (금)"
  }
];

export default function ReceivedRequestsPage() {
  const [showEmpty, setShowEmpty] = useState(false); // dev only
  const [isDesignatedChecked, setIsDesignatedChecked] = useState(false);
  const [isAvailableRegionChecked, setIsAvailableRegionChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  // 상단 useState 정의
  const [sort, setSort] = useState("rating");

  const requests = showEmpty
    ? []
    : [...dummyRequests, ...dummyRequests].map((item, idx) => ({ ...item, id: `${item.id}-${idx}` }));

  const handleSendEstimate = (request: Request) => {
    setSelectedRequest(request);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRequest(null);
  };

  const handleSubmitEstimate = (price: number, comment: string) => {
    // 실제 전송 로직은 추후 구현
    alert(`견적가: ${price}, 코멘트: ${comment}`);
    handleCloseModal();
  };

  const handleRejectEstimate = (request: Request) => {
    setSelectedRequest(request);
    setRejectModalOpen(true);
    setModalOpen(false);
  };
  const handleCloseRejectModal = () => {
    setRejectModalOpen(false);
    setSelectedRequest(null);
  };
  const handleSubmitReject = (price: number, comment: string) => {
    alert(`반려 사유: ${comment}`);
    handleCloseRejectModal();
  };

  return (
    <div className="flex min-h-screen justify-center bg-gray-50 px-4">
      <SendEstimateModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitEstimate}
        moveType={selectedRequest?.moveType ?? ""}
        isDesignated={selectedRequest?.isDesignated ?? false}
        customerName={selectedRequest?.customerName ?? ""}
        fromAddress={selectedRequest?.fromAddress ?? ""}
        toAddress={selectedRequest?.toAddress ?? ""}
        moveDate={selectedRequest?.moveDate ?? ""}
      />
      <RejectEstimateModal
        open={rejectModalOpen}
        onClose={handleCloseRejectModal}
        onSubmit={handleSubmitReject}
        moveType={selectedRequest?.moveType ?? ""}
        isDesignated={selectedRequest?.isDesignated ?? false}
        customerName={selectedRequest?.customerName ?? ""}
        fromAddress={selectedRequest?.fromAddress ?? ""}
        toAddress={selectedRequest?.toAddress ?? ""}
        moveDate={selectedRequest?.moveDate ?? ""}
      />
      <div className="flex flex-col gap-6">
        <PageHeader title="받은 요청" />
        {/* DEV ONLY: 빈 페이지 토글 버튼 */}
        <button
          className="mb-2 self-end rounded bg-gray-200 px-3 py-1 text-xs text-gray-700 hover:bg-gray-300"
          onClick={() => setShowEmpty((v) => !v)}
        >
          {showEmpty ? "요청 목록 보기" : "빈 페이지 보기 (DEV)"}
        </button>
        <SearchBar width="w-full" placeholder="어떤 고객님을 찾고 계세요?" />
        <div className="hidden items-start justify-start gap-3 lg:inline-flex">
          <ChipCircle type="region" text="소형이사" color="gray" />
          <ChipCircle type="region" text="가정이사" color="gray" />
          <ChipCircle type="region" text="사무실이사" color="gray" />
        </div>

        {/* ✅ 모바일/태블릿에서는 전체 옆에 드롭다운 */}
        <div className="flex w-full flex-col gap-4">
          {/* 전체 4건 + 드롭다운 */}
          <div className="flex w-full items-center justify-between gap-2 lg:w-auto">
            <div className="font-['Pretendard'] text-lg leading-relaxed font-semibold text-neutral-800">
              전체 {requests.length}건
            </div>
            {/* ✅ 모바일에선 오른쪽 붙고, lg 이상에선 이 div가 무시됨 */}
            <div className="flex items-center gap-2 lg:hidden">
              <SortDropdown sortings={["rating", "date", "request"]} sort={sort} setSort={setSort} />
              <FilterSection />
            </div>
          </div>

          {/* ✅ PC에서만 나오는 체크박스 + 드롭다운 */}
          <div className="hidden w-full items-center justify-between lg:flex">
            {/* 체크박스 2개 */}
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <CustomCheckbox checked={isDesignatedChecked} onChange={setIsDesignatedChecked} shape="square" />
                <span className="text-base font-normal text-neutral-900">지정 견적 요청</span>
              </label>
              <label className="flex items-center gap-2">
                <CustomCheckbox
                  checked={isAvailableRegionChecked}
                  onChange={setIsAvailableRegionChecked}
                  shape="square"
                />
                <span className="text-base font-normal text-neutral-900">서비스 가능 지역</span>
              </label>
            </div>
            <SortDropdown sortings={["rating", "date", "request"]} sort={sort} setSort={setSort} />
          </div>
        </div>
        {requests.length === 0 ? (
          <div className="inline-flex flex-col items-start justify-start gap-2.5">
            <div className="flex w-[955px] flex-col items-center justify-center gap-2.5 p-44">
              <div className="flex flex-col items-center justify-start gap-8">
                <div className="relative h-48 w-60 overflow-hidden">
                  <div className="absolute top-[-16.29px] left-[-11.04px] h-64 w-64 opacity-50">
                    <Image src={imgEmptyReview} alt="empty" fill style={{ objectFit: "cover" }} />
                  </div>
                </div>
                <div className="justify-center text-center font-['Pretendard'] text-xl leading-loose font-normal text-neutral-400">
                  아직 받은 요청이 없어요!
                </div>
              </div>
            </div>
          </div>
        ) : (
          <RequestCardList
            requests={requests}
            onSendEstimate={handleSendEstimate}
            onRejectEstimate={handleRejectEstimate}
          />
        )}
      </div>
    </div>
  );
}
