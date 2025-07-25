export type MoveType = "SMALL" | "HOME" | "OFFICE" | "REQUEST";

export const moveTypeMap: Record<MoveType, { label: string; iconSrc: string }> = {
  SMALL: {
    label: "SMALL",
    iconSrc: "/assets/icons/ic_solid_box.svg"
  },
  HOME: {
    label: "HOME",
    iconSrc: "/assets/icons/ic_solid_home.svg"
  },
  OFFICE: {
    label: "OFFICE",
    iconSrc: "/assets/icons/ic_solid_company.svg"
  },
  REQUEST: {
    label: "REQUEST",
    iconSrc: "/assets/icons/ic_solid_document.svg"
  }
};

export const moveTypeLabelMap: Record<MoveType, { label: string }> = {
  SMALL: {
    label: "소형이사"
  },
  HOME: {
    label: "가정이사"
  },
  OFFICE: {
    label: "사무실이사"
  },
  REQUEST: {
    label: "지정 견적 요청"
  }
};
