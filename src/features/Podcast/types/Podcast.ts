import Channel from "./Channel";

interface Podcast {
	title: string;
	type: string;
	listeners_count: number;
	likes_count: number;
	started_at: string;
	duration: string;
	description: string;
	image: string;
	authors: string[];
	isFavorite?: boolean;
	channels?: Channel[];
}
export interface PodcastListItem {
	id: number;
	name: string;
	description: string;
	posterUrl: string;
	instructor: {
		id: number;
		name: string;
		imageUrl: string;
	};
}
export interface SinglePodcast {
	id: number;
	name: string;
	posterUrl: string;
	description: string;
	type: string;
	duration: number;
	startDate: string;
	listnersCount: number;
	channels: {
		id: number;
		name: string;
		link: string;
	}[];
	instructor: {
		id: number;
		name: string;
	};
}

export default Podcast;
