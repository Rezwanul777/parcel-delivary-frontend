/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  useBlockParcelMutation,
  useGetAllParcelsQuery,
  useUnBlockParcelMutation,
} from "@/redux/features/parcel/parcel.api";

import Pagination from "@/components/Pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IParcelItem } from "@/types/paercel.interface";
import SkeletonTable from "@/components/modules/provider/SkeletonTable";


// All possible statuses
const STATUS_OPTIONS = [
  "Requested",
  "Approved",
  "Dispatched",
  "In Transit",
  "Delivered",
  "Cancelled",
  "Returned",
];

const AllParcels = () => {
  const { data, isLoading } = useGetAllParcelsQuery(undefined);
  const [blockParcel] = useBlockParcelMutation();
  const [unblockParcel] = useUnBlockParcelMutation();

  // --- PAGINATION ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = data?.data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const parcels = data?.data?.slice(startIndex, endIndex) || [];

  // --- Block/Unblock toggle ---
  const handleToggle = async (parcel: IParcelItem) => {
    const action = parcel.isBlocked ? "unblock" : "block";
    const confirmed = window.confirm(
      `Are you sure you want to ${action} parcel ${parcel.trackingId}?`
    );
    if (!confirmed) return;

    try {
      if (parcel.isBlocked) {
        await unblockParcel({ id: parcel._id }).unwrap();
        toast.success(`Parcel ${parcel.trackingId} has been unblocked.`);
      } else {
        await blockParcel({ id: parcel._id }).unwrap();
        toast.success(`Parcel ${parcel.trackingId} has been blocked.`);
      }
    } catch (err: any) {
      console.error(`${action} failed:`, err);
      toast.error(err?.data?.message || "Something went wrong.");
    }
  };

  // --- Direct fetch to update parcel status ---
  const updateParcelStatusDirectly = async (parcelId: string, status: string) => {
    try {
      const response = await fetch(
        `https://parcel-delivery-backend-rho.vercel.app/api/v1/parcel/status/${parcelId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ currentStatus: status }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(`Status updated to ${status}`);
        location.reload() ;
        return result.data; // Updated parcel
      } else {
        toast.error(result.message || "Failed to update status");
        console.error("Error:", result);
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
      console.error(err);
    }
  };

  if( isLoading ) {
    return <SkeletonTable/>
  }

  return (
    <div className="mt-8 border border-slate-400 rounded-lg shadow">
      <h1 className="text-center py-4 text-xl font-semibold">
        All Parcels ({parcels.length})
      </h1>

      
      <Table>
        <TableHeader className="bg-slate-400 text-white">
          <TableRow>
            <TableHead>Tracking ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Update Status</TableHead>
            <TableHead>isBlocked</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {parcels.map((parcel: IParcelItem) => (
            <TableRow key={parcel._id}>
              <TableCell>{parcel.trackingId}</TableCell>
              <TableCell>{parcel.type}</TableCell>
              <TableCell>{parcel.weight} kg</TableCell>
              <TableCell>{parcel.fee} ৳</TableCell>

              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    parcel.currentStatus === "Requested"
                      ? "bg-yellow-200 text-yellow-800"
                      : parcel.currentStatus === "Delivered"
                      ? "bg-green-200 text-green-800"
                      : parcel.currentStatus === "Cancelled"
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {parcel.currentStatus}
                </span>
              </TableCell>

              <TableCell>
                <Select
                  onValueChange={async (value) => {
                    await updateParcelStatusDirectly(parcel._id, value);
                  }}
                  defaultValue={parcel.currentStatus}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Update status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>

              <TableCell>
                {parcel.isBlocked ? (
                  <span className="text-red-600 font-medium">Yes</span>
                ) : (
                  <span className="text-green-600 font-medium">No</span>
                )}
              </TableCell>

              <TableCell>
                <Switch
                  checked={!parcel.isBlocked}
                  onCheckedChange={() => handleToggle(parcel)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AllParcels;