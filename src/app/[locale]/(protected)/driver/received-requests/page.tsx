"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import { driverService } from "@/lib/api/api-driver";
import { mapBackendRequestToFrontend } from "@/utills/RequestMapper";
import { useTranslations } from "next-intl";

export default function ReceivedRequestsPage() {
  const queryClient = useQueryClient();
  const [isDesignatedChecked, setIsDesignatedChecked] = useState(false);
  const [isAvailableRegionChecked, setIsAvailableRegionChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [sort, setSort] = useState("request");
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedMoveTypes, setSelectedMoveTypes] = useState<string[]>([]);

  const t = useTranslations("ReceivedReq");
  // React Query로 데이터 가져오기
  const {
    data: requests = [],
    isPending,
    error
  } = useQuery({
    queryKey: ["driver-requests", isDesignatedChecked, isAvailableRegionChecked],
    queryFn: async () => {
      let backendRequests;

      // 체크박스 상태에 따라 다른 API 호출
      if (isDesignatedChecked) {
        backendRequests = await driverService.getDesignatedRequests();
      } else if (isAvailableRegionChecked) {
        backendRequests = await driverService.getAvailableRequests();
      } else {
        backendRequests = await driverService.getAllRequests();
      }

      return backendRequests ? backendRequests.map(mapBackendRequestToFrontend) : [];
    },
    staleTime: 5 * 60 * 1000 // 5분
  });

  // 검색, 이사 유형 필터링, 정렬
  useEffect(() => {
    let filtered = requests;

    // 이사 유형 필터링
    if (selectedMoveTypes.length > 0) {
      filtered = filtered.filter((request) => selectedMoveTypes.includes(request.moveType));
    }

    // 검색어 필터링
    if (searchKeyword.trim()) {
      filtered = filtered.filter((request) => {
        const matches = request.customerName.toLowerCase().includes(searchKeyword.toLowerCase());
        return matches;
      });
    }

    // 정렬
    filtered.sort((a, b) => {
      switch (sort) {
        case "date":
          // 이사일 빠른순 (7월 25일이 8월 10일보다 먼저 나와야 함)
          if (a.originalMoveDate && b.originalMoveDate) {
            return new Date(a.originalMoveDate).getTime() - new Date(b.originalMoveDate).getTime();
          }
          return 0;
        case "request":
          // 요청일 빠른순 (원본 createdAt 기준)
          if (a.originalCreatedAt && b.originalCreatedAt) {
            return new Date(a.originalCreatedAt).getTime() - new Date(b.originalCreatedAt).getTime();
          }
          return 0;
        default:
          return 0;
      }
    });

    setFilteredRequests(filtered);
  }, [searchKeyword, selectedMoveTypes, requests, sort]);

  const handleSendEstimate = (request: Request) => {
    setSelectedRequest(request);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRequest(null);
  };

  const handleSubmitEstimate = async (price: number, comment: string) => {
    if (!selectedRequest) return;

    try {
      await driverService.createEstimate(selectedRequest.id, {
        price,
        message: comment
      });
      alert("견적이 성공적으로 전송되었습니다.");
      handleCloseModal();
      // React Query로 데이터 새로고침
      queryClient.invalidateQueries({ queryKey: ["driver-requests"] });
    } catch (err: unknown) {
      console.error("견적 전송 실패:", err);

      // 409 Conflict 에러인 경우 (이미 견적을 보낸 경우)
      if (err instanceof Error && err.message.includes("이미 견적을 보냈습니다")) {
        alert("이미 이 요청에 대해 견적을 보내셨습니다.");
      } else {
        alert("견적 전송에 실패했습니다.");
      }
    }
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
  const handleSubmitReject = async (estimateRequestId: string, reason: string) => {
    if (!selectedRequest) return;

    try {
      await driverService.rejectEstimateRequest(estimateRequestId, {
        reason
      });
      alert("견적 요청이 반려되었습니다.");
      handleCloseRejectModal();
      // React Query로 데이터 새로고침
      queryClient.invalidateQueries({ queryKey: ["driver-requests"] });
    } catch (err: unknown) {
      console.error("견적 요청 반려 실패:", err);

      // 견적이 존재하지 않는 경우
      if (err instanceof Error && err.message.includes("이미 반려한 견적 요청입니다")) {
        alert("이미 반려한 견적 요청입니다.");
      } else {
        alert("견적 요청 반려에 실패했습니다.");
      }
    }
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
        estimateRequestId={selectedRequest?.id ?? ""}
        moveType={selectedRequest?.moveType ?? ""}
        isDesignated={selectedRequest?.isDesignated ?? false}
        customerName={selectedRequest?.customerName ?? ""}
        fromAddress={selectedRequest?.fromAddress ?? ""}
        toAddress={selectedRequest?.toAddress ?? ""}
        moveDate={selectedRequest?.moveDate ?? ""}
      />
      <div className="flex flex-col gap-6">
        <PageHeader title={t("receivedReq")} />
        <SearchBar width="w-full" placeholder={t("placeholder")} value={searchKeyword} onChange={setSearchKeyword} />
        <div className="hidden items-start justify-start gap-3 lg:inline-flex">
          <ChipCircle
            type="region"
            text={t("smallMove")}
            color="gray"
            click={true}
            isSelected={selectedMoveTypes.includes("소형이사")}
            onSelect={(text) => {
              setSelectedMoveTypes((prev) =>
                prev.includes(text) ? prev.filter((type) => type !== text) : [...prev, text]
              );
            }}
          />
          <ChipCircle
            type="region"
            text={t("homeMove")}
            color="gray"
            click={true}
            isSelected={selectedMoveTypes.includes("가정이사")}
            onSelect={(text) => {
              setSelectedMoveTypes((prev) =>
                prev.includes(text) ? prev.filter((type) => type !== text) : [...prev, text]
              );
            }}
          />
          <ChipCircle
            type="region"
            text={t("officeMove")}
            color="gray"
            click={true}
            isSelected={selectedMoveTypes.includes("사무실이사")}
            onSelect={(text) => {
              setSelectedMoveTypes((prev) =>
                prev.includes(text) ? prev.filter((type) => type !== text) : [...prev, text]
              );
            }}
          />
        </div>

        {/* 모바일/태블릿에서는 전체 옆에 드롭다운 */}
        <div className="flex w-full flex-col gap-4">
          {/* 전체 4건 + 드롭다운 */}
          <div className="flex w-full items-center justify-between gap-2 lg:w-auto">
            <div className="font-['Pretendard'] text-lg leading-relaxed font-semibold text-neutral-800">
              {t("total")} {filteredRequests.length}
              {t("count")}
            </div>
            {/* 모바일에선 오른쪽 붙고, lg 이상에선 이 div가 무시됨 */}
            <div className="flex items-center gap-2 lg:hidden">
              <SortDropdown
                sortings={["date", "request"]}
                sort={sort}
                setSort={setSort}
                translator={(key) => t(`${key}`)}
              />
              <FilterSection
                selectedMoveTypes={selectedMoveTypes}
                setSelectedMoveTypes={setSelectedMoveTypes}
                isDesignatedChecked={isDesignatedChecked}
                setIsDesignatedChecked={setIsDesignatedChecked}
                isAvailableRegionChecked={isAvailableRegionChecked}
                setIsAvailableRegionChecked={setIsAvailableRegionChecked}
              />
            </div>
          </div>

          {/* PC에서만 나오는 체크박스 + 드롭다운 */}
          <div className="hidden w-full items-center justify-between lg:flex">
            {/* 체크박스 2개 */}
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <CustomCheckbox
                  checked={isDesignatedChecked}
                  onChange={(checked) => {
                    setIsDesignatedChecked(checked);
                    if (checked) setIsAvailableRegionChecked(false);
                  }}
                  shape="square"
                />
                <span className="text-base font-normal text-neutral-900">{t("filter.req")}</span>
              </label>
              <label className="flex items-center gap-2">
                <CustomCheckbox
                  checked={isAvailableRegionChecked}
                  onChange={(checked) => {
                    setIsAvailableRegionChecked(checked);
                    if (checked) setIsDesignatedChecked(false);
                  }}
                  shape="square"
                />
                <span className="text-base font-normal text-neutral-900">{t("filter.service")}</span>
              </label>
            </div>
            <SortDropdown
              sortings={["date", "request"]}
              sort={sort}
              setSort={setSort}
              translator={(key) => t(`${key}`)}
            />
          </div>
        </div>
        {isPending ? (
          <div className="flex w-full flex-col items-center justify-center px-6 py-20">
            <div className="flex flex-col items-center gap-6">
              <p className="text-center text-base font-normal text-neutral-400 lg:text-xl">로딩 중...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex w-full flex-col items-center justify-center px-6 py-20">
            <div className="flex flex-col items-center gap-6">
              <p className="text-center text-base font-normal text-red-400 lg:text-xl">{t("failedFetchReq")}</p>
            </div>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center px-6 py-20">
            <div className="flex flex-col items-center gap-6">
              {/* 이미지 */}
              <div className="relative h-48 w-48">
                <Image
                  src={imgEmptyReview}
                  alt="empty"
                  className="absolute top-0 left-0 h-full w-full object-contain opacity-50"
                />
              </div>
              {/* 텍스트 */}
              <p className="text-center text-base font-normal text-neutral-400 lg:text-xl">아직 받은 요청이 없어요!</p>
            </div>
          </div>
        ) : (
          <RequestCardList
            requests={filteredRequests}
            onSendEstimate={handleSendEstimate}
            onRejectEstimate={handleRejectEstimate}
          />
        )}
      </div>
    </div>
  );
}
