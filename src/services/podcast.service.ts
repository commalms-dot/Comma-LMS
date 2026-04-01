import { SinglePodcast } from "@/features/Podcast/types/Podcast";
import apiSlice from "./api";

interface QueryParams {
	id: number;
}

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

export const podcastApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		podcasts: builder.query({
			query: (body) => {
				return {
					url: `/podcasts${buildQueryString(body.type, body.category, body.limit)}`,
					method: "GET",
				};
			},
		}),
		podcast: builder.query<SinglePodcast, QueryParams>({
			query: (body) => {
				return {
					url: `/podcasts/${body.id}`,
					method: "GET",
				};
			},
		}),
	}),
});

export const { usePodcastsQuery, usePodcastQuery } = podcastApiSlice;
