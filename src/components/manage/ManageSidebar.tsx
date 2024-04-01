import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { ManageNav } from "./ManageNav";

export const ManageSidebar: FC = () => {
  return (
    <Box
      position="fixed"
      top="5rem"
      left={0}
      bottom={0}
      width="10rem"
      backgroundColor="#aae"
      zIndex={10}
    >
      <ManageNav />
    </Box>
  );
};
