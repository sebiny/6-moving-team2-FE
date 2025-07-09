import Image from "next/image";

interface EstimateStatusLabelProps {
  status: "PROPOSED" | "AUTO_REJECTED" | "ACCEPTED";
  width?: number;
  height?: number;
}

const normalizedStatusMap: Record<EstimateStatusLabelProps["status"], "WAITING" | "CONFIRMED"> = {
  PROPOSED: "WAITING",
  AUTO_REJECTED: "WAITING",
  ACCEPTED: "CONFIRMED"
};

const statusImageMap = {
  WAITING: {
    src: "/assets/labels/lb_pending.svg",
    alt: "견적대기",
    width: 55,
    height: 22
  },
  CONFIRMED: {
    src: "/assets/labels/lb_confirmed.svg",
    alt: "확정견적",
    width: 95,
    height: 0
  }
};

export default function EstimateStatus({ status, width, height }: EstimateStatusLabelProps) {
  const normalized = normalizedStatusMap[status];
  const image = statusImageMap[normalized];

  if (!image) return null;

  return <Image src={image.src} alt={image.alt} width={width ?? image.width} height={height ?? image.height} />;
}
