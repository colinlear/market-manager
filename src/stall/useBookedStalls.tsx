import { useLocalStorage } from "@uidotdev/usehooks";
import { MarketStall, StallList } from "../types/market-stall";
import { useMemo } from "react";
import { defaultStall } from "./DefaultStall";
import { SpecialStalls } from "../map/pattern";

type SaveStallList = Record<string, (string | undefined)[]>;

export const useBookedStalls = (
  marketId: string,
  savedStalls: MarketStall[],
  specialStalls: SpecialStalls
) => {
  const [rawBookings, setRawBookings] = useLocalStorage<SaveStallList>(
    marketId,
    {}
  );

  const indexedStalls = useMemo(() => {
    const ret: Record<string, MarketStall> = {};
    for (const stall of savedStalls) {
      if (stall.id) {
        ret[stall.id] = stall;
      }
    }
    return ret;
  }, [savedStalls]);

  const bookings = useMemo(() => {
    const ret: StallList = {};
    for (const group of Object.keys(rawBookings)) {
      ret[group] = [];
      for (const stallId of rawBookings[group]) {
        ret[group].push(
          typeof stallId == "object"
            ? stallId
            : stallId?.startsWith("special")
            ? {
                ...defaultStall,
                id: stallId,
                name: specialStalls[stallId] ?? stallId,
              }
            : stallId
            ? indexedStalls[stallId]
            : undefined
        );
      }
    }
    return ret;
  }, [rawBookings, indexedStalls, specialStalls]);

  const setBookingSlot = (
    group: string,
    index: number,
    stall: MarketStall | undefined
  ) => {
    if (stall && !stall.id) {
      throw Error("Unsaved Stall");
    }
    setRawBookings((prev) => {
      const stallList = prev[group] ?? [];
      stallList[index] = stall?.id;
      return {
        ...prev,
        [group]: stallList,
      };
    });
  };

  return { bookings, setBookingSlot };
};
