import apiSlice from "./api";

interface ChapterProgressRequest {
	chapterId: string;
}

interface ChapterProgressResponse {
	id: number;
	watchTime: number;
	completed: boolean;
}

interface UpdateChapterProgressRequest {
	chapterId: string;
	watchTime: number;
	completed: boolean;
}

export const courseApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getChapterProgress: builder.query<
			ChapterProgressResponse,
			ChapterProgressRequest
		>({
			query: (body) => {
				return {
					url: `/courses/chapters/${body.chapterId}/progress`,
					method: "GET",
				};
			},
		}),
		updateChapterProgress: builder.mutation<void, UpdateChapterProgressRequest>(
			{
				query: (body) => {
					return {
						url: `/courses/chapters/${body.chapterId}/progress`,
						method: "PUT",
						body,
					};
				},
			}
		),
	}),
});

export const { useGetChapterProgressQuery, useUpdateChapterProgressMutation } =
	courseApiSlice;
