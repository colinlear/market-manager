import { Text, Card, CardBody } from "@chakra-ui/react";
import { FC } from "react";
import { MarketStall } from "../types/market-stall";

export interface StallDetailsProps {
  stall?: MarketStall;
}

export const StallDetails: FC<StallDetailsProps> = ({ stall }) => {
  return (
    <>
      <Text fontWeight={600} fontSize="80%">
        {stall?.product}
      </Text>
      <Text>{stall?.description}</Text>
      {stall?.contact.name && (
        <Card>
          <CardBody>
            <Text>Contact</Text>
            <Text>{stall?.contact.name}</Text>
            <Text>
              <a href={`mailto:${stall?.contact.email}`}>
                {stall?.contact.email}
              </a>
            </Text>
            <Text>
              <a href={`tel:${stall?.contact.phone}`}>{stall?.contact.phone}</a>
            </Text>
            <Text>
              <a href={stall?.contact.website}>{stall?.contact.website}</a>
            </Text>
          </CardBody>
        </Card>
      )}
    </>
  );
};
