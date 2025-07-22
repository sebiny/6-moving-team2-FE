export type Address = {
  region: string;
  district: string;
  street: string;
};

export type EstimateRequest = {
  id: string;
  moveType: "SMALL" | "HOME" | "OFFICE" | "REQUEST";
  moveDate: string;
  createdAt: string;
  fromAddress: Address;
  toAddress: Address;
};

export type Estimate = {
  id: string;
  price: number;
  description: string;
  status: "PROPOSED" | "ACCEPTED" | "AUTO_REJECTED";
  driver: {
    authUser: {
      id: string;
      name: string;
      email: string;
      phone: string;
      imageUrl: string;
    };
    avgRating: number | null;
    reviewCount: number;
    favoriteCount: number;
    career: number;
    work: number;
  };
};

export type PendingEstimateType = {
  estimateRequest: EstimateRequest;
  estimates: Estimate[];
};
