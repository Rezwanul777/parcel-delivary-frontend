import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),

    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["USER"],
    }),

    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

   

    blockUser: builder.mutation({
      query: (id: string) => ({
        url: `/user/block/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),


    unblockUser: builder.mutation({
      query: (id: string) => ({
        url: `/user/unblock/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),



  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useUserInfoQuery,
  useLogoutMutation,
  useGetAllUsersQuery,
  // useToggleBlockUserMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
} = authApi;