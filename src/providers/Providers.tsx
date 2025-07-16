"use client";

import React from "react";
import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "./QueryProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <QueryProvider>{children}</QueryProvider>
    </AuthProvider>
  );
}
