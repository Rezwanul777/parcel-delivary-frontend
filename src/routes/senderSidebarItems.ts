import type { ISidebarItems } from "@/types";
import { lazy } from "react";


const SenderOverview = lazy( ()=> import('@/pages/sender/SenderOverview')) ;
const CreatedParcels = lazy( ()=> import('@/pages/sender/CreatedParcels')) ;

export const SenderSidebarItems : ISidebarItems[] = [
  {
    title: "Sender Dashboard Menu",
    items: [
      {
        title: "Overview",
        url: "/sender/sender-overview",
        component : SenderOverview,
      },
      {
        title: "All Created parcels",
        url: "/sender/created-parcels",
        component : CreatedParcels,
      },
    ],
  },

];