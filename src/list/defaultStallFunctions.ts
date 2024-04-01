import { StallSlot } from "../map/MapRow";

export const defaultUniqBy = (slot: StallSlot) => {
  return slot.stall?.id?.startsWith("special")
    ? slot.stall?.name
        .split(/\s+/)
        .map((s) => s.substring(0, 1).toLocaleUpperCase())
        .join("")
    : `${slot.group.name.substring(0, 1).toLocaleUpperCase()}${slot.index}`;
};

export const defaultSortBy = (slot: StallSlot) => {
  return `${slot.group.id}-${slot.index}`;
};
