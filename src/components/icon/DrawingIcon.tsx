import React from "react";

interface DrawingIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const DrawingIcon = ({ className, ...props }: DrawingIconProps) => {
  return (
    <svg
      viewBox="0 0 166 113"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className} // 부모가 className으로 사이즈 조절 가능
      {...props}
    >
      <rect
        x="100.283"
        y="15.4844"
        width="27.3446"
        height="74.221"
        rx="13.6723"
        transform="rotate(-10.4621 100.283 15.4844)"
        fill="#FEEEEA"
      />
      <rect
        x="53.6094"
        y="24.2422"
        width="27.3446"
        height="74.221"
        rx="13.6723"
        transform="rotate(-10.4621 53.6094 24.2422)"
        fill="#FEEEEA"
      />
      <rect
        opacity="0.8"
        x="66.0605"
        y="16.1211"
        width="27.3446"
        height="94.0628"
        rx="13.6723"
        transform="rotate(35.0178 66.0605 16.1211)"
        fill="#FEEEEA"
      />
      <rect
        opacity="0.8"
        x="136.658"
        y="32.4023"
        width="26.9689"
        height="53.1258"
        rx="13.4844"
        transform="rotate(35.0178 136.658 32.4023)"
        fill="#FEEEEA"
      />
      <rect
        opacity="0.8"
        x="112.734"
        y="7.36328"
        width="27.6597"
        height="93.7229"
        rx="13.8298"
        transform="rotate(35.0178 112.734 7.36328)"
        fill="#FEEEEA"
      />
    </svg>
  );
};

export default DrawingIcon;
