export default interface ICartItem {
	id: string;
	title: string;
	instructor: string;
	rating: number;
	length: number;
	price: number;
	reviewsCount: number;
}
export interface CartListItem {
	totalDuration: number;
	reviewsCount: number;
	item: {
		id: number;
		course: {
			id: number;
			title: string;
			price: number;
			discountPrice: number;
			posterUrl: string;
		};
		instructor: {
			id: number;
			name: string;
		};
	};
}
