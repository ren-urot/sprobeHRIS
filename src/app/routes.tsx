import { createBrowserRouter } from "react-router";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Employees } from "./pages/Employees";
import { ProbationTracking } from "./pages/ProbationTracking";
import { TimeOff } from "./pages/TimeOff";
import { CalendarPage } from "./pages/CalendarPage";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/employees",
        element: <Employees />,
      },
      {
        path: "/probation",
        element: <ProbationTracking />,
      },
      {
        path: "/time-off",
        element: <TimeOff />,
      },
      {
        path: "/calendar",
        element: <CalendarPage />,
      },
    ],
  },
]);