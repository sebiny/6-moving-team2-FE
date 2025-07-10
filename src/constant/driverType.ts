import { MoveType } from "./moveTypes";

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

export const driver: DriverType = {
  id: "firstDriver",
  nickname: "김코드",
  shortIntro: "고객님의 물품을 안전하게 운송해 드립니다.",
  detailIntro: "안녕하세요. 이사 업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다.",
  career: 7,
  services: ["SMALL", "HOME"],
  serviceAreas: ["SEOUL", "GYEONGGI"],
  work: 334,
  favorite: 136
};

export const drivers: DriverType[] = [
  {
    id: "firstDriver",
    nickname: "김코드",
    shortIntro: "고객님의 물품을 안전하게 운송해 드립니다.",
    detailIntro: "이사 업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다.",
    career: 7,
    services: ["SMALL", "HOME"],
    serviceAreas: ["SEOUL", "GYEONGGI"],
    work: 334,
    favorite: 136
  },
  {
    id: "secondDriver",
    nickname: "최코드",
    shortIntro: "고객님의 물품을 안전하게 운송해 드립니다.",
    detailIntro: "이사 업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다.",
    career: 7,
    services: ["SMALL", "HOME"],
    serviceAreas: ["SEOUL", "DAEGU"],
    work: 250,
    favorite: 226
  }
];
