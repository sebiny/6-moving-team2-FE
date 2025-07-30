"use client";

import { usePathname } from "next/navigation";
import { authService } from "@/lib/api/api-auth";
import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { UserType } from "@/types/UserType";

export type User = {
  id: string;
  email: string;
  userType: UserType;
  phone: string | null;
  name: string;
  driverId?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, userType: UserType) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    phone: string;
    userType: UserType;
  }) => Promise<void>;
  getUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pathname = usePathname();

  const getUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const currentUser: User | null = await authService.getMe();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (data: {
      name: string;
      email: string;
      password: string;
      passwordConfirmation: string;
      phone: string;
      userType: UserType;
    }) => {
      try {
        await authService.signUpUser(data);
        console.log("회원가입 성공");
      } catch (error) {
        console.error("회원가입 실패:", error);
        throw error;
      }
    },
    []
  );

  const login = useCallback(
    async (email: string, password: string, userType: UserType) => {
      try {
        await authService.logInUser(email, password, userType);
        await getUser();
      } catch (error) {
        console.error("로그인 실패:", error);
        setUser(null);
        throw error;
      }
    },
    [getUser]
  );

  const logout = useCallback(async () => {
    try {
      await authService.logOutUser();
      setUser(null);
      console.log("로그아웃 성공");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      throw error;
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [pathname, getUser]);

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    register,
    getUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
