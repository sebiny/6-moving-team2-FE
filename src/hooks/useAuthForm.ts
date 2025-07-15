"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { parseBackendError } from "@/utills/ErrorParser";
import { UserType } from "@/types/UserType";

export function useLoginForm() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      // 로그인 성공하면 useEffect에서 user 상태 확인 후 라우팅 처리
    } catch (error: any) {
      console.error("Login failed:", error);
      const message = parseBackendError(error.status, error.message);
      alert(message);
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
    onSubmit
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
      router.push("/login/" + userType.toLowerCase());
    } catch (error: any) {
      console.error("Signup failed:", error);
      const message = parseBackendError(error.status, error.message);
      alert(message);
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
    onSubmit
  };
}
