import React from "react";
import ContentHeader from "../ContentHeader/ContentHeader";
import UserAvatarCard from "@/components/User/UserAvatarCard/UserAvatarCard";
import { Instructor } from "@/types/Course";
import { formatDuration } from "@/utils/formatDuration";
import "./CourseOverviewSection.css";

interface CourseOverviewSectionProps {
	title: string;
	insturctor: Instructor;
	skillLevel: string;
	students: number;
	languages: string;
	captions: string;
	lecturesCount: number;
	duration: number;
	features: string[];
	description: string[];
}

const CourseOverviewSection: React.FC<CourseOverviewSectionProps> = ({
	title,
	insturctor,
	skillLevel,
	students,
	languages,
	captions,
	lecturesCount,
	duration,
	description,
}) => {
	return (
		<div className="course-overview-section">
			<ContentHeader title="About this course" subtitle={title} />
			<div className="course-overview-section__info">
				<div className="course-overview-section__info-row">
					<div className="course-overview-section__info-row-header">
						By the numbers
					</div>
					<div className="course-overview-section__info-row-cell numbers">
						<ul>
							<li>
								<span>Skill level: </span> {skillLevel}
							</li>
							<li>
								<span>Students: </span> {students}
							</li>
							<li>
								<span>Languages: </span> {languages}
							</li>
							<li>
								<span>Captions: </span> {captions ? "Yes" : "No"}
							</li>
						</ul>
						<ul>
							<li>
								<span>Lectures: </span> {lecturesCount}
							</li>
							<li>
								<span>Duration: </span> {formatDuration(duration)}
							</li>
						</ul>
					</div>
				</div>
				<div className="course-overview-section__info-row">
					<div className="course-overview-section__info-row-header">
						Features
					</div>
					<div className="course-overview-section__info-row-cell">
						<ul>
							<li>Available on iOS and Android</li>
						</ul>
					</div>
				</div>
				<div className="course-overview-section__info-row">
					<div className="course-overview-section__info-row-header">
						Describtion
					</div>
					<div className="course-overview-section__info-row-cell describtion">
						{description}
						{/* <ul>
							{features.map((feat, index) => (
								<li key={index}>{feat}</li>
							))}
						</ul> */}
					</div>
				</div>
				<div className="course-overview-section__info-row">
					<div className="course-overview-section__info-row-header">
						Instructor
					</div>
					<div className="course-overview-section__info-row-cell instructor">
						<UserAvatarCard
							user={{
								id: insturctor.id,
								fullName: insturctor.name,
								avatarUrl: insturctor?.avatarUrl,
								jobTitle: insturctor?.jobTitle as string,
								organization: insturctor?.organization,
							}}
							isInstructor={true}
						/>
						<ul>
							{/* {description.map((desc, index) => (
								<li key={index}>{desc}</li>
							))} */}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseOverviewSection;
