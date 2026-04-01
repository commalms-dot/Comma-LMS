import Image from "next/image";
import React from "react";
import styles from "./VacanciesBanner.module.css";

export default function VacanciesBanner() {
	return (
		<div className={styles["content"]}>
			<div className={styles["overlay"]}></div>
			<div className={styles["info"]}>
				<h2 className={styles["heading"]}>Vacancies</h2>
				<p className={styles["sub-heading"]}>
					Opportunities Await: Exploring Current Vacancies and Career Paths
				</p>
			</div>
			<Image
				src={"/images/vacancies-banner.jpg"}
				alt="Vacancies Banner"
				fill
			/>
		</div>
	);
}
