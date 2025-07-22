"use client";

import Button from "@/components/Button";
import PageHeader from "@/components/common/PageHeader";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EstimateRequestDisabled() {
  const router = useRouter();

  return (
    <>
      <PageHeader title="견적 요청" />
      <main className="bg-background-200 flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-12 lg:gap-8">
          <div className="flex flex-col items-center">
            <Image
              src="/assets/images/img_moving_car.png"
              alt="견적 불가"
              width={180}
              height={180}
              className="opacity-30 grayscale lg:w-70"
            />

            <p className="text-center text-sm text-gray-400 lg:text-xl">
              현재 진행 중인 이사 견적이 있어요! <br />
              진행 중인 이사 완료 후 새로운 견적을 받아보세요.
            </p>
          </div>
          <Button
            onClick={() => router.push("/customer/my-estimates/estimate-pending")}
            text="받은 견적 보러가기"
            type="orange"
            className="h-[54px] !px-6 !py-4 !text-base lg:!text-lg"
          />
        </div>
      </main>
    </>
  );
}
