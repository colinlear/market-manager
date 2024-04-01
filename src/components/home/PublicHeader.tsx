import {
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

import { FC } from "react";
import { MarketConfiguration } from "../../map/pattern";

export const PublicHeader: FC<{
  market: MarketConfiguration;
  fixed?: boolean;
}> = ({ market, fixed = false }) => (
  <>
    <Heading
      size="lg"
      height="3rem"
      paddingTop="1rem"
      textAlign="center"
      {...(fixed && {
        background: "white",
        whiteSpace: "nowrap",
        overflowX: "hidden",
        top: 0,
        left: 0,
        right: 0,
        position: "fixed",
        zIndex: 10,
      })}
    >
      {market.name}
    </Heading>
    <Flex
      justifyContent="center"
      direction="row"
      {...(fixed && {
        background: "white",
        top: "3rem",
        left: 0,
        right: 0,
        height: "3rem",
        position: "fixed",
        zIndex: 10,
      })}
    >
      <Menu placement="bottom-end">
        <MenuButton
          as={IconButton}
          aria-label="Previous Markets"
          icon={<FiArrowLeftCircle />}
          variant="ghost"
        />
        <MenuList>
          <MenuGroup title="Previous Markets">
            <MenuItem>Sunday 3rd Oct</MenuItem>
            <MenuItem>Sunday 4th March</MenuItem>
            <MenuItem>Sunday 23rd Feb</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
      <Heading size="xl" height="3rem" textAlign="center" marginX="1rem">
        Sunday Dec 25th
      </Heading>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Future Markets"
          icon={<FiArrowRightCircle />}
          variant="ghost"
        />
        <MenuList>
          <MenuGroup title="Future Markets">
            <MenuItem>Sunday 3rd Oct</MenuItem>
            <MenuItem>Sunday 4th March</MenuItem>
            <MenuItem>Sunday 23rd Feb</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
    {fixed && <Box height="6rem" />}
  </>
);
