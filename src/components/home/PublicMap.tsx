import { FC } from "react";
import { StallSlot } from "../../map/MapRow";
import { MarketMap } from "../../map";
import { MapStall } from "../../map/MapStall";
import { borderStyle } from "../../map/public-style";
import { backgroundStyle, foregroundStyle } from "../../map/style";

export const PublicMap: FC<{
  slots: StallSlot[][];
  onSelect?: (slot: StallSlot) => void;
}> = ({ slots, onSelect }) => {
  return (
    <MarketMap
      stalls={slots}
      Component={({ slot }) => {
        return (
          <MapStall
            slot={slot}
            grid={{
              border: borderStyle,
              backgroundColor: backgroundStyle(slot),
              color: foregroundStyle(slot),
              _hover: {
                backgroundColor: "cyan",
                color: "black",
              },
            }}
            onPress={(s) => onSelect && onSelect(s)}
          />
        );
      }}
    />
  );
};
