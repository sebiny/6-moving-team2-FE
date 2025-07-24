"use client";

import { useEffect, useState } from "react";
import ProfileForm from "@/components/profile/ProfileForm";
import { authService } from "@/lib/api/api-auth";

export default function DriverProfileEditPage() {
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // GET /auth/me/detail 로 현재 고객 프로필 정보를 가져옵니다.
        const data = await authService.getUserById();
        setInitialData(data);
      } catch (err: any) {
        setError(err.message || "프로필 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러: {error}</div>;
  }

  return <ProfileForm userType="driver" isEditMode={true} initialData={initialData} />;
}
