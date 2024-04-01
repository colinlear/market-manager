import { SkipGroup } from "../map/market-rows";
import { MarketConfiguration, MarketGroups } from "../map/pattern";

export const VictoriaParkGroups: MarketGroups = {
  food: {
    id: "food",
    name: "Food",
    powered: true,
    available: true,
  },
  powered: {
    id: "powered",
    name: "Powered Space",
    powered: true,
    available: true,
  },
  general: {
    id: "general",
    name: "General Product or Craft",
    powered: false,
    available: true,
  },
  special: {
    id: "special",
    name: "Special Slot",
    powered: false,
    available: false,
  },
  reserved: {
    id: "reserved",
    name: "Reserved Slot",
    powered: false,
    available: false,
  },
};

export const VictoriaParkMarket: MarketConfiguration = {
  id: "vicpark",
  name: "Victoria Park Farmers Market",
  groups: VictoriaParkGroups,
  specialStalls: {
    "special-busker": "Busker",
    "special-management": "Market Manager",
    "special-seating": "Protected Seating",
  },
  layout: {
    leadingSlots: 11,
    leading: [
      [
        {
          group: VictoriaParkGroups.special,
          column: 3,
        },
      ],
      [
        {
          group: VictoriaParkGroups.special,
          column: 5,
          sx: { transform: "rotate(70deg)" },
        },
        {
          group: VictoriaParkGroups.special,
          column: 7,
          sx: { transform: "translate(-30%, 30%) rotate(70deg)" },
        },
      ],
      [
        {
          group: VictoriaParkGroups.reserved,
          column: 3,
          sx: { transform: "translateX(50%)" },
        },
        {
          group: VictoriaParkGroups.special,
          column: 5,
          sx: { transform: "translateX(35%) rotate(70deg) " },
        },
      ],
      [
        {
          group: VictoriaParkGroups.general,
          column: 1,
          rowSpan: 4,
        },
      ],
      [
        {
          group: SkipGroup,
          column: 1,
        },
        {
          group: VictoriaParkGroups.powered,
          column: 3,
        },
        {
          group: VictoriaParkGroups.powered,
          column: 4,
        },
        {
          group: VictoriaParkGroups.reserved,
          column: 6,
        },
      ],
      [
        {
          group: SkipGroup,
          column: 1,
        },
        {
          group: VictoriaParkGroups.powered,
          column: 3,
        },
        {
          group: VictoriaParkGroups.food,
          column: 4,
        },
        {
          group: VictoriaParkGroups.food,
          column: 6,
        },
      ],
      [
        {
          group: SkipGroup,
          column: 1,
        },
        {
          group: VictoriaParkGroups.food,
          column: 6,
        },
      ],
      [
        {
          group: VictoriaParkGroups.general,
          column: 1,
        },
        {
          group: VictoriaParkGroups.general,
          column: 3,
        },
        {
          group: VictoriaParkGroups.general,
          column: 4,
        },
        {
          group: VictoriaParkGroups.food,
          column: 6,
        },
      ],
      [
        {
          group: VictoriaParkGroups.general,
          column: 1,
        },
        {
          group: VictoriaParkGroups.general,
          column: 3,
        },
        {
          group: VictoriaParkGroups.general,
          column: 4,
        },
        {
          group: VictoriaParkGroups.powered,
          column: 6,
        },
      ],
    ],
    repeating: [
      [
        {
          group: VictoriaParkGroups.general,
          column: 1,
        },
        {
          group: VictoriaParkGroups.general,
          column: 6,
        },
      ],
      [
        {
          group: VictoriaParkGroups.general,
          column: 1,
        },
        {
          group: VictoriaParkGroups.general,
          column: 3,
        },
        {
          group: VictoriaParkGroups.general,
          column: 4,
        },
        {
          group: VictoriaParkGroups.general,
          column: 6,
        },
      ],
      [
        {
          group: VictoriaParkGroups.general,
          column: 1,
        },
        {
          group: VictoriaParkGroups.general,
          column: 3,
        },
        {
          group: VictoriaParkGroups.general,
          column: 4,
        },
        {
          group: VictoriaParkGroups.general,
          column: 6,
        },
      ],
    ],
    trailing: [
      [
        {
          group: VictoriaParkGroups.general,
          column: 1,
        },
        {
          group: VictoriaParkGroups.general,
          column: 6,
        },
      ],
      [
        {
          group: VictoriaParkGroups.special,
          column: 3,
        },
        {
          group: VictoriaParkGroups.general,
          column: 4,
        },
        {
          group: VictoriaParkGroups.general,
          column: 5,
        },
      ],
    ],
    trailingSlots: 5,
  },
};
