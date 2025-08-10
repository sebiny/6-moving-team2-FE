export interface ReviewType {
  id: string;
  customerId: string;
  rating: number;
  content: string;
  createdAt: Date;
  email: string;
}

import { MoveType } from "@/constant/moveTypes";

export type ReviewItem = {
  id: string;
  content: string;
  rating: number;
  driver: {
    nickname: string;
    profileImage: string | null;
    shortIntro: string;
    averageRating: number;
    id: string;
  };
  request: {
    moveDate: string;
    moveType: MoveType;
    fromAddress: Address;
    toAddress: Address;
    estimates: {
      isDesignated: boolean;
    }[];
  };
};

export interface Address {
  district: string;
  region: string;
}

export interface ReviewsProps {
  setIsModal: (value: boolean) => void;
  review: {
    id: string;
    moveType: string;
    moveDate: string;
    fromAddress: Address;
    toAddress: Address;
    estimates: {
      id: string;
      price: number;
      driver: {
        id: string;
        nickname: string;
        shortIntro: string;
      };
    }[];
  };
}

export interface reviewModalProps {
  setIsModal: (value: boolean) => void;
  estimateRequestId: string;
  moveType: MoveType;
  driverId: string;
  isDesignated: boolean;
  fromAddress: Address;
  toAddress: Address;
  moveDate: string;
  driverNickName: string;
  driverProfileImage: string | null;
}
export type ReviewableItem = {
  id: string;
  moveType: MoveType;
  moveDate: string;
  fromAddress: Address;
  toAddress: Address;
  estimates: {
    id: string;
    price: number;
    isDesignated: boolean;
    driver: {
      id: string;
      nickname: string;
      shortIntro: string;
      profileImage: string | null;
    };
  }[];
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
