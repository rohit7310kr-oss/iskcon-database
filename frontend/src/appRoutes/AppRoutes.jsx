import React from "react";
import { createBrowserRouter, Router, RouterProvider } from "react-router";
import Layout from "../features/layout/Layout";
import AddNewDevotee from "../features/addNewDevotee/AddNewDevotee";
import ViewDevotee from "../features/viewDevotee/ViewDevotee";
import Dashboard from "../features/dashboard/Dashboard";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "newDevotee", element: <AddNewDevotee /> },
        { path: "viewDevotee", element: <ViewDevotee /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
