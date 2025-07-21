import { MoveType } from "@/constant/moveTypes";
import { ReviewType } from "./reviewType";

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
  reviewsReceived: ReviewType[];
  isFavorite: boolean;
  averageRating: number;
  reviewCount: number;
  moveType: MoveType[];
}
