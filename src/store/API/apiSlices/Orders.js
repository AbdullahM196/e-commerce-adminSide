import { apiSlice } from "../apiSlice";
import { createSelector } from "@reduxjs/toolkit";
export const OrderSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => "/order/getAllOrders",
      providesTags: ["Orders"],
    }),
    changeOrderStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/order/changeStatus/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Orders"],
      transformResponse: (res) => {
        return res;
      },
    }),
    orderStatistics: builder.query({
      query: () => "/order/orderStatistics",
      providesTags: ["OrdersStatics"],
      transformResponse: (res) => {
        return res;
      },
    }),
    mostActiveCustomer: builder.query({
      query: () => "/order/mostActiveUser",
      transformResponse: (res) => {
        return res;
      },
    }),
    mostSoldProducts: builder.query({
      query: () => "/order/mostSold",
    }),
    mostSoldCategory: builder.query({
      query: () => "/order/mostSoldCategory",
    }),
  }),
});

const allOrders = OrderSlice.endpoints.getAllOrders.select();
export const selectOrderData = createSelector(
  allOrders,
  (ordersResult) => ordersResult.data
);
const orderStatics = OrderSlice.endpoints.orderStatistics.select();
export const selectOrderStatics = createSelector(
  orderStatics,
  (order) => order.data
);

export const {
  useGetAllOrdersQuery,
  useChangeOrderStatusMutation,
  useOrderStatisticsQuery,
  useMostActiveCustomerQuery,
  useMostSoldProductsQuery,
  useMostSoldCategoryQuery,
} = OrderSlice;
