import { FC, useMemo, useState } from "react";
import { MarketConfiguration } from "./map/pattern";

import {
  Button,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { MarketMap } from "./map";
import { MarketStall, validateStall } from "./types/market-stall";
import { BuildMarketRows } from "./map/market-rows";
import { StallSlot } from "./map/MapRow";
import { StallDetails } from "./stall/StallDetails";
import { BookSlot } from "./stall/BookSlot";
import { MarketStallList } from "./list";
import { ManageSavedStalls } from "./ManageSavedStalls";
import { useSavedStalls } from "./stall/useSavedStalls";
import { useBookedStalls } from "./stall/useBookedStalls";

export interface MarketInterfaceProps {
  market: MarketConfiguration;
}

export const MarketInterface: FC<MarketInterfaceProps> = ({ market }) => {
  const { savedStalls, saveStall } = useSavedStalls();
  const { bookings, setBookingSlot } = useBookedStalls(
    market.id,
    savedStalls,
    market.specialStalls
  );

  // console.debug("Stalls", stalls);

  const [stallcount] = useState(30);

  const [selected, setSelected] = useState<StallSlot>();
  const [stall, setStall] = useState<MarketStall>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const slots = useMemo(
    () => BuildMarketRows(market.layout, bookings, stallcount),
    [market, bookings, stallcount]
  );

  const onPress = (slot: StallSlot) => {
    setSelected(slot);
    onOpen();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selected?.stall
              ? selected?.stall.name
              : selected?.group.available
              ? "Book this Space"
              : "Reserved Space"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selected?.stall ? (
              <StallDetails stall={selected.stall} />
            ) : selected ? (
              <BookSlot
                slot={selected}
                stall={stall ?? selected.stall}
                savedStalls={savedStalls}
                specialStalls={market.specialStalls}
                onChange={(s) => {
                  // console.debug("Seleted", s);
                  setStall(s);
                  if ((s as MarketStall | undefined)?.isNew === false) {
                    setBookingSlot(
                      selected.group.id,
                      selected.index,
                      s as MarketStall
                    );
                    // setStalls((prev) => {
                    //   const stallList = stalls[selected?.group.id] ?? [];
                    //   stallList[selected.index] = { ...(s as MarketStall) };
                    //   return {
                    //     ...prev,
                    //     [selected?.group.id]: stallList,
                    //   };
                    // });
                    setStall(undefined);
                    setSelected(undefined);
                    onClose();
                  }
                }}
              />
            ) : null}
            {/* <pre>{JSON.stringify(selected, null, 2)}</pre> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              {selected?.stall ? "Close" : "Cancel"}
            </Button>
            {selected?.stall ? (
              <Button
                variant="ghost"
                onClick={() => {
                  setBookingSlot(selected.group.id, selected.index, undefined);
                  //   setStalls((prev) => {
                  //     const stallList = prev[selected.group.id];
                  //     stallList[selected.index] = undefined;
                  //     return {
                  //       ...prev,
                  //       [selected.group.id]: stallList,
                  //     };
                  //   });
                  onClose();
                }}
              >
                Cancel Booking
              </Button>
            ) : (
              <Button
                variant="ghost"
                onClick={() => {
                  // validate stall
                  if (stall && selected && validateStall(stall)) {
                    if (stall?.isNew) {
                      saveStall(stall);
                    }
                    setBookingSlot(selected.group.id, selected.index, stall);
                    // setStalls((prev) => {
                    //   const stallList = stalls[selected?.group.id] ?? [];
                    //   stallList[selected.index] = { ...stall, isNew: false };
                    //   return {
                    //     ...prev,
                    //     [selected?.group.id]: stallList,
                    //   };
                    // });
                    setStall(undefined);
                    setSelected(undefined);
                    onClose();
                  } else {
                    console.warn(
                      "Invalid MarketStall",
                      !!selected,
                      validateStall(stall)
                    );
                  }
                }}
              >
                Book Space
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Heading
        size={"lg"}
        textAlign="center"
        position="fixed"
        top={0}
        left={0}
        right={0}
        height="3rem"
        background="white"
        zIndex={5}
      >
        {market.name}
      </Heading>
      <Tabs align="center">
        <TabList
          position="fixed"
          top="3rem"
          left={0}
          right={0}
          height="2rem"
          background="white"
          zIndex={5}
        >
          <Tab>Map</Tab>
          <Tab>Stall List</Tab>
          <Tab>Saved Stalls</Tab>
        </TabList>
        <TabPanels marginTop="5rem">
          <TabPanel>
            <MarketMap stalls={slots} onPress={onPress} />
          </TabPanel>
          <TabPanel>
            <MarketStallList slots={slots} textAlign="start" />
          </TabPanel>
          <TabPanel>
            <ManageSavedStalls
              savedStalls={savedStalls}
              saveStall={saveStall}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
