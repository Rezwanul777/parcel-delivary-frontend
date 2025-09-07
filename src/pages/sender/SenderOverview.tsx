import { Card, CardContent } from "@/components/ui/card";
import { useGetMyParcelsQuery } from "@/redux/features/parcel/parcel.api";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router";




const SenderOverview = () => {
  const { data: parcelData, isLoading: IsParcelLoading } = useGetMyParcelsQuery(undefined);

  const allParcels = parcelData?.data?.length || 0;


  if (IsParcelLoading ) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="p-6">
          <Skeleton className="h-6 w-24 mb-4" />
          <Skeleton className="h-10 w-16" />
        </Card>
        <Card className="p-6">
          <Skeleton className="h-6 w-24 mb-4" />
          <Skeleton className="h-10 w-16" />
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl py-10 px-4">
      <h1 className="text-3xl font-semibold mb-6">
        📊 Sender Overview
      </h1>

      <div className="max-w-sm gap-4">
        {/* Parcels */}
        <Link to="/sender/created-parcels">
          <Card className="p-6 text-center hover:bg-gray-600 transition-colors">
            <CardContent>
              <p className="text-sm text-gray-900 hover:text-white">Total Parcels</p>
              <p className="text-3xl font-bold text-primary mt-2">
                {allParcels}
              </p>
            </CardContent>
          </Card>
        </Link>

      </div>
    </div>
  );
};

export default SenderOverview;