import moment from "moment";

// Function to format time ago or exact date
const formatTimeAgo = (date: string | Date): string => {
	const now = moment();
	const targetDate = moment(date);

	// Check if the date is within the last 24 hours
	if (now.diff(targetDate, "hours") < 24) {
		return targetDate.fromNow(); // e.g., "1 hour ago"
	}

	// Check if the date is within the last 30 days
	if (now.diff(targetDate, "days") < 30) {
		return targetDate.format("DD/MM/YYYY: HH:mm"); // e.g., "11/08/2024: 15:30"
	}

	// For dates older than 30 days, return a full date format
	return targetDate.format("DD/MM/YYYY: HH:mm"); // e.g., "11/08/2024: 15:30"
};

export default formatTimeAgo;
