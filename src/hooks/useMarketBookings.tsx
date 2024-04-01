import { useState } from "react";

export const useMarketBookings = (
  marketIds?: Set<String>,
  stallIds: Set<String>
) => {
  const userId = "testing";
  const [loading, setLoading] = useState(true);

  const bookings = useMemo(
    () =>
      marketIds == null
        ? []
        : bookingList.filter(
            (b) =>
              (marketIds.has(b.marketId) && stallIds === null) ||
              stallIds?.includes(b.stallId)
          ),
    [bookingList, stallIds, marketIds, loadingIds]
  );
};
