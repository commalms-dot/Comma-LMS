export interface User {
	id: number;
	fullName: string;
	avatarUrl?: string;
	jobTitle?: string;
	organization?: string;
}

export interface Question {
	id: number;
	text: string;
	createdAt: string;
	user: User;
	repliesCount?: number | null;
}

export interface Reply {
	id: number;
	text: string;
	questionId: number;
	createdAt: string;
	user: User;
}

