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

// export const moveTypeMap = {
//   SMALL: { iconSrc: "/assets/icons/ic_solid_box.svg" },
//   HOME: { iconSrc: "/assets/icons/ic_solid_home.svg" },
//   OFFICE: { iconSrc: "/assets/icons/ic_solid_company.svg" },
//   REQUEST: { iconSrc: "/assets/icons/ic_solid_document.svg" }
// } as const;

// export type MoveType = keyof typeof moveTypeMap;
