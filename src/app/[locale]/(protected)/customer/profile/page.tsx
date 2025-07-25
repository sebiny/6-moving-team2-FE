"use client";

import ProfileForm from "@/components/profile/ProfileForm";

export default function CustomerProfileCreatePage() {
  return (
    <div className="flex justify-center">
      <ProfileForm userType="customer" isEditMode={false} />
    </div>
  );
}
