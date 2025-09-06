/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useLazyTrackParcelByTidQuery } from "@/redux/features/parcel/parcel.api"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// const TrackParcel = () => {
//   const [trackingId, setTrackingId] = useState("")
//   const [trigger, { data, isFetching, isError }] = useLazyTrackParcelByTidQuery()

//   const handleTrack = () => {
//     if (!trackingId) return
//     trigger(trackingId) // call API
//   }

//   return (
//     <div className="flex justify-center">
//       <div className="w-full max-w-md rounded-2xl border p-6 shadow-sm my-6 ">
//         <h1 className="mb-4 text-center text-2xl font-semibold text-gray-100">
//           Track Your Parcel
//         </h1>
//         <div className="flex gap-2 mb-4">
//           <Input
//             placeholder="Enter Tracking ID"
//             value={trackingId}
//             onChange={(e) => setTrackingId(e.target.value)}
//           />
//           <Button onClick={handleTrack} disabled={isFetching}>
//             {isFetching ? "Tracking..." : "Track"}
//           </Button>
//         </div>

//         {/* Error */}
//         {isError && (
//           <p className="text-center text-red-500">❌ Parcel not found</p>
//         )}

//         {/* Parcel Details */}
//         {data?.data && (
//           <div className="space-y-3">
//             <h2 className="text-lg font-medium text-gray-100">Parcel Staus:</h2>
//             <ul className="space-y-2">
//               {data.data.map((log: any, index: number) => (
//                 <li
//                   key={index}
//                   className="rounded-lg border  p-3 text-sm"
//                 >
//                   <p>
//                     <span className="font-semibold">Status:</span> {log.status}
//                   </p>
//                   <p>
//                     <span className="font-semibold">Updated At:</span>{" "}
//                     {new Date(log.timestamp).toLocaleString()}
//                   </p>
//                   {log.note && (
//                     <p>
//                       <span className="font-semibold">Note:</span> {log.note}
//                     </p>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState("");
  const [trigger, { data, isFetching, error, isUninitialized }] =
    useLazyTrackParcelByTidQuery();
  // const router = useRouter();

  const handleTrack = () => {
    if (!trackingId) return;
    trigger(trackingId);
  };

const renderError = () => {
  if (!error) return null;

  // Narrow: check if it's a FetchBaseQueryError
  const fetchError = error as FetchBaseQueryError & {
    data?: { message?: string };
  };

  if (fetchError.status) {
    const status = fetchError.status as number;
    const serverMsg = fetchError.data?.message;

    const msg =
      serverMsg ??
      (status === 401
        ? "You have to login first"
        : status === 403
        ? "Unauthorized access to parcel history"
        : status === 404
        ? "Parcel not found"
        : "Something went wrong");

    return <p className="text-center text-red-500">❌ {msg}</p>;
  }

  return <p className="text-center text-red-500">❌ Network error</p>;
};
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md rounded-2xl border p-6 shadow-sm my-6 ">
        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-100">
          Track Your Parcel
        </h1>

        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Enter Tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />
          <Button onClick={handleTrack} disabled={isFetching}>
            {isFetching ? "Tracking..." : "Track"}
          </Button>
        </div>

        {/* Error */}
        {renderError()}

        {/* Parcel Details */}
        {data?.data && (
          <div className="space-y-3">
            <h2 className="text-lg font-medium text-gray-100">Parcel Status:</h2>
            <ul className="space-y-2">
              {data.data.map((log: any, index: number) => (
                <li key={index} className="rounded-lg border p-3 text-sm">
                  <p>
                    <span className="font-semibold">Status:</span> {log.status}
                  </p>
                  <p>
                    <span className="font-semibold">Updated At:</span>{" "}
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                  {log.note && (
                    <p>
                      <span className="font-semibold">Note:</span> {log.note}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Optional: show nothing before first search */}
        {isUninitialized && null}
      </div>
    </div>
  );
};

export default TrackParcel