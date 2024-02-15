import { apiSlice } from "../apiSlice";
export const categorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => "/category/",
      providesTags: ["category"],
    }),
    getCategory: builder.query({
      query: (id) => `/category/${id}`,
      providesTags: ["singleCategory"],
    }),
    addNewCategory: builder.mutation({
      query: (category) => ({
        url: "/category/add",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["category"],
    }),
    editCategory: builder.mutation({
      query: ({ id, name }) => ({
        url: `/category/update/${id}`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: ["category"],
    }),
  }),
});
export const {
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useAddNewCategoryMutation,
  useEditCategoryMutation,
} = categorySlice;
