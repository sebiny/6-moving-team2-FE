// MoveType의 영어를 한글로 반환해 ui에 보이는 용
import { MoveType, moveTypeMap } from "@/constant/moveTypes";

/**
 * MoveType에 대응하는 한글 라벨을 반환
 */

export const getMoveTypeLabel = (moveType: MoveType): string => {
  return moveTypeMap[moveType]?.label ?? "기타";
};

/**
 * MoveType에 대응하는 아이콘 경로 반환 (필요 없으면 지울 예정)
 */
export const getMoveTypeIcon = (moveType: MoveType): string => {
  return moveTypeMap[moveType]?.iconSrc ?? "/assets/icons/ic_unknown.svg";
};
