import { MoveType } from "./moveTypes";

export interface DriverType {
  nickname: string;
  career: number;
  shortIntro: string;
  detailIntro: string;
  services: MoveType[];
  serviceAreas: string[];
  favorite: number;
}
