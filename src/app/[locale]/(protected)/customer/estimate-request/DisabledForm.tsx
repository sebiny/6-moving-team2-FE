"use client";

import Button from "@/components/Button";
import PageHeader from "@/components/common/PageHeader";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EstimateRequestDisabled() {
  const router = useRouter();
  const t = useTranslations("EstimateReq");

  return (
    <>
      <PageHeader title={t("disabled.title")} />
      <main className="bg-background-200 flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-12 lg:gap-8">
          <div className="flex flex-col items-center">
            <Image
              src="/assets/images/img_moving_car.png"
              alt={t("disabled.imageAlt")}
              width={180}
              height={180}
              className="opacity-30 grayscale lg:w-70"
            />

            <p className="text-center text-sm text-gray-400 lg:text-xl">
              {t("disabled.message.line1")} <br />
              {t("disabled.message.line2")}
            </p>
          </div>
          <Button
            onClick={() => router.push("/customer/my-estimates")}
            text={t("disabled.button")}
            type="orange"
            className="h-[54px] !px-6 !py-4 !text-base lg:!text-lg"
          />
        </div>
      </main>
    </>
  );
}
