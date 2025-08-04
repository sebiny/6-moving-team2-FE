"use client";
import Button from "@/components/Button";
import TextField from "@/components/input/TextField";
import { useSignupForm } from "@/hooks/useAuthForm";
import { authService } from "@/lib/api/api-auth";
import { profileService } from "@/lib/api/api-profile";
import { useAuth, User } from "@/providers/AuthProvider";
import { UserType } from "@/types/UserType";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

function MyPageEditPage() {
  const t = useTranslations("DriverProfile");
  const router = useRouter();
  const { user } = useAuth();
  const {
    email,
    setEmail,
    name,
    setName,
    phone,
    setPhone,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    isNameValid,
    isPhoneValid,
    isPasswordValid,
    isPasswordConfirmationValid
  } = useSignupForm(UserType.DRIVER);

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const handleClickEdit = async () => {
    if (password)
      await profileService.updateBasicDriverProfile({
        name,
        phone,
        currentPassword,
        newPassword: password,
        passwordConfirmation
      });
    else await profileService.updateBasicDriverProfile({ name, phone });
    router.push("/driver/my-page");
  };

  const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/;
  const isCurrentPasswordValid = useMemo(() => PASSWORD_REGEX.test(currentPassword), [currentPassword]);
  const isFormValid = useMemo(() => {
    const basicInfoValid = !!name && isNameValid && !!phone && isPhoneValid;
    const passwordInfoValid =
      !!currentPassword &&
      isCurrentPasswordValid &&
      !!password &&
      isPasswordValid &&
      !!passwordConfirmation &&
      isPasswordConfirmationValid;
    if (password) return basicInfoValid && passwordInfoValid;
    return basicInfoValid;
  }, [
    name,
    isNameValid,
    phone,
    isPhoneValid,
    currentPassword,
    isCurrentPasswordValid,
    password,
    isPasswordValid,
    passwordConfirmation,
    isPasswordConfirmationValid
  ]);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userData = await authService.getMeDetail();
        setName(userData?.name ?? "");
        setEmail(userData?.email ?? "");
        setPhone(userData?.phone ?? "");
      };
      fetchUserData();
    }
  }, [user]);

  const handleClickCancel = () => {
    router.push("/driver/my-page");
  };
  return (
    <div className="flex justify-center">
      <div className="mt-[26px] w-[327px] max-w-[1120px] lg:mt-20 lg:w-full">
        <h1 className="text-lg font-bold lg:text-[32px] lg:font-semibold">{t("edit")}</h1>
        <div className="border-line-100 mt-4 mb-5 border-b lg:my-10"></div>
        <div className="lg:flex lg:justify-center lg:gap-30">
          <div className="flex w-full flex-col gap-5">
            <div>
              <div className="text-black-300 mb-4 font-semibold lg:text-xl">{t("name")}</div>
              <TextField
                value={name}
                onChange={setName}
                error={name.length > 0 && !isNameValid ? t("nameValid") : ""}
              />
            </div>
            <div className="border-line-100 border-b"></div>
            <div>
              <div className="text-black-300 mb-4 font-semibold lg:text-xl">{t("email")}</div>
              <TextField value={email} />
            </div>
            <div>
              <div className="text-black-300 mb-4 font-semibold lg:text-xl">{t("phone")}</div>
              <TextField
                value={phone}
                onChange={setPhone}
                error={phone.length > 0 && !isPhoneValid ? t("phoneValid") : ""}
              />
            </div>
          </div>
          <div className="border-line-100 my-5 border-b lg:hidden"></div>
          <div className="flex w-full flex-col gap-5">
            <div>
              <div className="text-black-300 mb-4 font-semibold lg:text-xl">{t("pw")}</div>
              <TextField
                type="password"
                placeholder={t("currentPWPlaceholder")}
                value={currentPassword}
                onChange={setCurrentPassword}
                error={currentPassword.length > 0 && !isCurrentPasswordValid ? t("passwordValid") : ""}
              />
            </div>
            <div className="border-line-100 hidden border-b lg:block"></div>
            <div>
              <div className="text-black-300 mb-4 font-semibold lg:text-xl">{t("newPw")}</div>
              <TextField
                type="password"
                placeholder={t("newPWPlaceholder")}
                value={password}
                onChange={setPassword}
                error={password.length > 0 && !isPasswordValid ? t("passwordValid") : ""}
              />
            </div>
            <div>
              <div className="text-black-300 mb-4 font-semibold lg:text-xl">{t("checkNewPw")}</div>
              <TextField
                type="password"
                placeholder={t("newPWConfirmPlaceholder")}
                value={passwordConfirmation}
                onChange={setPasswordConfirmation}
                error={passwordConfirmation.length > 0 && !isPasswordConfirmationValid ? t("newPWConfirmValid") : ""}
              />
            </div>
            <div className="mt-4 flex flex-col gap-2 lg:mt-16 lg:flex-row-reverse">
              <Button text={t("edit")} type="orange" onClick={handleClickEdit} isDisabled={!isFormValid} />
              <Button text={t("cancel")} type="white-gray" onClick={handleClickCancel} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPageEditPage;
