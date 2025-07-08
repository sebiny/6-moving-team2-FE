import Image from "next/image";
import React from "react";

interface OrangeBackgroundType {
  subTitle?: boolean;
}

function OrangeBackground({ subTitle = false }: OrangeBackgroundType) {
  return (
    <div
      className={`flex h-[112px] w-full justify-center overflow-hidden bg-orange-400 md:h-[157px] lg:h-${subTitle ? "[180px]" : "[225px]"}`}
    >
      <div className="relative flex w-[400px] justify-between md:w-[800px] lg:w-[1500px]">
        <Image
          src="/assets/icons/ic_drawing.svg"
          alt="무늬"
          width={10}
          height={10}
          className="absolute top-5 left-[-25px] w-[83px] rotate-[-5deg] opacity-[0.2] md:top-3 md:left-[-40px] md:w-[170px] lg:top-10 lg:left-0"
        />
        <Image
          src="/assets/icons/ic_drawing.svg"
          alt="무늬"
          width={159}
          height={89}
          className="absolute top-[30px] right-5 w-[159px] rotate-[25deg] opacity-[0.2] md:w-[291px] lg:top-15 lg:right-70"
        />
      </div>
    </div>
  );
}

export default OrangeBackground;
