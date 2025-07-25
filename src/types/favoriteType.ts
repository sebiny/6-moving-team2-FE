export interface FavoriteDriver {
  id: string;
  nickname: string;
  profileImage?: string;
  shortIntro: string;
  detailIntro: string;
  moveType: ("SMALL" | "HOME" | "OFFICE")[];
  career: number;
  work: number;
  averageRating: number;
  reviewCount: number;
  favoriteCount: number;
  name: string;
}
