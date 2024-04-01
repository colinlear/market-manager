import { useLocalStorage } from "@uidotdev/usehooks";
import { MarketStall } from "../types/market-stall";

export const useSavedStalls = () => {
  const [savedStalls, setSavedStalls] = useLocalStorage<MarketStall[]>(
    "savedstalls",
    []
  );

  const makeId = (stalls: MarketStall[]) => {
    let ret = 0;
    for (const s of stalls) {
      const match = /(\d+)/.exec(s.id ?? "");
      if (match) {
        ret = Math.max(ret, parseInt(match[1], 10));
      }
    }
    return `stall-${ret + 1}`;
  };

  const saveStall = (stall: MarketStall) => {
    setSavedStalls((p) => {
      let ret = p;
      if (!stall.id) {
        stall.id = makeId(p);
        stall.isNew = false;
        ret = [...p, stall];
      } else {
        ret = p.map((s) => (s.id === stall.id ? stall : s));
      }
      ret.sort((s1, s2) => s1.name.localeCompare(s2.name));
      return ret;
    });
  };

  return { savedStalls, saveStall };
};
