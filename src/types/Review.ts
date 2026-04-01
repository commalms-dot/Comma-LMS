export interface User {
	id: number;
	fullName: string;
	avatarUrl?: string;
	jobTitle?: string;
	organization?: string;
}

export interface CourseReview {
	id: number;
	text: string;
	rating: number;
	courseId: number;
	user: User;
}

export interface UserReview {
	id: number;
	text: string;
	rating: number;
	courseId: number;
	reviewer: User;
	reviewee: User;
}

export interface ReviewSummary {
	totalReviews: number;
	oneStarCount: number;
	twoStarCount: number;
	threeStarCount: number;
	fourStarCount: number;
	fiveStarCount: number;
	overallRating: string;
}

export interface CreateCourseReviewDto {
	text: string;
	rating: number;
	userId: number;
}
