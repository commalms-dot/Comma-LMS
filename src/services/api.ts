import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import ROUTES from "@/constants/routes";

// List of authentication-related endpoints
const authEndpoints = [
	ROUTES.SIGNIN,
	ROUTES.SIGNUP,
	ROUTES.FORGOT_PASSWORD,
	ROUTES.NEW_PASSWORD,
	ROUTES.VERIFICATION_CODE,
];

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers, { getState, endpoint }) => {
			const token = (getState() as RootState).auth.token;

			// Check if the endpoint is one of the auth routes
			const isAuthEndpoint = authEndpoints.some((authRoute) =>
				endpoint.includes(authRoute)
			);

			// Do not include token for auth endpoints
			if (!isAuthEndpoint && token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	tagTypes: [
		"Auth",
		"Courses",
		"CourseReview",
		"Instructors",
		"CourseReviewSummary",
		"Notes",
		"cart",
		"Questions",
		"Replies", 
		"Payment"
	],
	endpoints: (builder) => ({}),
});

export default apiSlice;
