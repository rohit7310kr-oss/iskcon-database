import React from "react";
import { createBrowserRouter, Router, RouterProvider } from "react-router";
import Layout from "../features/app/layout/Layout";
import Dashboard from "../features/app/dashboard/Dashboard";
import AddNewDevotee from "../features/app/addNewDevotee/AddNewDevotee";
import ViewDevotee from "../features/app/viewDevotee/ViewDevotee";

import Login from "../features/auth/login/Login";
import Register from "../features/auth/register/Register";
import UserProvider from "../features/context/userContext";
import Courses from "./../features/app/courses/Courses";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserProvider />,
      children: [
        {
          path: "auth",
          children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
          ],
        },
        {
          path: "app",
          element: <Layout />,
          children: [
            { index: true, element: <Dashboard /> },
            { path: "addNewDevotee", element: <AddNewDevotee /> },
            { path: "courses", element: <Courses /> },

            { path: "devotees", element: <ViewDevotee /> },
            // { path: "connectedDevotee", element: <ConnectedDevotee /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
