import { FC, useMemo } from "react";
import { Grid } from "@chakra-ui/react";
import { MapRow, StallSlot } from "./MapRow";
import { MarketDisplayProps } from "../list";
import { MapLegend } from "./MapLegend";

export interface MarketMapProps {
  Component?: FC<MarketDisplayProps>;
  slotSize?: number;
  stalls: StallSlot[][];
  onPress?: (slot: StallSlot) => void;
}

export const MarketMap: FC<MarketMapProps> = ({
  Component,
  stalls,
  slotSize = 3,
}) => {
  const columns = useMemo(() => {
    let ret = 1;
    for (const row of stalls) {
      for (const slot of row) {
        ret = Math.max(ret, slot.column);
      }
    }
    return ret;
  }, [stalls]);

  return (
    <Grid
      templateColumns={`repeat(${columns + 1}, 1fr)`}
      gap={0}
      width={`${(columns + 1) * slotSize}rem`}
      height={`${(stalls.length + 1) * slotSize}rem`}
    >
      {[...new Array(columns)].map((_, col) => (
        <MapLegend rowStart={1} colStart={col + 2}>
          {col + 1}
        </MapLegend>
      ))}
      {stalls.map((row, idx) => (
        <MapRow
          row={idx}
          key={`stalls-${idx}`}
          keyPrefix={`stalls-${idx}`}
          columns={columns}
          slots={row}
          Component={Component}
        />
      ))}
    </Grid>
  );
};
