import { apiSlice } from "../apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const subCategoryAdapter = createEntityAdapter({
  selectId: (subCat) => subCat._id,
});
const initialState = subCategoryAdapter.getInitialState({});

export const subCategorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubCategories: builder.query({
      query: () => `/subCategory/`,
      transformResponse: (res) => {
        return subCategoryAdapter.setAll(initialState, res);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.ids.map(({ _id }) => ({
                type: "subCategory",
                id: _id,
              })),
              { type: "subCategory", id: "LIST" },
            ]
          : [{ type: "subCategory", id: "LIST" }],
    }),
    // getSubCategory: builder.query({
    //   query: (id) => `/subCategory/${id}`,
    //   providesTags: ["subCategory"],
    // }),
    addSubCategory: builder.mutation({
      query: (subCategory) => ({
        url: "/subCategory/add",
        method: "POST",
        body: subCategory,
        prepareHeadrs: (headrs) => {
          headrs.set("Content-Type", "multipart/form-data");
          return headrs;
        },
      }),
      invalidatesTags: ["subCategory", "category"],
    }),
    editSubCategory: builder.mutation({
      query: (subCategory) => {
        return {
          url: `/subCategory/update/${subCategory.get("id")}`,
          method: "PATCH",
          body: subCategory,
          prepareHeadrs: (headrs) => {
            headrs.set("Content-Type", "multipart/form-data");
            return headrs;
          },
        };
      },
      invalidatesTags: ["subCategory", "category"],
    }),
  }),
});

export const {
  useGetAllSubCategoriesQuery,
  useAddSubCategoryMutation,
  useEditSubCategoryMutation,
} = subCategorySlice;

const selectSubCategoryResults =
  subCategorySlice.endpoints.getAllSubCategories.select();

const allSubCat = createSelector(
  selectSubCategoryResults,
  (subCategoryResult) => subCategoryResult.data
);
export const {
  selectAll: selectAllSubCategory,
  selectById: selectSubCategoryById,
  selectIds: selectSubCategoryIds,
} = subCategoryAdapter.getSelectors(
  (state) => allSubCat(state) ?? initialState
);
