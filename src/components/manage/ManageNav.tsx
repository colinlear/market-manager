import { Link, Stack } from "@chakra-ui/react";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

// const routes = {
//   "/manage": "Summary",
//   "/manage/markets": "Markets",
// };

export const ManageNav: FC<{ onNav?: () => void }> = ({ onNav }) => {
  return (
    <Stack spacing="0.25rem">
      <Link
        as={RouterLink}
        to="/manage"
        display="block"
        _hover={{ backgroundColor: "#eee" }}
        padding="0.5rem"
        onClick={onNav}
      >
        Summary
      </Link>
      <Link
        as={RouterLink}
        to="/manage/stalls"
        display="block"
        _hover={{ backgroundColor: "#eee" }}
        padding="0.5rem"
        onClick={onNav}
      >
        Stalls
      </Link>
    </Stack>
  );
};
