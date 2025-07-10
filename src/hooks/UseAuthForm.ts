"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { parseBackendError } from "@/lib/utils/error-parser";
import { UserType } from "@/types/UserType";

export function useLoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/");
    } catch (error: any) {
      console.error("Login failed:", error);
      const message = parseBackendError(error.status, error.message);
      alert(message);
    }
  };

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
