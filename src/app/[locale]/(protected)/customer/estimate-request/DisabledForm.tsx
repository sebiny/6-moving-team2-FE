"use client";

import Button from "@/components/Button";
import PageHeader from "@/components/common/PageHeader";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export default function EstimateRequestDisabled() {
  const router = useRouter();
  const t = useTranslations("EstimateReq");

  const content = useMemo(
    () => ({
      title: t("disabled.title"),
      imageAlt: t("disabled.imageAlt"),
      messageLines: [t("disabled.message.line1"), t("disabled.message.line2")],
      buttonText: t("disabled.button")
    }),
    [t]
  );

  return (
    <>
      <PageHeader title={content.title} />

      <main className="bg-background-200 flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-12 lg:gap-8">
          <div className="flex flex-col items-center">
            <Image
              src="/assets/images/img_moving_car.png"
              alt={content.imageAlt}
              width={180}
              height={180}
              className="opacity-30 grayscale lg:w-70"
            />

            <p className="text-center text-sm text-gray-400 lg:text-xl">
              {content.messageLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i !== content.messageLines.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>

          <Button
            onClick={() => router.push("/customer/my-estimates")}
            text={content.buttonText}
            type="orange"
            className="h-[54px] px-6 py-4 text-base lg:text-lg"
          />
        </div>
      </main>
    </>
  );
}
