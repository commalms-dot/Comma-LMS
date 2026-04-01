import React from "react";
import Chip from "@/components/ui/Chip/Chip";
import ContentHeader from "../ContentHeader/ContentHeader";
import "./AcquiredSkillsSection.css";

interface AcquiredSkillsSectionProps {
	skills: string[];
}

const AcquiredSkillsSection: React.FC<AcquiredSkillsSectionProps> = ({
	skills,
}) => {
	return (
		<div className="acquired-skills">
			<ContentHeader title="Acquired Skills" />
			<div className="skills-list">
				{skills?.map((skill, index) => {
					return <Chip key={index} text={skill} />;
				})}
			</div>
		</div>
	);
};

export default AcquiredSkillsSection;
