"use client";

import { useEffect } from "react";
import { ToastModal } from "@/components/common-modal/ToastModal";
import { getCookieDomain } from "@/utills/getCookieDomain";
import { useTranslations } from "next-intl";

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  const domain = getCookieDomain();
  const domainAttribute = domain ? `; domain=${domain}` : "";
  const pathAttribute = "; path=/";
  const expiresAttribute = "; max-age=0";

  document.cookie = `${name}=;${pathAttribute}${expiresAttribute}${domainAttribute}`;
  document.cookie = `${name}=;${pathAttribute}${expiresAttribute}`;
}

export default function WelcomeToastTrigger() {
  const t = useTranslations("Login");
  useEffect(() => {
    const shouldShowToast = getCookie("welcome_toast");

    if (shouldShowToast === "true") {
      ToastModal(t("loginCompleted"));

      deleteCookie("welcome_toast");
    }
  }, [t]);

  return null;
}
