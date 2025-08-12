import Image from "next/image";

export default function LoadingAnimation() {
  // 화면 위쪽에 위치: items-start + pt로 약간 아래로만 내림
  return (
    <div className="fixed inset-0 z-[10000] flex h-screen items-start justify-center pt-104">
      {/* 트랙(폭/높이 자유 조절 가능) */}
      <div className="absolute inset-0 bg-black/40" />

       <div
      className="relative z-[10001] w-[560px] h-[70px] overflow-visible [--dur:2.4s]"
      aria-label="loading"
    >
      {/* 1번 로고 */}
      <div className="pointer-events-none select-none">
        <div className="shadow animate-shadowScale-l2r anim-phase-0" />
        <Image
          src="/assets/icons/ic_logo.svg"
          alt="loading logo"
          width={80}
          height={80}
          className="logo animate-runBounce-l2r anim-phase-0"
        />
      </div>
    </div>
    </div>
  );
}
	