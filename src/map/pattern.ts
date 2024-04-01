import { GridItemProps } from "@chakra-ui/react";

export enum MarketSlotType {
  Special,
  Reserved,
  Food,
  Stall,
}

export interface MarketSlot
  extends Pick<GridItemProps, "sx" | "colSpan" | "rowSpan"> {
  group: MarketSlotGroup;
  column: number;
}

export interface MarketSlotGroup {
  id: string;
  name: string;
  powered: boolean;
  available: boolean;
}

export type MarketGroups = Record<string, MarketSlotGroup>;

export type SpecialStalls = Record<string, string>;

export interface MarketPattern {
  leadingSlots: number;
  leading: MarketSlot[][];
  repeating: MarketSlot[][];
  trailing: MarketSlot[][];
  trailingSlots: number;
}

export interface MarketConfiguration {
  id: string;
  name: string;
  groups: MarketGroups;
  specialStalls: SpecialStalls;
  layout: MarketPattern;
}
