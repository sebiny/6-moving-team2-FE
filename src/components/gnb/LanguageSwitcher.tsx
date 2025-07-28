"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const LANGUAGES = [
  { label: "한국어", code: "ko" },
  { label: "English", code: "en" },
  { label: "中文", code: "zh" }
];

export default function GnbLanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleChange = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
    setIsOpen(false);
  };

  const currentLabel = LANGUAGES.find((lang) => lang.code === currentLocale)?.label ?? currentLocale;

  return (
    <div className="relative text-sm">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="font-Pretendard flex cursor-pointer items-center gap-1 rounded-md border-[1.5] bg-orange-100 px-3 py-1 font-semibold text-orange-500 hover:bg-orange-200"
      >
        {currentLabel}

        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <ul className="absolute right-0 z-10 mt-2 w-32 rounded-md border border-gray-200 bg-white shadow-lg">
          {LANGUAGES.map(({ label, code }) => (
            <li key={code}>
              <button
                onClick={() => handleLocaleChange(code)}
                className={`font-Pretendard w-full cursor-pointer px-4 py-2 text-left hover:bg-orange-100 ${
                  code === currentLocale ? "bg-orange-200 font-semibold text-orange-500" : ""
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
