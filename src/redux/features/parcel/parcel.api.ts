import { baseApi } from "@/redux/baseApi";

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createParcel: builder.mutation({
      query: (createParcel) => ({
        url: "/parcel/create",
        method: "POST",
        data: createParcel,
      }),
      invalidatesTags: ["PARCEL"],
    }),

    getMyParcels: builder.query({
      query: () => ({
        url: "/parcel/my-parcels",
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),

    getIncomingParcels: builder.query({
      query: () => ({
        url: "/parcel/incoming",
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),

    getDeliveredParcels: builder.query({
      query: (status: string = "Delivered") => ({
        url: `/parcel/my-parcels?status=${status}`,
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),

    cancelParcel: builder.mutation({
      query: ({ id }) => ({
        url: `/parcel/cancel/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    confirmParcel: builder.mutation({
      query: ({ id }) => ({
        url: `/parcel/confirm/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    getAllParcels: builder.query({
      query: () => ({
        url: "/parcel",
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),

    blockParcel: builder.mutation({
      query: ({ id }) => ({
        url: `/parcel/block/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    unBlockParcel: builder.mutation({
      query: ({ id }) => ({
        url: `/parcel/unblock/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    trackParcelByTid: builder.query({
      query: (id: string) => ({
        url: `/parcel/track/${id}`,
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),



updateParcelStatus: builder.mutation({
  query: ({ id, status }) => ({
    url: `/parcel/status/${id}`,
    method: "PATCH",
    body: { currentStatus: status },
  }),
  invalidatesTags: ["PARCEL"],
}),



  }),
});

export const {
  useCreateParcelMutation,
  useGetMyParcelsQuery,
  useCancelParcelMutation,
  useGetIncomingParcelsQuery,
  useConfirmParcelMutation,
  useGetDeliveredParcelsQuery,
  useGetAllParcelsQuery,
  useBlockParcelMutation,
  useUnBlockParcelMutation,
  useLazyTrackParcelByTidQuery,
  useUpdateParcelStatusMutation
} = parcelApi;