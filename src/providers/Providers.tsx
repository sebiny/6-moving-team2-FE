"use client";

import React from "react";
import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "./QueryProvider";
import { ModalProvider } from "./ModalProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <QueryProvider>
        <ModalProvider>{children}</ModalProvider>
      </QueryProvider>
    </AuthProvider>
  );
}
