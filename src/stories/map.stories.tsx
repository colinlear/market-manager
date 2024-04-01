import { Story, StoryDefault } from "@ladle/react";
import { MarketMap } from "../map";
import { VictoriaParkMarket } from "../market/victoria-park";
import { BuildMarketRows } from "../map/market-rows";
import { MarketStallList } from "../list";
import { Flex } from "@chakra-ui/react";
import { useMemo } from "react";
import { StallSlot } from "../map/MapRow";

export default {
  title: "Market Map",
} satisfies StoryDefault;

type MapStoryProps = { stalls: number };

export const VicParkLayout: Story<MapStoryProps> = ({ stalls }) => {
  const slots = useMemo(
    () => BuildMarketRows(VictoriaParkMarket.layout, {}, stalls),
    [stalls]
  );

  const onPress = (slot: StallSlot) => {
    alert(`Selected Slot\n${JSON.stringify(slot, null, 2)}`);
  };

  return (
    <Flex direction="row" alignItems="center">
      <MarketMap stalls={slots} onPress={onPress} />
      <MarketStallList slots={slots} marginLeft="2rem" onPress={onPress} />
    </Flex>
  );
};

VicParkLayout.argTypes = {
  stalls: {
    control: { type: "range", min: 15, max: 100, step: 1 },
    defaultValue: 30,
  },
};

export const VicParkMap: Story<MapStoryProps> = ({ stalls }) => (
  <MarketMap stalls={BuildMarketRows(VictoriaParkMarket.layout, {}, stalls)} />
);

VicParkMap.argTypes = {
  stalls: {
    control: { type: "range", min: 15, max: 100, step: 1 },
    defaultValue: 30,
  },
};

export const VicParkStallList: Story<MapStoryProps> = ({ stalls }) => (
  <MarketStallList
    slots={BuildMarketRows(VictoriaParkMarket.layout, {}, stalls)}
  />
);

VicParkStallList.argTypes = {
  stalls: {
    control: { type: "range", min: 15, max: 100, step: 1 },
    defaultValue: 30,
  },
};
