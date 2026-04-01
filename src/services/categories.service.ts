import apiSlice from "./api";

export const categoriesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		categories: builder.query({
			query: () => {
				return {
					url: `/categories/`,
					method: "GET",
				};
			},
		}),
	}),
});

export const { useCategoriesQuery } = categoriesApiSlice;
