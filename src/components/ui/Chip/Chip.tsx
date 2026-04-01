import React from "react";
import styles from "./Chip.module.css";

interface ChipProps {
	text: string;
}

const Chip: React.FC<ChipProps> = ({ text }) => {
	return <div className={styles["chip"]}>{text}</div>;
};

export default Chip;
