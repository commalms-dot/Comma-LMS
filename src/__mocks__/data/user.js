export const userData = {
	firstName: "Ahmed",
	lastName: "Younes",
	name: "Ahmed Younes",
};

// Courses that user enrolled in
export const userEnrolledCoursesData = [
	{
		isFavorite: true,
		title: "Advance Civil Engineering Course",
		price: 1252,
		discountPrice: 2225,
		rating: 4.7,
		reviewsCount: 1254,
		image: "/images/card-placeholder2.png",
		progress: "20",
		instructor: {
			name: "Mahmoud Abdelbaky Osama",
		},
	},
	{
		isFavorite: false,
		title: "Advance Civil Engineering Course",
		price: 1252,
		discountPrice: 2225,
		rating: 4.7,
		reviewsCount: 1254,
		image: "/images/card-placeholder.png",
		progress: "45",
		instructor: {
			name: "Mahmoud Abdelbaky Osama",
		},
	},
];

// Courses that user added to favourite
export const userSavedCoursesDa = [
	{
		isFavorite: true,
		title: "Advance Civil Engineering Course",
		instructor: {
			name: "Mahmoud Abdelbaky Osama",
		},
		price: 1252,
		discountPrice: 2225,
		rating: 4.7,
		reviewsCount: 1254,
		image: "/images/card-placeholder2.png",
	},
	{
		isFavorite: true,
		title: "Advance Civil Engineering Course",
		instructor: {
			name: "Mahmoud Abdelbaky Osama",
		},
		price: 1252,
		discountPrice: 2225,
		rating: 4.7,
		reviewsCount: 1254,
		image: "/images/card-placeholder.png",
	},
];

// Certificates for courses that user completed
export const userCertificatesData = [
	{
		id: "1",
		imageUrl: "/images/temp-cert.png",
		course: {
			id: "1",
			title: "Advance Civil Engineering Course",
		},
		instructor: {
			id: "1",
			name: "Mahmoud Abdelbaky Osama",
		},
	},
	{
		id: "2",
		imageUrl: "/images/temp-cert.png",
		course: {
			id: "2",
			title: "Advanced Web Development Course",
		},
		instructor: {
			id: "2",
			name: "Sarah Johnson",
		},
	},
	{
		id: "3",
		imageUrl: "/images/temp-cert.png",
		course: {
			id: "3",
			title: "Graphic Desing Course for Beginners",
		},
		instructor: {
			id: "3",
			name: "John Doe",
		},
	},
];

// User live notes on courses
export const userNotesData = [
	{
		course: {
			id: "1",
			title: "Introduction to Web Development",
			imageUrl: "/images/temp-course-note.jpeg",
		},
		instructor: {
			id: "1",
			name: "Adam Jones",
		},
		notes: [
			{
				id: "1",
				time: "0:09",
				text: "Very interesting course, I have enjoyed it and will recommend it to friends. It started from zero step by step in each topic, until you reach a good level. The instructors were also very helpful.",
			},
			{
				id: "2",
				time: "1:25",
				text: "I found the section on HTML particularly informative, especially the explanation of semantic markup.",
			},
			{
				id: "3",
				time: "2:55",
				text: "The CSS exercises were challenging but rewarding. I feel much more confident in my styling abilities now.",
			},
			{
				id: "4",
				time: "4:12",
				text: "The JavaScript section was fantastic! The projects were engaging and helped solidify my understanding of concepts like functions and loops.",
			},
			{
				id: "5",
				time: "5:48",
				text: "The section on responsive design was eye-opening. I had no idea how much could be achieved with media queries.",
			},
		],
	},
	{
		course: {
			id: "2",
			title: "Advanced React Development",
			imageUrl: "/images/temp-course-note.jpeg",
		},
		instructor: {
			id: "2",
			name: "Sophia Smith",
		},
		notes: [
			{
				id: "7",
				time: "0:15",
				text: "I'm really enjoying this advanced React course. The topics covered so far have been challenging but incredibly insightful.",
			},
			{
				id: "8",
				time: "1:45",
				text: "The Redux section clarified a lot of concepts for me. I appreciate the detailed explanations and practical examples.",
			},
			{
				id: "9",
				time: "3:10",
				text: "Hooks are a game-changer! They simplify state management and make React components more reusable.",
			},
			{
				id: "10",
				time: "4:55",
				text: "The context API lesson was particularly useful. It showed me how to manage state across different components without prop drilling.",
			},
			{
				id: "11",
				time: "6:30",
				text: "I'm looking forward to diving into more advanced topics like testing and optimization in React.",
			},
		],
	},
];

export const users = [
    {
        id: "1",
        fullName: "Alice Johnson",
        avatarUrl: "/images/temp-user-1.jpeg",
        jobTitle: "Software Engineer",
        organization: "Tech Solutions"
    },
    {
        id: "2",
        fullName: "Bob Smith",
        avatarUrl: "/images/temp-user-2.jpeg",
        jobTitle: "Project Manager",
        organization: "Innovate Inc."
    },
    {
        id: "3",
        fullName: "Charlie Brown",
        avatarUrl: "/images/temp-user-3.jpeg",
        jobTitle: "UX Designer",
        organization: "Creative Agency"
    }
];
