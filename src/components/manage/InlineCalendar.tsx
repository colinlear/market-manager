import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

type DateColors = Record<string, string>;

export const InlineCalendarMonth: FC<{
  year: number;
  month: number;
  highlight?: DateColors;
  validDate?: (date: Date) => boolean;
  onClick?: (date: Date) => void;
}> = ({
  year,
  month,
  highlight = {},
  onClick,
  validDate: canClick = () => true,
}) => {
  const start = new Date(year, month, 1, 0, 0, 0, 0);
  const daysInMonth = new Date(year, month + 1, 0, 0, 0, 0, 0).getDate();
  const day = start.getDay();
  return (
    <Grid templateColumns={`repeat(7, 1fr)`}>
      <GridItem textAlign="center" width="100%">
        Sun
      </GridItem>
      <GridItem textAlign="center" width="100%">
        Mon
      </GridItem>
      <GridItem textAlign="center" width="100%">
        Tue
      </GridItem>
      <GridItem textAlign="center" width="100%">
        Wed
      </GridItem>
      <GridItem textAlign="center" width="100%">
        Thu
      </GridItem>
      <GridItem textAlign="center" width="100%">
        Fri
      </GridItem>
      <GridItem textAlign="center" width="100%">
        Sat
      </GridItem>
      <GridItem textAlign="center" width="100%" colSpan={day} />
      {[...new Array(daysInMonth)].map((_, idx) => {
        const date = new Date(
          start.getFullYear(),
          start.getMonth(),
          idx + 1,
          0,
          0,
          0,
          0
        );
        const clickAble = canClick(date);
        return (
          <GridItem
            textAlign="center"
            width="100%"
            color={clickAble ? undefined : "#666"}
            backgroundColor={highlight[date.toLocaleDateString()]}
            onClick={
              clickAble
                ? () => {
                    onClick && onClick(date);
                  }
                : undefined
            }
            cursor={clickAble ? "pointer" : undefined}
            _hover={
              clickAble
                ? {
                    backgroundColor: "#eee",
                  }
                : undefined
            }
          >
            {idx + 1}
          </GridItem>
        );
      })}
    </Grid>
  );
};

export interface YearMonth {
  year: number;
  month: number;
}

export const InlineCalendar: FC<{
  highlight: DateColors;
  validDate?: (date: Date) => boolean;
  onClick: (date: Date) => void;
}> = ({ highlight, validDate, onClick }) => {
  const now = new Date();
  const [yearMonth, setYearMonth] = useState<YearMonth>({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  });

  const start = new Date(yearMonth.year, yearMonth.month, 1, 0, 0, 0, 0);

  return (
    <Box maxWidth="20rem">
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <IconButton
          marginRight="0.5rem"
          aria-label={""}
          disabled={
            yearMonth.year < now.getFullYear() ||
            (yearMonth.year == now.getFullYear() &&
              yearMonth.month <= now.getMonth() - 1)
          }
          onClick={() => {
            setYearMonth((p) => {
              if (
                yearMonth.year < now.getFullYear() ||
                (yearMonth.year == now.getFullYear() &&
                  yearMonth.month <= now.getMonth())
              ) {
                return p;
              }
              return {
                month: p.month > 1 ? p.month - 1 : 12,
                year: p.month > 1 ? p.year : p.year - 1,
              };
            });
          }}
        >
          <BiLeftArrow />
        </IconButton>
        <Heading size="sm" textAlign="center">
          {start.toLocaleString("default", { month: "long" })}{" "}
          {start.getFullYear()}
        </Heading>
        <IconButton
          aria-label={""}
          marginLeft="0.5rem"
          onClick={() => {
            setYearMonth((p) => {
              if (
                p.year * 12 +
                  p.month -
                  (now.getFullYear() * 12 + now.getMonth()) >
                3
              ) {
                return p;
              }
              return {
                month: p.month < 12 ? p.month + 1 : 1,
                year: p.month < 12 ? p.year : p.year + 1,
              };
            });
          }}
        >
          <BiRightArrow />
        </IconButton>
      </Flex>
      <InlineCalendarMonth
        year={yearMonth.year}
        month={yearMonth.month}
        highlight={highlight}
        validDate={validDate}
        onClick={onClick}
      />
    </Box>
  );
};
