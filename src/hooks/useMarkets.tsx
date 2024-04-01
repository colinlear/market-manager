import { useMemo, useState } from "react";
import { MarketGroups, MarketPattern, SpecialStalls } from "../map/pattern";
import { VictoriaParkMarket } from "../market/victoria-park";
import { useMarketAccess } from "./useMarketAccess";

export interface MarketInstance {
  marketId: string;
  marketName: string;
  date: string;
  name: string;
  layout: MarketPattern;
  specialStalls: SpecialStalls;
  groups: MarketGroups;
}

const marketInstances: MarketInstance[] = [
  {
    marketId: "vicpark",
    marketName: "Victoria Park Farmers Market",
    date: "2024-04-07",
    name: "April 7th Market",
    groups: VictoriaParkMarket.groups,
    layout: VictoriaParkMarket.layout,
    specialStalls: VictoriaParkMarket.specialStalls,
  },
];

const useMarketList = (
  access: "stallholder" | "admin",
  stallIds?: string[]
) => {
  const userId = "testing";
  const [loading, setLoading] = useState(true);

  const { marketIds, loading: loadingIds } = useMarketAccess(access);

  const bookings = useMemo(
    () =>
      loadingIds
        ? []
        : bookingList.filter(
            (b) =>
              (marketIds.has(b.marketId) && stallIds === null) ||
              stallIds?.includes(b.stallId)
          ),
    [bookingList, stallIds, marketIds, loadingIds]
  );

  const markets = null;
};
