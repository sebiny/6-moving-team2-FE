import React from "react";
import DrawingIcon from "./icon/DrawingIcon";

interface OrangeBackgroundType {
  subTitle?: boolean;
}

function OrangeBackground({ subTitle = false }: OrangeBackgroundType) {
  return (
    <div
      aria-hidden="true"
      className={`flex h-[112px] w-full justify-center overflow-hidden bg-orange-400 md:h-[157px] ${subTitle ? "lg:h-[180px]" : "lg:h-[225px]"}`}
    >
      <div className="relative flex w-[400px] justify-between md:w-[800px] lg:w-[1500px]">
        <DrawingIcon
          role="presentation"
          className="absolute top-5 left-[-25px] w-[83px] rotate-[-5deg] opacity-[0.2] md:top-3 md:left-[-40px] md:w-[170px] lg:top-10 lg:left-0"
        />
        <DrawingIcon
          role="presentation"
          className="absolute top-[30px] right-5 w-[159px] rotate-[25deg] opacity-[0.2] md:w-[291px] lg:top-15 lg:right-70"
        />
      </div>
    </div>
  );
}

export default OrangeBackground;
