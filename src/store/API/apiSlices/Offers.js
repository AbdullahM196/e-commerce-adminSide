import { apiSlice } from "../apiSlice";

export const OffersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOffers: builder.query({
      query: () => `/mainPage/getAllOffers`,
      providesTags: ["offers"],
      transformResponse: (data) => {
        return data;
      },
    }),
    updateOffers: builder.mutation({
      query: (data) => {
        return {
          url: `/mainPage/updateOffer/${data.get("_id")}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["offers"],
    }),
    addOffers: builder.mutation({
      query: (data) => {
        return { url: "/mainPage/add", method: "POST", body: data };
      },
      invalidatesTags: ["offers"],
    }),
    deleteOffer: builder.mutation({
      query: (id) => ({
        url: `/mainPage/deleteOffer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["offers"],
    }),
  }),
});

export const {
  useGetOffersQuery,
  useUpdateOffersMutation,
  useAddOffersMutation,
  useDeleteOfferMutation,
} = OffersSlice;
