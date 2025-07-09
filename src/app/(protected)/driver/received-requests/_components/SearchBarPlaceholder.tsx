export default function SearchBarPlaceholder() {
  return (
    <div className="w-full h-16 px-6 py-3.5 bg-neutral-100 rounded-2xl flex items-center gap-2 overflow-hidden">
      {/* 아이콘 (대충 만든 동그라미 + 막대기 형태) */}
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 relative">
          <div className="absolute left-[3px] top-[18.36px] w-5 h-4 border-2 border-neutral-400 rounded-full" />
          <div className="absolute left-[22.42px] top-[27.13px] w-1.5 h-0 outline outline-2 outline-offset-[-1px] outline-neutral-400" />
        </div>
      </div>

      {/* 텍스트 */}
      <div className="flex-1 flex flex-col justify-start items-center gap-2.5">
        <div className="w-full flex justify-start items-center">
          <span className="text-neutral-400 text-lg font-normal leading-relaxed">
            어떤 고객님을 찾고 계세요?
          </span>
        </div>
      </div>
    </div>
  );
}
