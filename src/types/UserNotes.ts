export interface UserNotes {
	course: {
		id: string;
		title: string;
		posterUrl: string;
	};
	author: {
		id: string;
		name: string;
	};
	notes: {
		id: string;
		time: string;
		text: string;
	}[];
}
