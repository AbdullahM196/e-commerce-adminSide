import { apiSlice } from "../apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const userAdapter = createEntityAdapter({
  selectId: (user) => user._id,
});
const initialState = userAdapter.getInitialState({});
export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCustomer: builder.query({
      query: () => "/user/getAllUsers",
      transformResponse: (res) => {
        return userAdapter.upsertMany(initialState, res.users);
      },
      providesTags: ["users"],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/admin/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/admin/logout",
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
    getAdmin: builder.query({
      query: () => "/admin/getAdmin",
      transformResponse: (res) => {
        return res;
      },
      providesTags: ["user"],
    }),
    getUsersData: builder.query({
      query: () => "/user/userData",
      transformResponse: (res) => {
        return res;
      },
      providesTags: ["userData"],
    }),
    getUserOrders: builder.query({
      query: (id) => `/user/getOrderByUser/${id}`,
      transformResponse: (res) => {
        return res;
      },
      providesTags: ["userOrders"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/deleteUser/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: "users", id: arg.id }];
      },
    }),
  }),
});

export const {
  useGetAllCustomerQuery,
  useLoginMutation,
  useLogoutMutation,
  useGetAdminQuery,
  useGetUsersDataQuery,
  useGetUserOrdersQuery,
  useDeleteUserMutation,
} = userSlice;
const selectUserResults = userSlice.endpoints.getAllCustomer.select();

const selectUserData = createSelector(
  selectUserResults,
  (userResults) => userResults.data // normalized state object with ids & entities
);
export const {
  selectAll: SelectAllUsers,
  selectById: SelectUserById,
  selectIds: SelectUserIds,
} = userAdapter.getSelectors((state) => selectUserData(state) ?? initialState);
