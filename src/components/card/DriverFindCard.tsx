"use client";
import ChipRectangle from "@/components/chip/ChipRectangle";
import LikeIcon from "@/components/icon/LikeIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DriverType } from "@/types/driverType";
import React, { useEffect, useState } from "react";
import CustomCheckbox from "../button/CustomCheckbox";
import { useLocale, useTranslations } from "next-intl";
import { batchTranslate } from "@/utills/batchTranslate";

interface DriverFindCardType {
  driver: DriverType;
  isFavoritePage?: boolean; // 찜한 기사님 페이지 여부
  checked?: boolean; // 전체 선택 체크 상태
  onCheckChange?: (val: boolean) => void; // 전체 선택용 변경 핸들러
}

function DriverFindCard({ driver, isFavoritePage = false, checked = false, onCheckChange }: DriverFindCardType) {
  const t = useTranslations("FindDriver.driverFindCard");
  const locale = useLocale();
  const [translatedIntro, setTranslatedIntro] = useState({ short: "", detail: "" });
  const router = useRouter();

  const handleClick = () => {
    if (isFavoritePage) return; // 찜한 기사님 페이지일 시, 클릭 막기
    router.push(`/drivers/${driver.id}`);
  };

  useEffect(() => {
    const translateTexts = async () => {
      if (!driver?.shortIntro || !driver.detailIntro) return;
      // 한국어면 번역 생략
      if (locale === "ko") {
        setTranslatedIntro({
          short: driver.shortIntro ?? "",
          detail: driver.detailIntro ?? ""
        });
        return;
      }
      try {
        const result = await batchTranslate(
          {
            short: driver.shortIntro ?? "",
            detail: driver.detailIntro ?? ""
          },
          locale
        );
        setTranslatedIntro({
          short: result.short,
          detail: result.detail
        });
      } catch (e) {
        console.warn("번역 실패", e);
      }
    };

    translateTexts();
  }, [driver, locale]);
  return (
    <article
      className="border-line-100 relative cursor-pointer rounded-2xl border bg-white p-5 shadow-sm"
      onClick={handleClick}
      role={!isFavoritePage ? "link" : undefined}
      aria-label={!isFavoritePage ? `${driver.nickname} ${t("driver")} 상세 보기` : undefined}
    >
      {/* 체크박스 (우측 상단) */}
      {isFavoritePage && (
        <div className="absolute top-4 right-4">
          <CustomCheckbox
            checked={checked}
            onChange={onCheckChange}
            shape="square"
            aria-label={`${driver.nickname} ${t("driver")} 선택`}
          />
        </div>
      )}

      {/* 서비스 목록 */}
      <ul className="flex gap-2 md:hidden">
        {driver.moveType.map((service) => (
          <li key={service}>
            <ChipRectangle moveType={service} size="sm" />
          </li>
        ))}
      </ul>

      <ul className="hidden gap-2 md:flex">
        {driver.moveType.map((service) => (
          <li key={service}>
            <ChipRectangle moveType={service} size="md" />
          </li>
        ))}
      </ul>

      <div className="mt-3 flex gap-5 overflow-hidden">
        <Image
          src={driver.profileImage ?? "/assets/images/img_profile.svg"}
          alt={`${driver.nickname} ${t("driver")} 프로필 사진`}
          width={134}
          height={134}
          className="hidden h-[134px] w-[134px] rounded-2xl object-cover object-center md:block"
        />
        <div className="w-full">
          <header>
            <p className="text-black-300 w-full truncate text-xl font-semibold">{translatedIntro.short}</p>
            <p className="mt-2 w-full truncate text-sm text-gray-500">{translatedIntro.detail}</p>
          </header>

          <div className="relative mt-5">
            <div className="flex gap-2">
              <Image
                src={driver.profileImage ?? "/assets/images/img_profile.svg"}
                alt={`${driver.nickname} ${t("driver")} 프로필 사진`}
                width={50}
                height={50}
                className="h-[50px] w-[50px] rounded-xl object-cover object-center md:hidden"
              />
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Image src="/assets/icons/ic_driver.svg" alt="" aria-hidden="true" width={20} height={23} />
                    <p className="text-sm font-semibold md:text-base">
                      {driver.nickname} {t("driver")}
                    </p>
                  </div>
                  <button
                    className="flex items-center justify-center md:hidden"
                    aria-label={`${driver.nickname} ${t("driver")} 찜하기`}
                  >
                    <LikeIcon color="red" />
                    <p className="pt-1 text-gray-500">{driver.favoriteCount}</p>
                  </button>
                </div>

                {/* 정의 목록으로 변환 */}
                <dl className="mt-[2px] flex items-center gap-2 text-[13px] md:mt-2">
                  <div className="flex gap-1">
                    <Image src="/assets/icons/ic_star_yellow.svg" alt="" aria-hidden="true" width={20} height={20} />
                    <dt className="sr-only">{t("rating")}</dt>
                    <dd aria-label={`평점 ${driver.averageRating?.toFixed(1)}점, 리뷰 ${driver.reviewCount ?? 0}개`}>
                      {driver.averageRating?.toFixed(1)}
                    </dd>
                    <span className="text-gray-300">({driver.reviewCount ?? 0})</span>
                  </div>
                  <div className="border-line-200 h-[14px] w-[1px] border-l" aria-hidden="true"></div>
                  <div className="flex gap-1">
                    <dt>{t("career")}</dt>
                    <dd>
                      {driver.career} {t("year")}
                    </dd>
                  </div>
                  <div className="border-line-200 h-[14px] w-[1px] border-l" aria-hidden="true"></div>
                  <div className="flex gap-1">
                    <dt>{t("count")}</dt>
                    <dd>
                      {driver.work}
                      {t("count")}
                    </dd>
                    <span className="text-gray-300">{t("confirm")}</span>
                  </div>
                </dl>
              </div>
            </div>

            <button
              className="absolute right-0 bottom-0 hidden items-center justify-center gap-[6px] md:flex"
              aria-label={`${driver.nickname} ${t("driver")} 찜하기`}
            >
              <LikeIcon color="red" />
              <p className="pt-1 text-gray-500">{driver.favoriteCount}</p>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default DriverFindCard;
