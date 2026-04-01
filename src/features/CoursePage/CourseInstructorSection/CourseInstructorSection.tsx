import React from "react";
import UserAvatarCard from "@/components/User/UserAvatarCard/UserAvatarCard";
import { Instructor } from "@/types/Course";
import ContentHeader from "../ContentHeader/ContentHeader";
import "./CourseInstructorSection.css";

interface CourseInstructorSectionProps {
	instructor: Instructor;
}

const CourseInstructorSection: React.FC<CourseInstructorSectionProps> = ({
	instructor,
}) => {
	return (
		<div className="course-instructor-section">
			<ContentHeader title="Course Instructor" />
			<UserAvatarCard
				user={{
					id: instructor?.id,
					fullName: instructor?.name,
					avatarUrl: instructor?.avatarUrl as any,
					jobTitle: instructor?.jobTitle,
					organization: instructor?.organization,
				}}
				isInstructor={true}
			/>
		</div>
	);
};

export default CourseInstructorSection;
