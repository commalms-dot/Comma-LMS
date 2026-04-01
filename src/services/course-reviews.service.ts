import apiSlice from "./api";
import {
	CourseReview,
	ReviewSummary,
	CreateCourseReviewDto,
} from "@/types/Review";
import { PaginatedResponse } from "@/types/common";

export const courseReviewApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
    createReview: builder.mutation<CourseReview, { courseId: string; review: CreateCourseReviewDto }>({
      query: ({ courseId, review }) => ({
        url: `/courses/${courseId}/reviews`,
        method: 'POST',
        body: review,
      }),
      invalidatesTags: ['CourseReview'],
    }),
    getReviews: builder.query<PaginatedResponse<CourseReview>, { courseId: string; page: number; limit: number }>({
      query: ({ courseId, page, limit }) => ({
        url: `/courses/${courseId}/reviews`,
        params: { page, limit },
      }),
      providesTags: ['CourseReview'],
    }),
		getReviewSummary: builder.query<ReviewSummary, { courseId: string }>({
			query: ({ courseId }) => ({
				url: `/courses/${courseId}/reviews/summary`,
			}),
			providesTags: ["CourseReviewSummary"],
		}),
	}),
});

export const {
	useCreateReviewMutation,
	useGetReviewsQuery,
	useGetReviewSummaryQuery,
} = courseReviewApiSlice;

