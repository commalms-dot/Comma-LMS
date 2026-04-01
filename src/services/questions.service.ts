import apiSlice from "./api";

const QUESTION_TAG = "Questions";
const REPLY_TAG = "Replies";

export const questionsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getQuestions: builder.query({
			query: ({ courseId, limit, page }) => {
				return {
					url: `/questions`,
					method: "GET",
					params: { limit, page, courseId },
				};
			},
			providesTags: (result, error, { courseId }) =>
				result ? [{ type: QUESTION_TAG, id: courseId }] : [],
		}),
		addQuestion: builder.mutation({
			query: ({ question, userId, courseId }) => ({
				url: `/questions`,
				method: "POST",
				body: question,
				params: {
					userId,
					courseId,
				},
			}),
			invalidatesTags: (result, error, { courseId }) => [
				{ type: QUESTION_TAG, id: courseId },
			],
		}),
		updateQuestion: builder.mutation({
			query: ({ id, updatedQuestion }) => ({
				url: `/questions/${id}`,
				method: "PUT",
				body: updatedQuestion,
			}),
			invalidatesTags: (result, error, { updatedQuestion }) => [
				{ type: QUESTION_TAG, id: updatedQuestion.courseId },
			],
		}),
		deleteQuestion: builder.mutation({
			query: (id) => ({
				url: `/questions/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, error, id) => [
				{ type: QUESTION_TAG, id: result?.courseId },
			],
		}),
		// Replies endpoints
		getReplies: builder.query({
			query: ({ questionId, limit, page }) => ({
				url: `/replies/${questionId}`,
				method: "GET",
				params: { limit, page },
			}),
			providesTags: (result, error, { questionId }) =>
				result ? [{ type: REPLY_TAG, id: questionId }] : [],
		}),
		addReply: builder.mutation({
			query: ({ replyData, questionId }) => {
				console.log(888888888888);
				console.log(replyData);
				console.log(888888888888);

				return {
					url: `/replies/${questionId}`,
					method: "POST",
					body: replyData,
				};
			},
			invalidatesTags: (result, error, { questionId }) => [
				{ type: REPLY_TAG, id: questionId },
				{ type: QUESTION_TAG, id: result?.courseId },
			],
		}),
		updateReply: builder.mutation({
			query: ({ id, updatedReply }) => ({
				url: `/replies/${id}`,
				method: "PUT",
				body: updatedReply,
			}),
			invalidatesTags: (result, error, { questionId }) => [
				{ type: REPLY_TAG, id: questionId },
			],
		}),
		deleteReply: builder.mutation({
			query: (id) => ({
				url: `/replies/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, error, { questionId, courseId }) => [
				{ type: REPLY_TAG, id: questionId },
				{ type: QUESTION_TAG, id: courseId },
			],
		}),
	}),
});

export const {
	useGetQuestionsQuery,
	useAddQuestionMutation,
	useUpdateQuestionMutation,
	useDeleteQuestionMutation,
	useGetRepliesQuery,
	useAddReplyMutation,
	useUpdateReplyMutation,
	useDeleteReplyMutation,
} = questionsApiSlice;

