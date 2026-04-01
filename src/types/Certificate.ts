export interface Certificate {
	imageUrl: string;
	course: {
		id?: string;
		title: string;
	};
	instructor: {
		id?: string;
		name: string;
	};
}
