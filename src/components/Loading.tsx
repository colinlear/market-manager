import { Box, Heading, Progress } from "@chakra-ui/react";
import { FC } from "react";

export const Loading: FC = () => (
  <Box marginX="2rem" marginY="30%">
    <Heading size="md" textAlign="center" mb="1rem">
      Loading
    </Heading>
    <Progress size="xs" isIndeterminate />
  </Box>
);
