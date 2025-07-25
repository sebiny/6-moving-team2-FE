"use client";
import Button from "@/components/Button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";

function EditButtons() {
  const t = useTranslations("DriverMypage");
  const router = useRouter();
  const handleClickEditProfile = () => {
    router.push("/driver/profile/edit");
  };

  const handleClickEditBasic = () => {
    router.push("/driver/my-page-edit");
  };
  return (
    <div className="mt-7 flex w-full flex-col gap-4 md:flex-row lg:w-70 lg:flex-col">
      <Button onClick={handleClickEditProfile} text={t("editProfile")} type="orange" image={true} />
      <Button onClick={handleClickEditBasic} text={t("editBasic")} type="white-gray" image={true} />
    </div>
  );
}

export default EditButtons;
