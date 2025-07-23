// export type MoveType = "SMALL" | "HOME" | "OFFICE" | "REQUEST";

// export const moveTypeMap: Record<MoveType, { label: string; iconSrc: string }> = {
//   SMALL: {
//     label: "소형이사",
//     iconSrc: "/assets/icons/ic_solid_box.svg"
//   },
//   HOME: {
//     label: "가정이사",
//     iconSrc: "/assets/icons/ic_solid_home.svg"
//   },
//   OFFICE: {
//     label: "사무실이사",
//     iconSrc: "/assets/icons/ic_solid_company.svg"
//   },
//   REQUEST: {
//     label: "지정 견적 요청",
//     iconSrc: "/assets/icons/ic_solid_document.svg"
//   }
// };
//다국어 처리 때문에 이렇게 작성
export const moveTypeMap = {
  SMALL: { iconSrc: "/assets/icons/ic_solid_box.svg" },
  HOME: { iconSrc: "/assets/icons/ic_solid_home.svg" },
  OFFICE: { iconSrc: "/assets/icons/ic_solid_company.svg" },
  REQUEST: { iconSrc: "/assets/icons/ic_solid_document.svg" }
} as const;

export type MoveType = keyof typeof moveTypeMap;
