export interface ReviewType {
  id: string;
  customerId: string;
  rating: number;
  content: string;
  createdAt: Date;
}

import { MoveType } from "@/constant/moveTypes";

export type Address = {
  region: string;
  district: string;
};

export type ReviewItem = {
  id: string;
  content: string;
  rating: number;
  driver: {
    nickname: string;
    profileImage: string | null;
    shortIntro: string;
    averageRating: number;
  };
  request: {
    moveDate: string;
    moveType: MoveType;
    fromAddress: Address;
    toAddress: Address;
    isDesignated: boolean;
  };
};

export type ReviewListResponse = {
  reviews: ReviewItem[];
  totalCount: number;
};

export type TranslatedMeta = {
  content: string;
  fromRegion: string;
  toRegion: string;
  fromDistrict: string;
  toDistrict: string;
  moveDate: string;
  nickname: string;
  shortIntro: string;
};
