import {
  Box,
  Divider,
  Heading,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { MarketStall } from "../types/market-stall";
import { Dispatch, FC, Fragment } from "react";

import { BsFillLightningFill } from "react-icons/bs";
import { StallSlot } from "../map/MapRow";
import { TitleDivider } from "../misc/TitleDivider";
import { SavedStallList } from "./SavedStallList";
import { StallForm } from "./StallForm";
import { defaultStall } from "./DefaultStall";
import { SpecialStalls } from "../map/pattern";

export interface BookSlotProps {
  slot: StallSlot;
  stall?: MarketStall;
  savedStalls?: MarketStall[];
  specialStalls?: SpecialStalls;
  onChange: Dispatch<React.SetStateAction<MarketStall | undefined>>;
}

export const BookSlot: FC<BookSlotProps> = ({
  slot,
  stall,
  savedStalls,
  specialStalls,
  onChange,
}) => {
  return (
    <Box>
      <TitleDivider>Slot Details</TitleDivider>
      <Heading
        size="md"
        display="flex"
        alignItems="center"
        color="blue.600"
        justifyContent="center"
        marginBottom="1rem"
      >
        {!!slot.group.powered && <Icon as={BsFillLightningFill} />}
        {slot.group.name} Stall ({slot.index})
      </Heading>
      <TitleDivider>Stall Details</TitleDivider>
      <Tabs align="center">
        <TabList>
          <Tab>Saved Stall</Tab>
          <Tab>New Stall</Tab>
          <Tab>Special</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SavedStallList
              savedStalls={savedStalls}
              onClick={(s) => {
                onChange(s);
              }}
              box={{ overflowY: "auto", maxHeight: "20rem" }}
            />
          </TabPanel>
          <TabPanel>
            <StallForm onChange={onChange} stall={stall} />
          </TabPanel>
          <TabPanel>
            {!!specialStalls &&
              Object.keys(specialStalls).map((id) => (
                <Fragment key={specialStalls[id]}>
                  <Box
                    padding="1rem"
                    cursor="pointer"
                    _hover={{
                      backgroundColor: "cyan",
                      color: "black",
                    }}
                    onClick={() => {
                      onChange({
                        ...defaultStall,
                        id,
                        isNew: false,
                        name: specialStalls[id],
                      });
                    }}
                  >
                    <Heading size="sm">{specialStalls[id]}</Heading>
                  </Box>
                  <Divider />
                </Fragment>
              ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
