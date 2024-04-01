import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Textarea,
  NumberInput,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
} from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction } from "react";
import { TitleDivider } from "../misc/TitleDivider";
import { MarketStall } from "../types/market-stall";
import { defaultStall } from "./DefaultStall";

export interface StallFormProps {
  stall?: MarketStall;
  onChange: Dispatch<SetStateAction<MarketStall | undefined>>;
}

export const StallForm: FC<StallFormProps> = ({ stall, onChange }) => (
  <>
    <FormControl>
      <FormLabel>Stall Name</FormLabel>
      <Input
        type="name"
        required
        value={stall?.name ?? ""}
        onChange={(e) => {
          onChange((p) => ({
            ...(p ?? defaultStall),
            name: e.target.value,
          }));
        }}
      />
      {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
    </FormControl>
    <FormControl>
      <FormLabel>Product or Service</FormLabel>
      <Input
        type="name"
        required
        value={stall?.product ?? ""}
        onChange={(e) => {
          onChange((p) => ({
            ...(p ?? defaultStall),
            product: e.target.value,
          }));
        }}
      />
      <FormHelperText>
        E.G. Food, Beverage, Fresh Produce, Bakery or Skin Care etc.
      </FormHelperText>
    </FormControl>
    <FormControl>
      <FormLabel>Stall Description</FormLabel>
      <Textarea
        value={stall?.description ?? ""}
        onChange={(e) => {
          onChange((p) => ({
            ...(p ?? defaultStall),
            description: e.target.value,
          }));
        }}
      />
    </FormControl>
    <TitleDivider>Stall Requirements</TitleDivider>
    <FormControl>
      <FormLabel>Wants to rent a tent?</FormLabel>
      <NumberInput
        min={0}
        max={2}
        step={1}
        value={stall?.requirements?.tent ?? 0}
        onChange={(value) => {
          onChange((p) => ({
            ...(p ?? defaultStall),
            requirements: {
              ...(p?.requirements ?? {}),
              tent: parseInt(value, 10) ?? 0,
            },
          }));
        }}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
    <FormControl>
      <FormLabel>Wants to rent a table?</FormLabel>
      <NumberInput
        value={stall?.requirements?.table ?? 0}
        min={0}
        max={2}
        step={1}
        onChange={(value) => {
          onChange((p) => ({
            ...(p ?? defaultStall),
            requirements: {
              ...(p?.requirements ?? {}),
              table: parseInt(value, 10) ?? 0,
            },
          }));
        }}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
    <TitleDivider>Contact Details</TitleDivider>
    <FormControl>
      <FormLabel>Contact Name</FormLabel>
      <Input
        type="name"
        required
        value={stall?.contact?.name ?? ""}
        onChange={(e) => {
          onChange((p) => ({
            ...(p ?? defaultStall),
            contact: {
              ...(p?.contact ?? defaultStall.contact),
              name: e.target.value,
            },
          }));
        }}
      />
      {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
    </FormControl>
    <FormControl>
      <FormLabel>Email address</FormLabel>
      <Input
        type="email"
        required
        value={stall?.contact?.email ?? ""}
        onChange={(e) => {
          onChange((p) => ({
            ...(p ?? defaultStall),
            contact: {
              ...(p?.contact ?? defaultStall.contact),
              email: e.target.value,
            },
          }));
        }}
      />
      <FormHelperText>We'll never share your email.</FormHelperText>
    </FormControl>
    <FormControl>
      <FormLabel>Contact Phone Number</FormLabel>
      <Input
        type="tel"
        required
        value={stall?.contact?.phone ?? ""}
        onChange={(e) => {
          onChange((p) => ({
            ...(p ?? defaultStall),
            contact: {
              ...(p?.contact ?? defaultStall.contact),
              phone: e.target.value,
            },
          }));
        }}
      />
      <FormHelperText>We'll never share your email.</FormHelperText>
    </FormControl>
    <FormControl>
      <FormLabel>Website</FormLabel>
      <Input
        type="url"
        value={stall?.contact?.website ?? ""}
        onChange={(e) => {
          onChange((p) => ({
            ...(p ?? defaultStall),
            contact: {
              ...(p?.contact ?? defaultStall.contact),
              website: e.target.value,
            },
          }));
        }}
      />
    </FormControl>
  </>
);
