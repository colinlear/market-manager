import { useEffect, useMemo, useState } from "react";

export interface MarketPermission {
  marketId: string;
  userId: string;
  access: "stallholder" | "admin";
}

const marketPermissions: MarketPermission[] = [
  {
    marketId: "vicpark",
    userId: "testing",
    access: "stallholder",
  },
  {
    marketId: "vicpark",
    userId: "testing",
    access: "admin",
  },
];

export const useMarketAccess = (access: string) => {
  const userId = "testing";
  const [loading, setLoading] = useState(true);
  const marketIds = useMemo(
    () =>
      new Set(
        marketPermissions
          .filter((a) => a.userId === userId && a.access === access)
          .map(({ marketId }) => marketId)
      ),
    [access, userId]
  );

  useEffect(() => {
    if (loading) {
      setTimeout(() => setLoading(false), 500);
    }
  });

  if (loading) {
    return {
      marketIds: undefined,
      loading,
    };
  }

  return { marketIds, loading };
};
