import { defaultFetch, cookieFetch, authUtils } from "../fetch-client";
import { User } from "@/providers/AuthProvider";
import { UserType } from "@/types/UserType";

export const authService = {
  signUpUser: async (data: {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    phone?: string | null;
    userType: UserType;
  }): Promise<void> => {
    await defaultFetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data)
    });
  },

  logInUser: async (email: string, password: string): Promise<{ accessToken: string }> => {
    try {
      const response = await defaultFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        credentials: "include",
        cache: "no-store"
      });

      if (response && response.accessToken) {
        authUtils.setAccessToken(response.accessToken);
      }
      return response;
    } catch (error) {
      console.error("로그인 실패", error);
      authUtils.clearAccessToken();
      throw error;
    }
  },

  logOutUser: async (): Promise<void> => {
    try {
      await defaultFetch("/auth/logout", {
        method: "POST",
        credentials: "include"
      });
    } catch (error) {
      console.error("서버 로그아웃 요청 실패:", error);
    } finally {
      authUtils.clearAccessToken();
      window.location.href = "/";
    }
  },

  getMe: async (): Promise<User | null> => {
    // response가 user { user : { ... }} 형태를 반환함
    // return await cookieFetch("/auth/me");

    const response = await cookieFetch("/auth/me");
    // response가 { user : ... } 형태를 반환함
    return response?.user ?? null;
  }
};
