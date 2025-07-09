export interface Request {
  id: string;
  moveType: string; // "소형이사" | "가정이사" | "사무실이사"
  isDesignated: boolean;
  createdAt: string;
  customerName: string;
  fromAddress: string;
  toAddress: string;
  moveDate: string;
}