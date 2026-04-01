import React from "react";
import styles from "./SavedCourses.module.css";
import { CourseCard } from "@/components/Courses/CourseCard/CourseCard";

const SavedCourses = () => {
	//@TODO: fetch userSavedCoursesDa
	const userSavedCoursesDa: any[] = [];

	return (
		<div className={styles["saved-courses"]}>
			<div className={styles["saved-courses__header"]}>
				<p>My Saved Courses</p>
			</div>
			<div className={styles["saved-course__content"]}>
				<div className={styles["saved-course__course-list"]}>
					{userSavedCoursesDa.map((course, index) => {
						return <CourseCard key={index} course={course} />;
					})}
				</div>
			</div>
		</div>
	);
};

export default SavedCourses;
