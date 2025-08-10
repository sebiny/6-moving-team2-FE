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
        <section className="flex flex-col items-center gap-12 lg:gap-8" aria-labelledby="disabledTitle">
          <figure className="flex flex-col items-center">
            <Image
              src="/assets/images/img_moving_car.png"
              alt={content.imageAlt}
              width={180}
              height={180}
              className="opacity-30 grayscale lg:w-70"
            />
            <figcaption className="sr-only">{content.imageAlt}</figcaption>

            <div className="mt-4 text-center text-sm text-gray-400 lg:text-xl">
              {content.messageLines.map((line, i) => (
                <p key={i} className="mb-1">
                  {line}
                </p>
              ))}
            </div>
          </figure>

          <Button
            onClick={() => router.push("/customer/my-estimates")}
            text={content.buttonText}
            type="orange"
            className="h-[54px] px-6 py-4 text-base lg:text-lg"
            aria-label={`${content.buttonText} - ${t("disabled.buttonDesc", { default: "내 견적 페이지로 이동" })}`}
          />
        </section>
      </main>
    </>
  );
}
