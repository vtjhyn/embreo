import { createBrowserRouter } from "react-router-dom";
import LayoutView from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddEvent from "./pages/AddEvent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutView />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/addevent",
        element: <AddEvent />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/*",
    element: <div>NOT FOUND</div>,
  },
]);

export default router;
