import apiSlice from "./api";

const buildQueryString = (
	type: string,
	category: string,
	limit: number
): string => {
	let queryString = "";
	const params: string[] = [];

	if (type) params.push(`type=${encodeURIComponent(type)}`);
	if (category) params.push(`category=${encodeURIComponent(category)}`);
	if (limit) params.push(`limit=${encodeURIComponent(limit.toString())}`);

	if (params.length > 0) {
		queryString = `?${params.join("&")}`;
	}

	return queryString;
};

export const courseApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		courses: builder.query({
			query: (body) => {
				return {
					url: `/courses${buildQueryString(body.type, body.category, body.limit)}`,
					method: "GET",
				};
			},
		}),
		course: builder.query({
			query: (body) => {
				return {
					url: `/courses/${body.id}`,
					method: "GET",
				};
			},
		}),
		enrolledCourses: builder.query({
			query: () => `users/me/enrolled-courses`,
		}),
		viewedCourses: builder.query({
			query: () => `users/me/viewed-courses`,
		}),
		viewCourse: builder.mutation({
			query: (courseId) => ({
				url: `users/me/viewed-courses/${courseId}`,
				method: "POST",
			}),
		}),
		checkEnrollment: builder.query({
			query: ({ courseId }) => `users/me/enrolled-courses/${courseId}/check`,
		}),
	}),
});

export const {
	useCoursesQuery,
	useCourseQuery,
	useCheckEnrollmentQuery,
	useViewedCoursesQuery,
	useViewCourseMutation,
	useEnrolledCoursesQuery,
} = courseApiSlice;

