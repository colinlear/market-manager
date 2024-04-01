import { FC } from "react";
import { MapStall } from "./MapStall";
import { MarketStall } from "../types/market-stall";
import { MarketSlot } from "./pattern";
import { SkipGroup } from "./market-rows";
import { MarketDisplayProps } from "../list";
import { makeCoords } from "./coords";
import { MapLegend } from "./MapLegend";

export interface StallSlot extends MarketSlot {
  stall?: MarketStall;
  index: number;
  row: number;
}
export interface MapRowProps {
  row: number;
  Component?: FC<MarketDisplayProps>;
  keyPrefix: string;
  columns: number;
  slots: StallSlot[];
}

export const MapRow: FC<MapRowProps> = ({
  row,
  Component = MapStall,
  keyPrefix: key,
  columns,
  slots,
}) => {
  return [
    <MapLegend rowStart={row + 2} colStart={1}>
      {makeCoords(row, 0).substring(0, 1)}
    </MapLegend>,
    ...[...new Array(columns)].map((_, col) => {
      const stall = slots.filter((s) => s.column == col + 1).pop();
      if (stall?.group == SkipGroup) return null;
      if (stall) {
        return <Component key={`${key}-${col}`} slot={stall} />;
      }
      // return <MapPath key={`${key}-${idx}`} />;
    }),
  ];
};
