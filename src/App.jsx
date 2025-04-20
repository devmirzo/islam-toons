import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, NotPage, Register, User } from "./pages";
import MainLayouts from "./layouts/MainLayout";
import { DashboardLayout } from "./components";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <DashboardLayout></DashboardLayout>,
      children: [
        { index: true, element: <DashboardLayout /> },
        { path: "/user", element: <User /> },
      ],
    },
    { path: "/Login", element: <Login /> },
    { path: "/Register", element: <Register /> },
    { path: "/Notpage", element: <NotPage /> },
  ]);
  return <RouterProvider router={routes} />;
};

export default App;
