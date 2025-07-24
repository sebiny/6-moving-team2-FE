"use client";

import ProfileForm from "@/components/profile/ProfileForm";

export default function CustomerProfileCreatePage() {
  return <ProfileForm userType="customer" isEditMode={false} />;
}
