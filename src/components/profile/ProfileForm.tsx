"use client";

import DriverProfileForm from "./DriverProfileForm";
import CustomerProfileCreateForm from "./CustomerProfileCreateForm";
import CustomerProfileEditForm from "./CustomerProfileEditForm";

interface ProfileFormProps {
  userType: "driver" | "customer";
  isEditMode: boolean;
  initialData?: any;
}

export default function ProfileForm({ userType, isEditMode, initialData }: ProfileFormProps) {
  if (userType === "driver") {
    // 드라이버는 기존 DriverProfileForm에 isEditMode, initialData 넘김
    return <DriverProfileForm isEditMode={isEditMode} initialData={initialData} />;
  }

  if (userType === "customer") {
    // 고객은 isEditMode에 따라 생성/수정 컴포넌트 분기
    if (isEditMode) {
      return <CustomerProfileEditForm initialData={initialData} />;
    } else {
      return <CustomerProfileCreateForm />;
    }
  }

  return null;
}
