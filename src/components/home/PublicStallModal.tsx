import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { FC } from "react";
import { StallDetails } from "../../stall/StallDetails";
import { StallSlot } from "../../map/MapRow";

export const PublicStallModal: FC<{
  slot?: StallSlot;
  state: UseDisclosureReturn;
}> = ({ slot, state: { isOpen, onClose } }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {slot?.stall
            ? slot?.stall.name
            : slot?.group.available
            ? "Book this Space"
            : "Reserved Space"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <StallDetails stall={slot?.stall} />
          {/* <pre>{JSON.stringify(slot, null, 2)}</pre> */}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
