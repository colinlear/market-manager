import { FC } from "react";
import { Box, Flex, GridItem, GridItemProps } from "@chakra-ui/react";
import { StallSlot } from "./MapRow";
import { MarketDisplayProps } from "../list";
import { makeCoords } from "./coords";

export interface MapStallProps extends MarketDisplayProps {
  onPress?: (slot: StallSlot) => void;
  grid?: GridItemProps;
}

export const MapStall: FC<MapStallProps> = ({ slot, onPress, grid }) => {
  return (
    <GridItem
      height="100%"
      width="100%"
      cursor="pointer"
      {...grid}
      rowStart={slot.row + 2}
      colStart={slot.column + 1}
      rowSpan={slot.rowSpan}
      colSpan={slot.colSpan}
      sx={slot.sx}
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100%"
        onClick={() => onPress && onPress(slot)}
      >
        {slot.stall?.id?.startsWith("special") ? (
          <Box>
            {slot.stall?.name
              .split(/\s+/)
              .map((s) => s.substring(0, 1).toLocaleUpperCase())
              .join("")}
          </Box>
        ) : (
          <Box>{makeCoords(slot.row, slot.column)}</Box>
        )}
      </Flex>
    </GridItem>
  );
};
