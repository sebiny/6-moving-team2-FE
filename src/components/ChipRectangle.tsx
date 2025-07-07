import Image from 'next/image';
import { MoveType, moveTypeMap } from '../constant/moveTypes';

interface ChipRectangleProps {
  moveType: MoveType;
  size?: 'sm' | 'md';
  className?: string;
}

export default function ChipRectangle({
  moveType,
  size = 'md',
  className = '',
}: ChipRectangleProps) {
  const { label, iconSrc } = moveTypeMap[moveType];

  const sizeStyles = {
    sm: {
      container: 'pl-1 pr-1.5 py-0.5 gap-0.5',
      text: 'text-xs leading-snug',
    },
    md: {
      container: 'pl-[5px] pr-1.5 py-1 gap-1',
      text: 'text-sm leading-normal',
    },
  };

  const current = sizeStyles[size];

  return (
    <div
      className={`inline-flex items-center rounded-md bg-rose-50 shadow-[4px_4px_8px_0px_rgba(217,217,217,0.10)] font-[Pretendard] font-semibold ${current.container} ${className}`}
    > 
      <div className="relative h-5 w-5">
        <Image src={iconSrc} alt={label} fill />
      </div>
      <div className={`${moveType === 'request' ? 'text-rose-500' : 'text-red-500'} ${current.text}`}>
        {label}
      </div>
    </div>
  );
}
