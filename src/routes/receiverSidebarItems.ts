import type { ISidebarItems } from "@/types";
import { lazy } from "react";


const IncomingParcels = lazy( ()=> import('@/pages/receiver/IncomingParcels')) ;
const ViewDeliveryHistory = lazy( ()=> import('@/pages/receiver/ViewDeliveryHistory')) ;
const ReceiverOverview = lazy( ()=> import('@/pages/receiver/ReceiverOverview')) ;

export const ReceiverSidebarItems : ISidebarItems[] = [
  {
    title: "Receiver Dashboard Menu",
    items: [
      {
        title: "Overview",
        url: "/receiver/receiver-overview",
        component : ReceiverOverview,
      },
      {
        title: "Incoming parcels",
        url: "/receiver/incoming-parcels",
        component : IncomingParcels,
      },
      {
        title: "Received parcels",
        url: "/receiver/delivered-parcels",
        component : ViewDeliveryHistory,
      },
    ],
  },

];