import { AbsoluteCenter, Box, Divider, DividerProps } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export interface TitleDividerProps extends DividerProps, PropsWithChildren {}

export const TitleDivider: FC<TitleDividerProps> = ({ children }) => (
  <Box position="relative" marginBottom="1rem" marginTop="2rem">
    <Divider />
    <AbsoluteCenter bg="white" px="4" color="blackAlpha.600">
      {children}
    </AbsoluteCenter>
  </Box>
);
