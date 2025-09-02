import App from "@/App";

import { role } from "@/constants/role";

import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import type { TRole } from "@/types";

import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { senderSidebarItems } from "./senderSidebarItems";
import { receiverSidebarItems } from "./receiverSidebarItems";
import TrackParcel from "@/pages/TrackParcel";
import Homepage from "@/pages/HomePage";
import { withAuth } from "@/utils/withAuth";
import DashboardLayout from "@/components/layout/DashboardLayour";
import { generateRoutes } from "@/utils/generateRoutes";

export const router = createBrowserRouter([
    {
        path:"/",
        Component: App,
        children:[
            {
                Component: Homepage,
                index: true
            },
            {
                path:"/track-parcel",
                Component: TrackParcel

            },
        ]
    },
 
    {
        path:"/login",
        Component: LoginPage

    },
    {
        path:"/register",
        Component: RegisterPage

    },
    {
        Component: withAuth(DashboardLayout,role.admin as TRole),
        path: "/admin",
        children:[
            {
                index: true,
                element: <Navigate to="/admin/analytics"/>
            },
            ...generateRoutes(adminSidebarItems)
        ]
    },
    {
        Component: withAuth(DashboardLayout,role.sender as TRole),
        path: "/sender",
        children:[
            {
                index: true,
                element: <Navigate to="/sender/parcel"/>
            },
            ...generateRoutes(senderSidebarItems)
        ]
    },
    {
        Component: withAuth(DashboardLayout,role.receiver as TRole),
        path: "/receiver",
        children:[
            {
                index: true,
                element: <Navigate to="/receiver/parcel"/>
            },
            ...generateRoutes(receiverSidebarItems)
        ]
    },
])