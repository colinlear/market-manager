import { useEffect, useMemo, useState } from "react";
import { BuildMarketRows } from "../map/market-rows";
import { useBookedStalls } from "../stall/useBookedStalls";
import { useSavedStalls } from "../stall/useSavedStalls";
import { VictoriaParkMarket } from "../market/victoria-park";

export const useMarket = (stallcount: number = 0) => {
  const [loading, setLoading] = useState(true);

  const market = VictoriaParkMarket;

  const { savedStalls } = useSavedStalls();
  const { bookings } = useBookedStalls(
    market.id,
    savedStalls,
    market.specialStalls
  );

  const minCount = useMemo(() => {
    let ret = 0;
    for (const group of Object.keys(bookings)) {
      ret += bookings[group].length ?? 0;
    }
    return ret;
  }, [bookings]);

  const slots = useMemo(
    () =>
      BuildMarketRows(market.layout, bookings, Math.min(stallcount, minCount)),
    [market, bookings, stallcount, minCount]
  );

  useEffect(() => {
    if (loading) {
      window.setTimeout(() => setLoading(false), 500);
    }
  }, [loading]);

  if (loading) {
    return {
      loading,
      bookings: undefined,
      market: undefined,
      slots: undefined,
      savedStalls: undefined,
    };
  }

  return { market, slots, savedStalls, loading };
};
