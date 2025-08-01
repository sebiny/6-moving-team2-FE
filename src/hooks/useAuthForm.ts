"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { parseBackendError } from "@/utills/ErrorParser";
import { UserType } from "@/types/UserType";
import { ToastModal } from "@/components/common-modal/ToastModal";

const NAME_REGEX = /^[가-힣]{2,5}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^010\d{8}$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/;

export function useLoginForm(userType: UserType) {
  const router = useRouter();
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = useMemo(() => EMAIL_REGEX.test(email), [email]);
  const isPasswordValid = useMemo(() => PASSWORD_REGEX.test(password), [password]);
  const isFormValid = useMemo(
    () => !!email && !!password && isEmailValid && isPasswordValid,
    [email, password, isEmailValid, isPasswordValid]
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password, userType);
      // 로그인 성공하면 useEffect에서 user 상태 확인 후 라우팅 처리
    } catch (error: any) {
      console.error("Login failed:", error);
      const message = parseBackendError(error.status, error.message);
      ToastModal(message);
    }
  };

  // 로그인 후 user가 설정되었을 때 유저 타입에 따라 이동
  useEffect(() => {
    if (!user) return;

    if (user.userType === UserType.CUSTOMER) {
      router.push("/customer/profile");
    } else if (user.userType === UserType.DRIVER) {
      router.push("/driver/profile");
    } else {
      router.push("/");
    }
  }, [user, router]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    onSubmit,
    isEmailValid,
    isPasswordValid,
    isFormValid
  };
}

export function useSignupForm(userType: UserType) {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const isNameValid = useMemo(() => NAME_REGEX.test(name), [name]);
  const isEmailValid = useMemo(() => EMAIL_REGEX.test(email), [email]);
  const isPhoneValid = useMemo(() => PHONE_REGEX.test(phone), [phone]);
  const isPasswordValid = useMemo(() => PASSWORD_REGEX.test(password), [password]);
  const isPasswordConfirmationValid = useMemo(
    () => password.length > 0 && password === passwordConfirmation,
    [password, passwordConfirmation]
  );

  const isFormValid = useMemo(
    () =>
      !!name &&
      !!email &&
      !!phone &&
      !!password &&
      !!passwordConfirmation &&
      isNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isPasswordValid &&
      isPasswordConfirmationValid,
    [
      name,
      email,
      phone,
      password,
      passwordConfirmation,
      isNameValid,
      isEmailValid,
      isPhoneValid,
      isPasswordValid,
      isPasswordConfirmationValid
    ]
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({
        name,
        email,
        password,
        passwordConfirmation,
        phone,
        userType
      });

      localStorage.setItem("signupSuccess", "true");
      setTimeout(() => {
        router.push("/login/" + userType.toLowerCase());
      }, 100);
    } catch (error: any) {
      console.error("Signup failed:", error);
      const message = parseBackendError(error.status, error.message);
      ToastModal(message);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    onSubmit,
    isNameValid,
    isEmailValid,
    isPhoneValid,
    isPasswordValid,
    isPasswordConfirmationValid,
    isFormValid
  };
}
