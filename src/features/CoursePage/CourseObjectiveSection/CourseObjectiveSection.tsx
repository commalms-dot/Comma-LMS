import React from "react";
import ContentHeader from "../ContentHeader/ContentHeader";
import "./CourseObjectiveSection.css";

interface CourseObjectiveSectionProps {
	objectives: string[];
}

const CourseObjectiveSection: React.FC<CourseObjectiveSectionProps> = ({
	objectives,
}) => {
	return (
		<div className="course-objective-section">
			<ContentHeader
				title="Objectives"
				subtitle="By the end of this course, you will be able to:"
			/>
			<ol className="course-objective-section__objectives-list">
				{objectives?.map((objective, index) => {
					return <li key={index}>{objective}</li>;
				})}
			</ol>
		</div>
	);
};

export default CourseObjectiveSection;
