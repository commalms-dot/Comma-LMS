import React from "react";
import { CourseCard } from "@/components/Courses/CourseCard/CourseCard";
import styles from "./RelatedCoursesSection.module.css";
import { CourseListItem } from "@/types/Course";

interface RelatedCoursesSectionProps {
	courses: CourseListItem[];
}

const RelatedCoursesSection: React.FC<RelatedCoursesSectionProps> = ({
	courses,
}) => {
	return (
		<div className={styles["related-courses-section"]}>
			<h2>Related Courses</h2>
			<div className={styles["courses-list"]}>
				{courses.map((course, index) => {
					return <CourseCard key={index} course={course} />;
				})}
			</div>
		</div>
	);
};

export default RelatedCoursesSection;
