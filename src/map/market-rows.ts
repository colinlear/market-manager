import { StallList } from "../types/market-stall";
import { StallSlot } from "./MapRow";
import { MarketPattern, MarketSlot, MarketSlotGroup } from "./pattern";

export const SkipGroup: MarketSlotGroup = {
  id: "skip",
  name: "",
  powered: false,
  available: false,
};

export const BuildMarketRows = (
  pattern: MarketPattern,
  stalls: StallList,
  slots: number
) => {
  const repeatingStallSlots =
    slots - pattern.leadingSlots - pattern.trailingSlots;
  const indexes: Record<string, number> = {};

  const indexSlots = (row: number, slots: MarketSlot[]): StallSlot[] =>
    slots
      .map((s) => ({
        index: indexes[s.group.id]
          ? ++indexes[s.group.id]
          : (indexes[s.group.id] = 1),
        ...s,
      }))
      .map((s) => ({
        ...s,
        row,
        stall: stalls[s.group.id]?.[s.index] ?? undefined,
      }));

  const ret: StallSlot[][] = [];
  pattern.leading.forEach((row) => ret.push(indexSlots(ret.length, row)));
  BuildRepeatingRows(pattern.repeating, repeatingStallSlots).forEach((row) =>
    ret.push(indexSlots(ret.length, row))
  );
  pattern.trailing.forEach((row) => ret.push(indexSlots(ret.length, row)));
  // console.debug("Rows", ret);
  return ret;
};

export const BuildRepeatingRows = (pattern: MarketSlot[][], count: number) => {
  const ret: MarketSlot[][] = [];
  let used = 0;
  let row = 0;
  while (used < count) {
    const p = pattern[row % pattern.length];
    row++;
    used += p.length;
    ret.push(p);
  }
  // console.debug("repeating", count, ret);
  return ret;
};
