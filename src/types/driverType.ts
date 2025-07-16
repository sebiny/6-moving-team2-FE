import { MoveType } from "@/constant/moveTypes";

export interface DriverType {
  id: string;
  nickname: string;
  career: number;
  shortIntro: string;
  detailIntro: string;
  services: MoveType[];
  serviceAreas: string[];
  work: number;
  favorite: number;
}
