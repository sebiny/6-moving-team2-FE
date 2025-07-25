"use client";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import React from "react";

function EditButtons() {
  const router = useRouter();
  const handleClickEditProfile = () => {
    router.push("/driver/profile/edit");
  };

  const handleClickEditBasic = () => {
    router.push("/driver/basic");
  };
  return (
    <div className="mt-7 flex w-full flex-col gap-4 md:flex-row lg:w-70 lg:flex-col">
      <Button onClick={handleClickEditProfile} text="내 프로필 수정" type="orange" image={true} />
      <Button onClick={handleClickEditBasic} text="기본 정보 수정" type="white-gray" image={true} />
    </div>
  );
}

export default EditButtons;
