import { Grid, GridProps } from "@chakra-ui/react";
import { FC, useMemo } from "react";
import { StallSlot } from "../map/MapRow";
import { SkipGroup } from "../map/market-rows";
import { DefaultMarketStallListEntry } from "./DefaultMarketStallListEntry";
import { defaultSortBy, defaultUniqBy } from "./defaultStallFunctions";
import _flatten from "lodash.flatten";
import _sortBy from "lodash.sortby";
import _uniqBy from "lodash.uniqby";

export interface MarketDisplayProps {
  slot: StallSlot;
}

export interface MarketStallListProps extends GridProps {
  Component?: FC<MarketDisplayProps>;
  columns?: number;
  rowGap?: string | number;
  columnGap?: string | number;
  slots: StallSlot[][];
  uniqBy?: (slot: StallSlot) => string | number;
  sortBy?: (slot: StallSlot) => string | number;
  hideBy?: (slot: StallSlot) => boolean;
}

export const MarketStallList: FC<MarketStallListProps> = ({
  Component = DefaultMarketStallListEntry,
  sortBy = defaultSortBy,
  uniqBy = defaultUniqBy,
  hideBy = () => false,
  columns = 1,
  slots: stalls,
  ...gridProps
}) => {
  const sortedStalls = useMemo(() => {
    return _sortBy(
      _uniqBy(
        _flatten(stalls).filter(
          (slot) => slot.group !== SkipGroup && !hideBy(slot)
        ),
        uniqBy
      ),
      sortBy
    );
  }, [stalls, sortBy, uniqBy, hideBy]);
  return (
    <Grid templateColumns={`repeat(${columns}, 1fr)`} {...gridProps}>
      {sortedStalls.map((slot) => (
        <Component slot={slot} key={`stalllist-${slot.column}-${slot.row}`} />
      ))}
    </Grid>
  );
};
