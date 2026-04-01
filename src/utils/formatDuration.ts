export const formatDuration = (seconds: number) => {
	if (seconds < 60) {
		return `${seconds} seconds`;
	} else if (seconds < 3600) {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		// return remainingSeconds === 0
		// 	? `${minutes} mins`
		// 	: `${minutes} minutes ${remainingSeconds} seconds`;
		return remainingSeconds === 0 ? `${minutes} mins` : `${minutes} mins`;
	} else {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = seconds % 60;
		if (minutes === 0 && remainingSeconds === 0) {
			return `${hours} hours`;
		} else if (remainingSeconds === 0) {
			return `${hours} hours ${minutes} minutes`;
		} else {
			// return `${hours} hours ${minutes} minutes ${remainingSeconds} seconds`;
			return `${hours} hours ${minutes} minutes`;
		}
	}
};
