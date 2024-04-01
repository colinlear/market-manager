import { StallSlot } from "./MapRow";

export const borderStyle = "1px solid #333";

export const backgroundStyle = (slot: StallSlot) =>
  slot.stall?.id?.startsWith("special")
    ? "blue"
    : slot.stall
    ? "green"
    : !slot.group.available
    ? "#ccc"
    : "#fff";

export const foregroundStyle = (slot: StallSlot) =>
  slot.stall ? "white" : "black";
