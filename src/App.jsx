import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, NotPage, Register, User } from "./pages";
import { DashboardLayout } from "./components";
import PlaylistPage from "./pages/PlaylistPage";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <DashboardLayout></DashboardLayout>,
      children: [
        { index: true, element: <DashboardLayout /> },
        { path: "/user", element: <User /> },
        { path: "/playlist/:id", element: <PlaylistPage /> },
      ],
    },
    { path: "/Login", element: <Login /> },
    { path: "/Register", element: <Register /> },
    { path: "/Notpage", element: <NotPage /> },
  ]);
  return <RouterProvider router={routes} />;
};

export default App;
