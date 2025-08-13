"use client";

import React, { useState, useMemo, useCallback } from "react";
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
import { ToastModal } from "@/components/common-modal/ToastModal";
import { moveTypeLabelMap } from "@/constant/moveTypes";
import { useDebounce } from "@/hooks/useDebounce";
import RequestCardListSkeleton from "@/components/skeleton/RequestCardListSkeleton";

const MOVE_TYPES = ["소형이사", "가정이사", "사무실이사"] as const;
const SORT_OPTIONS = ["date", "request"];

export default function ReceivedRequestsPage() {
  const queryClient = useQueryClient();
  const [isDesignatedChecked, setIsDesignatedChecked] = useState(false);
  const [isAvailableRegionChecked, setIsAvailableRegionChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [sort, setSort] = useState("request");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedMoveTypes, setSelectedMoveTypes] = useState<string[]>([]);

  // useDebounce 훅 사용
  const debouncedSearchKeyword = useDebounce(searchKeyword, 300);

  const t = useTranslations("ReceivedReq");
  const tm = useTranslations("ToastModal.receivedRequest");
  const tToast = useTranslations("ToastModal");

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
      if (isDesignatedChecked && isAvailableRegionChecked) {
        // 두 체크박스 모두 선택된 경우 - 지정된 요청과 서비스 가능 지역 요청 모두 가져오기
        const [designatedRequests, availableRequests] = await Promise.all([
          driverService.getDesignatedRequests(),
          driverService.getAvailableRequests()
        ]);

        // Map을 사용한 중복 제거 (O(n) 성능)
        const allRequests = [...(designatedRequests || []), ...(availableRequests || [])];
        const uniqueRequests = Array.from(new Map(allRequests.map((req) => [req.id, req])).values());
        backendRequests = uniqueRequests;
      } else if (isDesignatedChecked) {
        backendRequests = await driverService.getDesignatedRequests();
      } else if (isAvailableRegionChecked) {
        backendRequests = await driverService.getAvailableRequests();
      } else {
        backendRequests = await driverService.getAllRequests();
      }

      return backendRequests ? backendRequests.map(mapBackendRequestToFrontend) : [];
    },
    staleTime: 5 * 60 * 1000, // 5분 캐시
    refetchOnWindowFocus: false // 창 포커스 시 재조회 비활성화
  });

  // useCallback으로 콜백 함수 최적화
  const handleSortChange = useCallback(
    (newSort: string) => {
      if (sort !== newSort) {
        setSort(newSort);
      }
    },
    [sort]
  );

  const handleMoveTypeToggle = useCallback((moveType: string) => {
    setSelectedMoveTypes((prev) =>
      prev.includes(moveType) ? prev.filter((type) => type !== moveType) : [...prev, moveType]
    );
  }, []);

  const handleCheckboxChange = useCallback((type: "designated" | "available", checked: boolean) => {
    if (type === "designated") {
      setIsDesignatedChecked(checked);
    } else {
      setIsAvailableRegionChecked(checked);
    }
  }, []);

  // useMemo로 필터링 및 정렬 최적화
  const filteredRequests = useMemo(() => {
    // requests가 비어있으면 빈 배열 반환
    if (!requests || requests.length === 0) {
      return [];
    }

    let filtered = [...requests]; // 원본 배열 복사

    // 이사 유형 필터링
    if (selectedMoveTypes.length > 0) {
      filtered = filtered.filter((request) => {
        const requestMoveTypeLabel = moveTypeLabelMap[request.moveType]?.label || "";
        return selectedMoveTypes.includes(requestMoveTypeLabel);
      });
    }

    // 검색어 필터링 (디바운스된 검색어 사용)
    if (debouncedSearchKeyword.trim()) {
      filtered = filtered.filter((request) => {
        const matches = request.customerName.toLowerCase().includes(debouncedSearchKeyword.toLowerCase());
        return matches;
      });
    }

    // 정렬
    filtered.sort((a, b) => {
      switch (sort) {
        case "date":
          // 이사일 빠른순 (7월 25일이 8월 10일보다 먼저 나와야 함)
          if (a.originalMoveDate && b.originalMoveDate) {
            const dateA = new Date(a.originalMoveDate).getTime();
            const dateB = new Date(b.originalMoveDate).getTime();
            return dateA - dateB;
          }
          return 0;
        case "request":
          // 요청일 빠른순 (원본 createdAt 기준) - 최신 요청부터
          if (a.originalCreatedAt && b.originalCreatedAt) {
            const dateA = new Date(a.originalCreatedAt).getTime();
            const dateB = new Date(b.originalCreatedAt).getTime();
            return dateB - dateA; // 순서 반전: 최신 요청부터
          }
          return 0;
        default:
          return 0;
      }
    });

    return filtered;
  }, [requests, debouncedSearchKeyword, selectedMoveTypes, sort]);

  const handleSendEstimate = useCallback((request: Request) => {
    setSelectedRequest(request);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedRequest(null);
  }, []);

  const handleSubmitEstimate = useCallback(
    async (price: number, comment: string) => {
      if (!selectedRequest) return;

      try {
        await driverService.createEstimate(selectedRequest.id, {
          price,
          message: comment
        });
        ToastModal(tm("sentEstimate"));
        handleCloseModal();
        // React Query로 데이터 새로고침
        queryClient.invalidateQueries({ queryKey: ["driver-requests"] });
      } catch (err: unknown) {
        console.error("견적 전송 실패:", err);

        // 409 Conflict 에러인 경우 (이미 견적을 보낸 경우)
        if (err instanceof Error && err.message.includes(tToast("alreadySent"))) {
          ToastModal(tm("alreadySentEstimate"));
        } else {
          ToastModal(tm("failedToSendEstimate"));
        }
      }
    },
    [selectedRequest, handleCloseModal, queryClient, tm, tToast]
  );

  const handleRejectEstimate = useCallback((request: Request) => {
    setSelectedRequest(request);
    setRejectModalOpen(true);
    setModalOpen(false);
  }, []);

  const handleCloseRejectModal = useCallback(() => {
    setRejectModalOpen(false);
    setSelectedRequest(null);
  }, []);

  const handleSubmitReject = useCallback(
    async (estimateRequestId: string, reason: string) => {
      if (!selectedRequest) return;

      try {
        await driverService.rejectEstimateRequest(estimateRequestId, {
          reason
        });
        ToastModal(tm("estimateRejected"));
        handleCloseRejectModal();
        // React Query로 데이터 새로고침
        queryClient.invalidateQueries({ queryKey: ["driver-requests"] });
      } catch (err: unknown) {
        console.error("견적 요청 반려 실패:", err);

        // 견적이 존재하지 않는 경우
        if (err instanceof Error && err.message.includes("이미 반려한 견적 요청입니다")) {
          ToastModal(tm("alreadyRejectedEstimate"));
        } else {
          ToastModal(tm("failedToRejectEstimate"));
        }
      }
    },
    [selectedRequest, handleCloseRejectModal, queryClient, tm]
  );

  const renderContent = () => {
    // Early return 패턴으로 가독성 향상
    if (isPending) {
      return <RequestCardListSkeleton />;
    }

    if (error) {
      return (
        <div role="alert" aria-live="polite">
          <p className="text-center text-base font-normal text-red-400 lg:text-xl">{t("failedFetchReq")}</p>
        </div>
      );
    }

    if (filteredRequests.length === 0) {
      return (
        <section aria-label="빈 상태" className="flex w-full flex-col items-center justify-center px-6 py-20">
          <div className="flex flex-col items-center gap-6">
            <div className="relative h-48 w-48">
              <Image
                src={imgEmptyReview}
                alt="받은 요청이 없음을 나타내는 빈 상태 이미지"
                className="absolute top-0 left-0 h-full w-full object-contain opacity-50"
                unoptimized
              />
            </div>
            <p className="text-center text-base font-normal text-neutral-400 lg:text-xl">{tm("noRequestReceived")}</p>
          </div>
        </section>
      );
    }

    // 정상적인 경우: 요청 목록 렌더링
    return (
      <section aria-label="받은 요청 목록">
        <RequestCardList
          requests={filteredRequests}
          onSendEstimate={handleSendEstimate}
          onRejectEstimate={handleRejectEstimate}
        />
      </section>
    );
  };

  return (
    <main className="flex min-h-screen justify-center bg-gray-50 px-4" role="main" aria-label="받은 요청 페이지">
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

        <div className="hidden items-start justify-start gap-3 lg:inline-flex" role="group" aria-label="이사 유형 필터">
          {MOVE_TYPES.map((moveType) => (
            <ChipCircle
              key={moveType}
              type="service"
              text={moveType === "소형이사" ? "SMALL" : moveType === "가정이사" ? "HOME" : "OFFICE"}
              color="gray"
              click={true}
              isSelected={selectedMoveTypes.includes(moveType)}
              onSelect={() => handleMoveTypeToggle(moveType)}
              aria-label={`${moveType} 필터 ${selectedMoveTypes.includes(moveType) ? "선택됨" : "선택되지 않음"}`}
            />
          ))}
        </div>

        {/* 모바일/태블릿에서는 전체 옆에 드롭다운 */}
        <div className="flex w-full flex-col gap-4" role="group" aria-label="요청 목록 제어">
          {/* 전체 4건 + 드롭다운 */}
          <div className="flex w-full items-center justify-between gap-2 lg:w-auto">
            <div
              className="font-['Pretendard'] text-lg leading-relaxed font-semibold text-neutral-800"
              role="status"
              aria-live="polite"
            >
              {t("total")} {filteredRequests.length}
              {t("count")}
            </div>
            {/* 모바일에선 오른쪽 붙고, lg 이상에선 이 div가 무시됨 */}
            <div className="flex items-center gap-2 lg:hidden" role="group" aria-label="모바일 정렬 및 필터">
              <SortDropdown
                sortings={SORT_OPTIONS}
                sort={sort}
                setSort={handleSortChange}
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
          <div
            className="hidden w-full items-center justify-between lg:flex"
            role="group"
            aria-label="데스크톱 필터 및 정렬"
          >
            {/* 체크박스 2개 */}
            <fieldset className="m-0 flex gap-4 border-none p-0" aria-label="필터 옵션">
              <legend className="absolute -m-px h-px w-px overflow-hidden border-0 p-0 whitespace-nowrap">
                필터 옵션
              </legend>
              <label className="flex items-center gap-2">
                <CustomCheckbox
                  checked={isDesignatedChecked}
                  onChange={(checked) => handleCheckboxChange("designated", checked)}
                  shape="square"
                  aria-label="지정된 요청만 보기"
                />
                <span className="text-base font-normal text-neutral-900">{t("filter.req")}</span>
              </label>
              <label className="flex items-center gap-2">
                <CustomCheckbox
                  checked={isAvailableRegionChecked}
                  onChange={(checked) => handleCheckboxChange("available", checked)}
                  shape="square"
                  aria-label="서비스 가능 지역 요청만 보기"
                />
                <span className="text-base font-normal text-neutral-900">{t("filter.service")}</span>
              </label>
            </fieldset>
            <SortDropdown
              sortings={SORT_OPTIONS}
              sort={sort}
              setSort={handleSortChange}
              translator={(key) => t(`${key}`)}
            />
          </div>
        </div>

        {renderContent()}
      </div>
    </main>
  );
}
