import React from "react";
import styles from "./CourseCurriculumSection.module.css";
import Collapsible from "@/components/Collapsible/Collapsible";
import { Chapter } from "@/types/Course";

interface CourseCurriculumSectionProps {
	chapters: Chapter[];
	sectionTitle: string;
}

const CourseCurriculumSection: React.FC<CourseCurriculumSectionProps> = ({
	chapters,
	sectionTitle,
}) => {
	return (
		<div className={styles["course-curriculum-section"]}>
			<h2>{sectionTitle}</h2>
			<div className={styles["course-curriculum-section__list"]}>
				{chapters?.map((chapter, index) => (
					<Collapsible key={index} title={chapter.title}>
						<div className={styles["course-curriculum-section__item__content"]}>
							<p>{chapter.description}</p>
						</div>
					</Collapsible>
				))}
			</div>
		</div>
	);
};

export default CourseCurriculumSection;
