import { FC, useState } from "react";
import { MarketStall } from "../types/market-stall";
import { Box, BoxProps, Heading, Input } from "@chakra-ui/react";

export interface SavedStallListProps {
  savedStalls?: MarketStall[];
  onClick: (stall: MarketStall) => void;
  box?: BoxProps;
}

export const SavedStallList: FC<SavedStallListProps> = ({
  savedStalls,
  onClick,
  box,
}) => {
  const [filter, setFilter] = useState("");

  return (
    <>
      <Input
        type="search"
        placeholder="Filter List"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        marginBottom="0.5rem"
      />
      <Box {...box}>
        {savedStalls?.map(
          (s) =>
            (!filter ||
              s.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
              s.contact.name
                .toLocaleLowerCase()
                .includes(filter.toLocaleLowerCase())) && (
              <Box
                key={s.id ?? s.name}
                cursor="pointer"
                _odd={{
                  backgroundColor: "blackAlpha.300",
                }}
                _hover={{
                  backgroundColor: "cyan",
                  color: "black",
                }}
                padding="0.25rem"
                onClick={() => onClick(s)}
                {...box}
              >
                <Heading size="sm">{s.name}</Heading>
                <Box>Product: {s.product}</Box>
                <Box>Contact: {s.contact.name}</Box>
              </Box>
            )
        )}
      </Box>
    </>
  );
};
