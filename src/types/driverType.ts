import { MoveType } from "@/constant/moveTypes";
import { ReviewType } from "./reviewType";
import { ServiceAreaType } from "./ServiceAreaType";

export interface DriverType {
  id: string;
  nickname: string;
  career: number;
  shortIntro: string;
  detailIntro: string;
  services: MoveType[];
  serviceAreas: ServiceAreaType[];
  work: number;
  favoriteCount: number;
  reviewsReceived: ReviewType[];
  isFavorite: boolean;
  averageRating: number;
  reviewCount: number;
  moveType: MoveType[];
}
