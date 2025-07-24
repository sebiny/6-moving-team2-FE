import Image from "next/image";
import { MoveType, moveTypeMap } from "../../constant/moveTypes";
import { useTranslations } from "next-intl";

interface ChipRectangleProps {
  moveType: MoveType;
  size?: "sm" | "md";
  className?: string;
}

export default function ChipRectangle({ moveType, size = "md", className = "" }: ChipRectangleProps) {
  const { iconSrc } = moveTypeMap[moveType];
  const t = useTranslations("Chip");
  const sizeStyles = {
    sm: {
      container: "pl-1 pr-1.5 py-0.5 gap-0.5",
      text: "text-xs leading-snug"
    },
    md: {
      container: "pl-[5px] pr-1.5 py-1 gap-1",
      text: "text-sm leading-normal"
    }
  };

  const current = sizeStyles[size];

  return (
    <div
      className={`inline-flex items-center rounded-md bg-rose-50 font-[Pretendard] font-semibold shadow-[4px_4px_8px_0px_rgba(217,217,217,0.10)] ${current.container} ${className}`}
    >
      <div className="relative h-5 w-5">
        <Image src={iconSrc} alt={t(moveType)} fill />
      </div>
      <div className={`${moveType === "REQUEST" ? "text-rose-500" : "text-red-500"} ${current.text}`}>
        {t(moveType)}
      </div>
    </div>
  );
}
