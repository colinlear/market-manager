import { Box, Flex, GridItem, GridItemProps } from "@chakra-ui/react";
import { FC } from "react";

export const MapLegend: FC<GridItemProps> = ({ children, ...props }) => (
  <GridItem
    border="1px solid #999"
    backgroundColor="#eee"
    height="100%"
    width="100%"
    {...props}
  >
    <Flex
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <Box>{children}</Box>
    </Flex>
  </GridItem>
);
