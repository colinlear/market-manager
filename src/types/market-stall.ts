export interface MarketContact {
  name: string;
  phone: string;
  email: string;
  website: string;
}

export interface MarketStall {
  id?: string;
  name: string;
  product: string;
  description: string;
  size: number;
  isNew: boolean;
  powered: boolean;
  contact: MarketContact;
  requirements?: Record<string, number>;
}

export type StallList = Record<string, (MarketStall | undefined)[]>;

export const validateStall = (stall?: MarketStall): boolean => {
  return stall?.name.trim() != "";
};
