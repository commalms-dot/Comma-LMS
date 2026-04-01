import apiSlice from "./api";

const NOTE_TAG = "Notes";

export const notesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getNotes: builder.query({
			query: ({ chapterId, userId, limit, page }) => ({
				url: `/notes`,
				method: "GET",
				params: { chapterId, userId, limit, page },
			}),
			providesTags: (result, error, { chapterId }) =>
				result ? [{ type: NOTE_TAG, id: chapterId }] : [],
		}),
		addNote: builder.mutation({
			query: (newNote) => ({
				url: `/notes`,
				method: "POST",
				body: newNote,
			}),
			invalidatesTags: (result, error, { chapterId }) => [
				{ type: NOTE_TAG, id: chapterId },
			],
		}),
		updateNote: builder.mutation({
			query: ({ id, updatedNote }) => ({
				url: `/notes/${id}`,
				method: "PUT",
				body: updatedNote,
			}),
			invalidatesTags: (result, error, { updatedNote }) => [
				{ type: NOTE_TAG, id: updatedNote.chapterId },
			],
		}),
		deleteNote: builder.mutation({
			query: (id) => {
				alert(id);
				return { url: `/notes/${id}`, method: "DELETE" };
			},
			invalidatesTags: (result, error, id) => [
				{ type: NOTE_TAG, id: result?.chapterId },
			],
		}),
	}),
});

export const {
	useGetNotesQuery,
	useAddNoteMutation,
	useUpdateNoteMutation,
	useDeleteNoteMutation,
} = notesApiSlice;

