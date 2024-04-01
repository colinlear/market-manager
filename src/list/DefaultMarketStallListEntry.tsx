import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { backgroundStyle, foregroundStyle } from "../map/style";
import { MarketDisplayProps } from ".";

export const DefaultMarketStallListEntry: FC<MarketDisplayProps> = ({
  slot,
}) => {
  return (
    <Box
      backgroundColor={backgroundStyle(slot)}
      color={foregroundStyle(slot)}
      padding={"0.5rem"}
      cursor="pointer"
      _hover={{
        backgroundColor: "cyan",
        color: "black",
      }}
    >
      {slot.stall?.id?.startsWith("special")
        ? slot.stall?.name
            .split(/\s+/)
            .map((s) => s.substring(0, 1).toLocaleUpperCase())
            .join("")
        : `${slot.column}${slot.row}`}
      : {slot.stall?.name ?? (slot.group.available ? "Available" : "Reserved")}
    </Box>
  );
};
