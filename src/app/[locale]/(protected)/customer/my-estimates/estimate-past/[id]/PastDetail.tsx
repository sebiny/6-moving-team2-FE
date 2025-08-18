"use client";

import Title from "@/components/Title";
import ShareDriver from "@/components/ShareDriver";
import OrangeBackground from "@/components/OrangeBackground";
import Image from "next/image";
import { useParams } from "next/navigation";
import AutoRejectedAlert from "./_components/AutoRejectedAlert";
import { useTranslations } from "use-intl";
import { useEstimateDetail } from "@/lib/api/api-myEstimate";
import dayjs from "dayjs";
import { getMoveTypeLabel } from "@/utills/moveUtils";
import { formatStreetAddress } from "@/utills/addressUtils";
import EstimateDetailInfo from "@/components/common/EstimateDetailInfo";
import { useKakaoShare } from "@/hooks/useKakaoShare";
import { useCreateShareLink } from "@/lib/api/api-shareEstimate";
import PageHeader from "@/components/common/PageHeader";
import LoadingLottie from "@/components/loading/LoadingAnimation";
import "dayjs/locale/ko";
import { useEffect, useState } from "react";
import { ToastModal } from "@/components/common-modal/ToastModal";

export default function PastDetailPage() {
  dayjs.locale("ko");

  const t = useTranslations("MyEstimates");
  const { id } = useParams();
  const { data } = useEstimateDetail(id as string);
  const { mutateAsync: createShareLink } = useCreateShareLink();

  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const shareToKakao = useKakaoShare();

  if (!data) {
    return (
      <main id="main-content" role="main" className="mt-70">
        <LoadingLottie className="mt-30" role="status" aria-live="polite" />
      </main>
    );
  }

  const { status, comment, price, requestDate, moveDate, moveType, fromAddress, toAddress, driver, isDesignated } =
    data;

  const labels: ("SMALL" | "HOME" | "OFFICE" | "REQUEST")[] =
    isDesignated && moveType !== "REQUEST" ? [moveType, "REQUEST"] : [moveType];

  // 페이지 진입 시 공유 링크 선생성
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await createShareLink({ estimateId: id as string, sharedFrom: "CUSTOMER" });
        if (mounted && res?.shareUrl) setShareUrl(res.shareUrl);
      } catch {}
    })();
    return () => {
      mounted = false;
    };
  }, [id, createShareLink]);

  // 공유 URL 확보
  const ensureShareUrl = async (): Promise<string | null> => {
    if (shareUrl) return shareUrl;
    try {
      const res = await createShareLink({ estimateId: id as string, sharedFrom: "CUSTOMER" });
      if (res?.shareUrl) {
        setShareUrl(res.shareUrl);
        return res.shareUrl;
      }
    } catch {}
    return null;
  };

  const handleKakaoShare = async () => {
    const url = await ensureShareUrl();
    if (!url) {
      ToastModal("공유 URL을 생성하지 못했습니다.");
      return;
    }
    shareToKakao({
      title: `${driver.name} 기사님의 견적서`,
      description: `가격: ${price.toLocaleString()}원`,
      imageUrl: driver.profileImage
        ? `https://www.moving-2.click${driver.profileImage}`
        : "https://www.moving-2.click/assets/images/img_profile.svg",
      link: { mobileWebUrl: url, webUrl: url },
      buttons: [{ title: "견적서 보기", link: { mobileWebUrl: url, webUrl: url } }]
    });
  };

  const handleFacebookShare = async () => {
    const url = await ensureShareUrl();
    if (!url) {
      ToastModal("공유 URL을 생성하지 못했습니다.");
      return;
    }
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookShareUrl, "_blank", "width=600,height=400");
  };

  return (
    <>
      {/* 상단 서브 헤더 */}
      <header className="sticky top-14 z-9 bg-white lg:top-22" aria-label="페이지 헤더">
        <PageHeader title={t("estimateDetail")} />
      </header>

      {/* 상단 배경 + 프로필 */}
      <section aria-labelledby="driver-profile-section" className="relative">
        <h2 id="driver-profile-section" className="sr-only">
          기사 프로필
        </h2>
        <OrangeBackground /> {/* 내부 이미지는 alt="" 처리되었거나 aria-hidden 적용 권장 */}
        <div className="relative mx-auto max-w-[550px] md:max-w-[650px] lg:max-w-[1150px]">
          <div className="relative -mt-10 md:-mt-20">
            <Image
              src={driver.profileImage ?? "/assets/images/img_profile.svg"}
              alt={`${driver.name} 기사님 프로필 사진`}
              width={100}
              height={100}
              className="h-18 w-18 rounded-lg md:h-27 md:w-27 lg:h-37 lg:w-37"
            />
          </div>
        </div>
      </section>

      {/* 본문 */}
      <main id="main-content" role="main" className="bg-white">
        <div className="flex flex-col px-5 py-[60px] pt-10 md:px-17 md:pt-15 lg:mx-auto lg:grid lg:max-w-[1300px] lg:grid-cols-[1fr_300px] lg:gap-20 lg:px-10 lg:pt-[50px] lg:pb-[120px]">
          {/* 왼쪽 콘텐츠 */}
          <article className="flex flex-col gap-10" aria-labelledby="estimate-article-title">
            <h1 id="estimate-article-title" className="sr-only">
              {driver.name} 기사님의 견적 상세
            </h1>

            <Title
              status={status}
              labels={labels}
              driver={{
                id: driver.id,
                isFavorite: driver.isFavorite,
                name: driver.name,
                rating: driver.avgRating ?? 0.0,
                reviewCount: driver.reviewCount,
                experienceYear: driver.career,
                confirmedCount: driver.work,
                likes: driver.favoriteCount
              }}
              message={comment}
              estimatePrice={price}
            />

            <hr className="border-t border-gray-100" />

            <EstimateDetailInfo
              requestDate={dayjs(requestDate).format("YY.MM.DD")}
              serviceType={getMoveTypeLabel(moveType)}
              moveDate={dayjs(moveDate).format("YYYY. MM. DD(ddd) A hh:mm")}
              from={formatStreetAddress(fromAddress)}
              to={formatStreetAddress(toAddress)}
              // 선택: ISO 값까지 넘기면 <time dateTime> 채워져 접근성/SEO 향상
              requestDateISO={dayjs(requestDate).toISOString()}
              moveDateISO={dayjs(moveDate).toISOString()}
            />

            {/* AUTO_REJECTED인 경우만 표시 */}
            {status === "AUTO_REJECTED" && <AutoRejectedAlert />}
          </article>

          {/* 모바일 구분선 */}
          <hr className="my-6 border-t border-gray-100 lg:hidden" />

          {/* 우측 사이드: 공유만 */}
          <aside className="lg:flex lg:flex-col lg:gap-6" aria-label="공유 영역">
            <ShareDriver
              text={t("shareEstimate")}
              onKakaoShare={handleKakaoShare}
              onFacebookShare={handleFacebookShare}
              linkToCopy={shareUrl ?? undefined}
            />
          </aside>
        </div>
      </main>
    </>
  );
}
