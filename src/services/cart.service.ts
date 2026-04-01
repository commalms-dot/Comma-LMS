import { CartListItem } from "@/features/Cart/types/CartItem";
import apiSlice from "./api";

interface CartResponse {
	totalPrice: number;
	message: string;
	items: CartListItem[];
}

export const cartApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUserCart: builder.query<CartResponse, void>({
			query: () => ({
				url: `/cart`,
				method: "GET",
			}),
			providesTags: ["cart"],
		}),
		addToCart: builder.mutation<void, { id: number }>({
			query: (body) => ({
				url: `/cart/${body.id}`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["cart"],
		}),
		removeFromCart: builder.mutation<void, { id: number }>({
			query: (body) => ({
				url: `/cart/${body.id}`,
				method: "DELETE",
				body,
			}),
			invalidatesTags: ["cart"],
		}),
	}),
});
export const { useGetUserCartQuery, useAddToCartMutation, useRemoveFromCartMutation } =
	cartApiSlice;

