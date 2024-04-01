import { FC } from "react";
import { ManageHeader } from "../components/manage/ManageHeader";
import { useMarket } from "../hooks/useMarket";
import { Loading } from "../components/Loading";
import { ManageSidebar } from "../components/manage/ManageSidebar";
import { Box, useBreakpoint } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export const ManageRoute: FC = () => {
  const breakpoint = useBreakpoint();
  const { market, loading } = useMarket();

  if (loading) {
    return <Loading />;
  }

  if (breakpoint == "sm" || breakpoint == "base") {
    return (
      <>
        <ManageHeader market={market} />
        <Box marginTop="5rem" padding="1rem">
          <Outlet />
        </Box>
      </>
    );
  }

  return (
    <>
      <ManageHeader market={market} />
      <ManageSidebar />
      <Box marginLeft="10rem" marginTop="5rem" padding="1rem">
        <Outlet />
      </Box>
    </>
  );
};
