import { Box, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { InlineCalendar } from "../../components/manage/InlineCalendar";

export interface Booking {
  date: string;
  market: string;
  row: number;
  column: number;
  stall: {
    id: string;
    name: string;
  };
}

export const StallSummary: FC<{ bookings: Booking[] }> = () => {
  return (
    <>
      <Heading size="md" marginBottom="1rem">
        Upcoming Markets
      </Heading>
      <InlineCalendar
        onClick={(date) => {
          console.debug(date);
        }}
        validDate={(date) => date >= new Date()}
        highlight={{
          [new Date().toLocaleDateString()]: "cyan",
          [new Date(2024, 3, 4).toLocaleDateString()]: "red",
        }}
      />
      <Box marginTop="1rem" paddingLeft="2rem">
        <ul>
          <li> Victoria Park Farmers Market (10-12-2024)</li>
          <li> Victoria Park Farmers Market (10-12-2024)</li>
          <li> Victoria Park Farmers Market (10-12-2024)</li>
          <li> Victoria Park Farmers Market (10-12-2024)</li>
        </ul>
      </Box>
    </>
  );
};
