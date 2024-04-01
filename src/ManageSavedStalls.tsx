import { FC, useState } from "react";
import { MarketStall, validateStall } from "./types/market-stall";
import { SavedStallList } from "./stall/SavedStallList";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { StallForm } from "./stall/StallForm";

export interface ManageSavedStallsProps {
  savedStalls?: MarketStall[];
  saveStall?: (stall: MarketStall) => void;
}
export const ManageSavedStalls: FC<ManageSavedStallsProps> = ({
  savedStalls,
  saveStall,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState<MarketStall>();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Stall Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <StallDetails stall={selected} /> */}
            <StallForm stall={selected} onChange={setSelected} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme={validateStall(selected) ? "blue" : "gray"}
              mr={3}
              onClick={() => {
                if (selected && validateStall(selected) && saveStall) {
                  console.debug(selected);
                  saveStall(selected);
                  onClose();
                }
              }}
              disabled={!validateStall(selected)}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <SavedStallList
        savedStalls={savedStalls}
        onClick={(s) => {
          setSelected(s);
          onOpen();
        }}
      />
    </>
  );
};
