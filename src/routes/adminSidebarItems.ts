import AdminOverview from "@/pages/admin/AdminOverview";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";

const AllUsers = lazy( ()=> import('@/pages/admin/AllUsers')) ;
const AllParcels = lazy( ()=> import('@/pages/admin/AllParcels')) ;

export const AdminSidebarItems : ISidebarItems[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Overview",
        url: "/admin/overview",
        component : AdminOverview,
      },
      {
        title: "All Users",
        url: "/admin/all-users",
        component : AllUsers,
      },
      {
        title: "All Parcels",
        url: "/admin/all-parcels",
        component : AllParcels,
      },
    ],
  },
]