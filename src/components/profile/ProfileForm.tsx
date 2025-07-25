"use client";

import DriverProfileForm from "./DriverProfileForm";
import CustomerProfileForm from "./CustomerProfileForm";

interface ProfileFormProps {
  userType: "driver" | "customer";
  isEditMode: boolean;
  initialData?: any;
}

export default function ProfileForm({ userType, isEditMode, initialData }: ProfileFormProps) {
  if (userType === "driver") {
    return <DriverProfileForm isEditMode={isEditMode} initialData={initialData} />;
  }

  if (userType === "customer") {
    return <CustomerProfileForm isEditMode={isEditMode} initialData={initialData} />;
  }

  return null;
}
