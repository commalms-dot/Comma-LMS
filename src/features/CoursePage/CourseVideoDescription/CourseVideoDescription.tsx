import React from "react";
import ContentHeader from "../ContentHeader/ContentHeader";
import "./CourseVideoDescription.css";

interface CourseVideoDescriptionProps {
	description: string;
	category: string;
}

function CourseVideoDescription({
	description,
	category,
}: CourseVideoDescriptionProps) {
	return (
		<div className="course-video-description">
			<ContentHeader title="Course Category" subtitle={category} />
			<ContentHeader title="Course Description" subtitle={description} />
		</div>
	);
}

export default CourseVideoDescription;
