import { StallSlot } from "./MapRow";

export const backgroundStyle = (slot: StallSlot) =>
  slot.stall?.id?.startsWith("special")
    ? "blue"
    : slot.stall
    ? "green"
    : !slot.group.available
    ? "blue"
    : slot.group.powered
    ? "red"
    : "white";

export const foregroundStyle = (slot: StallSlot) =>
  !slot.group.available || slot.stall || slot.group.powered ? "white" : "black";
