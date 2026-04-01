interface UserCommon {
	name: string;
	jobTitle: string;
	avatarUrl: string;
}

interface Student extends UserCommon {
	is_instructor?: false;
}

interface Instructor extends UserCommon {
	is_instructor: true;
	organization: string;
}

export type User = Student | Instructor;
