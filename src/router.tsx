import { Outlet, createBrowserRouter } from "react-router-dom";

import App from "./pages/App";
import Admin from "./pages/Admin";
import Invitation from "./pages/Invitation";
import Confirm from "./pages/Confirm";

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
