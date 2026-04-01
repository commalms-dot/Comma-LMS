import apiSlice from "./api";

interface CreatePaymentTokenRequest {
	userId: number;
	firstName: string;
	lastName: string;
	paymentMethod: string;
	phoneNumber: string;
	email: string;
}

interface PaymentTokenResponse {
	paymentToken: string;
}

export const paymentApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createPaymentToken: builder.mutation<
			PaymentTokenResponse,
			CreatePaymentTokenRequest
		>({
			query: (body) => ({
				url: `/payment/payment-token`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["Payment"],
		}),
		handlePaymentWebhook: builder.mutation<void, any>({
			query: (body) => ({
				url: `/payment/webhook`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["Payment"],
		}),
	}),
});

export const {
	useCreatePaymentTokenMutation,
	useHandlePaymentWebhookMutation,
} = paymentApiSlice;

