import App from "@/App";

import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import type { TRole } from "@/types";
import { createBrowserRouter, Navigate } from "react-router";

import { AdminSidebarItems } from "./AdminSidebarItems";

import { role } from "@/constants/role";
import { SenderSidebarItems } from "./SenderSidebarItems";
import { ReceiverSidebarItems } from "./ReceiverSidebarItems";
import UnAuthorized from "@/pages/UnAuthorized";
import TrackParcel from "@/pages/TrackParcel";
import { withAuth } from "@/utils/withAuth";
import DashboardLayout from "@/components/layout/DashboardLayour";
import { generateRoutes } from "@/utils/generateRoutes";



export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "track-parcel",
        Component: TrackParcel,
      },
    ],
  },

  // admin routes
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin",
    children: [
      {
        path: "",
        // index : true,
        element: <Navigate to="/admin/overview" />,
      },
      ...generateRoutes(AdminSidebarItems),
    ],
  },


  // sender routes
  {
    Component: withAuth(DashboardLayout, role.sender as TRole),
    path: "/sender",
    children: [
      {
        path: "",
        // index : true,
        element: <Navigate to="/sender/sender-overview" />,
      },
      ...generateRoutes(SenderSidebarItems),
    ],
  },


  // receiver routes
  {
    Component: withAuth(DashboardLayout, role.receiver as TRole),
    path: "/receiver",
    children: [
      {
        path: "",
        // index : true,
        element: <Navigate to="/receiver/receiver-overview" />,
      },
      ...generateRoutes(ReceiverSidebarItems),
    ],
  },





  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: UnAuthorized,
    path: "/unauthorized",
  },
]);