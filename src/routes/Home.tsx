import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useBreakpoint,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, useState } from "react";

import { StallHolderAd } from "../components/home/StallHolderAd";
import { PublicHeader } from "../components/home/PublicHeader";
import { StallSlot } from "../map/MapRow";
import { PublicStallModal } from "../components/home/PublicStallModal";
import { PublicList } from "../components/home/PublicList";
import { PublicMap } from "../components/home/PublicMap";
import { useMarket } from "../hooks/useMarket";
import { Loading } from "../components/Loading";

export const Home: FC = () => {
  const breakpoint = useBreakpoint();

  const { market, slots, loading } = useMarket(20);

  const [selected, setSelected] = useState<StallSlot>();
  const selectedModalState = useDisclosure({
    isOpen: !!selected,
    onClose: () => setSelected(undefined),
  });

  if (loading) {
    return <Loading />;
  }

  if (breakpoint == "sm" || breakpoint == "base") {
    return (
      <>
        <PublicStallModal slot={selected} state={selectedModalState} />
        <PublicHeader market={market} fixed />
        <Tabs align="center">
          <TabList
            position="fixed"
            top="6rem"
            left={0}
            right={0}
            height="2rem"
            background="white"
            zIndex={5}
          >
            <Tab>Stall List</Tab>
            <Tab>Map</Tab>
          </TabList>
          <TabPanels marginTop="2rem">
            <TabPanel>
              <StallHolderAd marginBottom="1rem" />
              <PublicList slots={slots} onSelect={(s) => setSelected(s)} />
            </TabPanel>
            <TabPanel>
              <PublicMap slots={slots} onSelect={(s) => setSelected(s)} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </>
    );
  }

  return (
    <>
      <PublicStallModal slot={selected} state={selectedModalState} />
      <PublicHeader market={market} />
      <Flex
        direction="row"
        margin="2rem"
        maxWidth="70rem"
        marginLeft="auto"
        marginRight="auto"
      >
        <Box minWidth="20rem">
          <PublicMap slots={slots} onSelect={(s) => setSelected(s)} />
        </Box>
        <Flex marginStart="2rem" direction="column" alignItems="center">
          <StallHolderAd marginBottom="1rem" />
          <PublicList
            slots={slots}
            onSelect={(s) => setSelected(s)}
            columns={2}
          />
        </Flex>
      </Flex>
    </>
  );
};
