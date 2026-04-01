import React from "react";
import styles from "./DurationBadge.module.css";

interface DurationBadgeProps {
	duration: string;
}

const DurationBadge: React.FC<DurationBadgeProps> = ({ duration }) => {
	return <span className={styles["duration-badge"]}>{duration}</span>;
};

export default DurationBadge;

