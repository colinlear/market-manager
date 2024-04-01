import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "./routes/Home.tsx";
import { ManageRoute } from "./routes/Manage.tsx";
import { StallHolderSummary } from "./routes/stallholder/StallHolder.tsx";
import { StallForm } from "./stall/StallForm.tsx";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/manage",
    element: <ManageRoute />,
    children: [
      {
        path: "",
        element: <StallHolderSummary />,
      },
      {
        path: "markets",
        element: (
          <StallForm
            onChange={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
