import ChipCircle from "@/components/chip/ChipCircle";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface AddressResultCardProps {
  postalCode: string;
  roadAddress: string;
  jibunAddress: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function AddressResultCard({
  postalCode,
  roadAddress,
  jibunAddress,
  selected = false,
  onClick
}: AddressResultCardProps) {
  const t = useTranslations("Chip");
  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex w-full cursor-pointer gap-4 rounded-2xl border px-4 pt-5 pb-6",
        "shadow-[2px_2px_10px_0px_rgba(224,224,224,0.20)] transition-colors",
        selected
          ? "border-[var(--color-orange-500)] bg-[var(--color-orange-100)]"
          : "border-[var(--color-line-100)] bg-white"
      )}
    >
      <div className="flex flex-col gap-4 text-sm md:text-base">
        <p className="text-black-400 text-sm font-semibold md:text-base">{postalCode}</p>
        <div className="flex items-start gap-2">
          <ChipCircle type="address" color="orange" text={t("road")} />
          <p className="max-w-[176px] break-words whitespace-pre-wrap text-black md:max-w-full">{roadAddress}</p>
        </div>

        <div className="flex items-start gap-2">
          <ChipCircle type="address" color="orange" text={t("jibun")} />
          <p className="max-w-[176px] break-words whitespace-pre-wrap text-black md:max-w-full">{jibunAddress}</p>
        </div>
      </div>
    </div>
  );
}
