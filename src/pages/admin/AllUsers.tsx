/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useBlockUserMutation, useGetAllUsersQuery, useUnblockUserMutation } from "@/redux/features/auth/auth.api";
import type { IUser } from "@/types/user.interface";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import Pagination from "@/components/Pagination";
import SkeletonTable from "@/components/modules/provider/SkeletonTable";


const AllUsers = () => {
  const { data, isLoading } = useGetAllUsersQuery(undefined); // get all users from backend
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();

  // --- PAGINATION ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalItems = data?.data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = data?.data?.slice(startIndex, endIndex) || [];


  const handleToggle = async (user: IUser) => {
    const action = user.isBlocked ? "unblock" : "block";
    const confirmed = window.confirm(`Are you sure you want to ${action} ${user.email}?`);
    if (!confirmed) return;

    try {
      if (user.isBlocked) {
        await unblockUser(user._id!).unwrap();
        toast.success(`${user.email} has been unblocked successfully.`);
      } else {
        await blockUser(user._id!).unwrap();
        toast.success(`${user.email} has been blocked successfully.`);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong.");
    }
  };


  if (isLoading) {
    return <SkeletonTable/>
  }


  return (
    <div className="mt-8 border border-slate-400 rounded-lg shadow">
      <h1 className="text-center py-4 text-xl font-semibold">
        All Users ({totalItems})
      </h1>

      <Table>
        <TableHeader className="bg-slate-800 text-white">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Blocked?</TableHead>
            <TableHead>User Status</TableHead>
            <TableHead>Joined on</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentUsers.map((user: IUser) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    user.role === "admin"
                      ? "bg-purple-200 text-purple-800"
                      : user.role === "sender"
                      ? "bg-blue-200 text-blue-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {user.role}
                </span>
              </TableCell>
              <TableCell>
                {user.isBlocked ? (
                  <span className="px-2 py-1 rounded  text-red-600">Yes</span>
                ) : (
                  <span className="px-2 py-1 rounded  text-green-600">No</span>
                )}
              </TableCell>

              <TableCell className="flex gap-2 items-center">
                {user.role !== "admin" ? (
                  <>
                    {user?.isBlocked ? <span>unblock</span> : <span>block</span>}
                    <Switch
                      checked={!user.isBlocked}
                      onCheckedChange={() => handleToggle(user)}
                    />
                  </>
                ) : (
                  <p className="text-sm text-gray-500">Admin cannot be blocked</p>
                )}
              </TableCell>

              <TableCell>
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
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

export default AllUsers;