import { FC } from "react";
import { StallSlot } from "../../map/MapRow";
import { MarketStallList } from "../../list";
import { Box } from "@chakra-ui/react";
import { makeCoords } from "../../map/coords";

export const PublicList: FC<{
  slots: StallSlot[][];
  onSelect?: (slot: StallSlot) => void;
  columns?: number;
}> = ({ slots, onSelect, columns = 1 }) => {
  return (
    <MarketStallList
      slots={slots}
      textAlign="start"
      hideBy={(s) => !s.stall || s.group.id == "special"}
      sortBy={(s) => s.stall?.name ?? ""}
      columns={columns}
      Component={({ slot }) => (
        <Box
          padding="0.5rem"
          textAlign="center"
          cursor="pointer"
          onClick={() => onSelect && onSelect(slot)}
          _hover={{
            backgroundColor: "cyan",
          }}
        >
          <Box fontWeight={600} fontSize="110%">
            {makeCoords(slot.row, slot.column)}: {slot.stall?.name}
          </Box>
          <Box>{slot.stall?.description}</Box>
        </Box>
      )}
    />
  );
};
