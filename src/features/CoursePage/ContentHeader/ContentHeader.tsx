import React from "react";
import "./ContentHeader.css";

interface ContentHeaderProps {
	title: string;
	subtitle?: string;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({ title, subtitle }) => {
	return (
		<div className="content-header">
			<h2 className="heading-2">{title}</h2>
			{subtitle ? <p className="subtitle-2">{subtitle}</p> : null}
		</div>
	);
};

export default ContentHeader;
