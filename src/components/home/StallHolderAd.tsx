import { Box, BoxProps, Button, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

export const StallHolderAd: FC<BoxProps> = (props) => (
  <Box
    textAlign="center"
    borderRadius="1rem"
    backgroundColor="yellow.100"
    paddingX="0.5rem"
    paddingTop="0.5rem"
    paddingBottom="1rem"
    {...props}
  >
    <Text>Available Stalls</Text>
    <Text fontSize="xx-large">Are you a stallholder?</Text>
    <Flex justifyContent="space-evenly">
      <Button
        as={ReactRouterLink}
        to="/manage"
        colorScheme="green"
        marginTop="1rem"
      >
        Register Now
      </Button>
      <Button
        as={ReactRouterLink}
        to="/manage"
        colorScheme="green"
        marginTop="1rem"
      >
        Login
      </Button>
    </Flex>
  </Box>
);
