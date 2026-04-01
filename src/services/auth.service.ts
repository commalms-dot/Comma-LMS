import apiSlice from "./api";

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		signup: builder.mutation({
			query: (body) => {
				return {
					url: "/auth/register",
					method: "POST",
					body,
				};
			},
			invalidatesTags: ["Auth"],
		}),
		login: builder.mutation({
			query: (body) => {
				return {
					url: "/auth/login",
					method: "POST",
					body,
				};
			},
			invalidatesTags: ["Auth"],
		}),
		updateUser: builder.mutation({
			query: ({ id, body }) => ({
				url: `/users/${id}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Auth"],
		}),
		forgotPassword: builder.mutation({
			query: (email) => ({
				url: "/auth/forgot-password",
				method: "POST",
				body: { email },
			}),
		}),
		verifyResetPasswordOtp: builder.mutation({
			query: ({ email, otp }) => ({
				url: "/auth/verify-reset-otp",
				method: "POST",
				body: { email, otp },
			}),
		}),
		resetPassword: builder.mutation({
			query: ({ email, newPassword }) => ({
				url: "/auth/reset-password",
				method: "POST",
				body: { email, newPassword },
			}),
		}),
		changeEmail: builder.mutation({
			query: ({ id, newEmail }) => ({
				url: `/users/${id}/email`,
				method: "PATCH",
				body: { newEmail },
			}),
			invalidatesTags: ["Auth"],
		}),
		changePassword: builder.mutation({
			query: ({ currentPassword, newPassword, id }) => ({
				url: `/users/${id}/change-password`,
				method: "PATCH",
				body: { currentPassword, newPassword },
			}),
			invalidatesTags: ["Auth"],
		}),
	}),
});

export const {
	useLoginMutation,
	useSignupMutation,
	useForgotPasswordMutation,
	useVerifyResetPasswordOtpMutation,
	useResetPasswordMutation,
	useUpdateUserMutation,
	useChangeEmailMutation,
	useChangePasswordMutation
} = authApiSlice;
