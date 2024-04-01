import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  GenericAvatarIcon,
  Heading,
  IconButton,
  useBreakpoint,
  useDisclosure,
} from "@chakra-ui/react";
import { FC } from "react";
import { MarketConfiguration } from "../../map/pattern";
import { BiMenu } from "react-icons/bi";
import { ManageNav } from "./ManageNav";

export const ManageHeader: FC<{ market: MarketConfiguration }> = ({
  market,
}) => {
  const breakpoint = useBreakpoint();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      position="fixed"
      left={0}
      right={0}
      top={0}
      height="5rem"
      paddingX="0.5rem"
      backgroundColor="#ace"
      zIndex={10}
    >
      {breakpoint == "sm" ? (
        <>
          <IconButton aria-label={"User"} onClick={onOpen} colorScheme="blue">
            <BiMenu />
          </IconButton>
          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Navigation</DrawerHeader>

              <DrawerBody>
                <ManageNav onNav={onClose} />
              </DrawerBody>

              {/* <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue">Save</Button>
              </DrawerFooter> */}
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <Box />
      )}
      <Box textAlign="center">
        <Heading size="lg">StallHolder Login</Heading>
        <Heading size="sm">{market.name}</Heading>
      </Box>
      <IconButton aria-label={"User"}>
        <GenericAvatarIcon />
      </IconButton>
    </Flex>
  );
};
