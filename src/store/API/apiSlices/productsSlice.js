/* eslint-disable no-unused-vars */
import { apiSlice } from "../apiSlice";

export const productsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllProducts: builder.query({
        query: (page) => `/product/getAll?page=${page}`,
        transformResponse: (res) => {
          return res.allProducts;
        },
        providesTags: (result, error) => {
          return [
            { type: "Products", id: "LIST" },
            ...(result
              ? result.map((item) => ({ type: "Products", id: item._id }))
              : []),
          ];
        },
      }),
      getAllPages: builder.query({
        query: () => `/product/getAll`,
        transformResponse: (res) => {
          return Math.ceil(res.allPages);
        },
        providesTags: ["AllPages"],
      }),
      addProduct: builder.mutation({
        query: (product) => ({
          url: "product/add",
          method: "POST",
          body: product,
          prepareHeaders: (headers) => {
            headers.set("Content-Type", "multipart/form-data");
            return headers;
          },
        }),
        transformResponse: (res) => {
          return res;
        },
        invalidatesTags: ["Products"],
      }),
      updateProduct: builder.mutation({
        query: (product) => {
          return {
            url: `product/update/${product.get("_id")}`,
            method: "PUT",
            body: product,
            prepareHeaders: (headers) => {
              headers.set("Content-Type", "multipart/form-data");
              return headers;
            },
          };
        },
        transformResponse: (res) => {
          return res;
        },
        invalidatesTags: (result, error, arg) => [
          { type: "Products", id: arg._id },
        ],
      }),
      deleteProduct: builder.mutation({
        query: (id) => ({
          url: `product/delete/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, arg) => {
          return [{ type: "Products", id: arg._id }];
        },
      }),
    };
  },
});

export const {
  useGetAllProductsQuery,
  useGetAllPagesQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsSlice;
