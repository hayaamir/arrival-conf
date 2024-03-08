import { Outlet, createBrowserRouter } from "react-router-dom";

import App from "./App";
import Admin from "./admin";
import Invitation from "./invitation";
import Confirm from "./confirm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Outlet />
      </div>
    ),
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/Invitation",
        element: <Invitation />,
      },
      {
        path: "/Admin",
        element: <Admin />,
      },
      {
        path: "/Confirm",
        element: <Confirm />,
      },
    ],
  },
]);
