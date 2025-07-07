export type MoveType = 'small' | 'home' | 'office' | 'request';

export const moveTypeMap: Record<MoveType, { label: string; iconSrc: string }> = {
  small: {
    label: '소형이사',
    iconSrc: '/assets/icons/ic_solid_box.svg',
  },
  home: {
    label: '가정이사',
    iconSrc: '/assets/icons/ic_solid_home.svg',
  },
  office: {
    label: '사무실이사',
    iconSrc: '/assets/icons/ic_solid_company.svg',
  },
  request: {
    label: '지정 견적 요청',
    iconSrc: '/assets/icons/ic_solid_document.svg',
  },
};
