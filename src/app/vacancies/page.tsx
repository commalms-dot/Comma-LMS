import React from "react";
import styles from "./page.module.css";
import VacanciesBanner from "./components/VacanciesBanner/VacanciesBanner";
import VacancyList from "./components/VacancyList/VacancyList";

function VacanciesPage() {
	return (
		<section className={`${styles["vacancies-page"]} container`}>
			<VacanciesBanner />
			<h1 className={styles["heading"]}>Comma Vacancies</h1>

			<VacancyList />
		</section>
	);
}

export default VacanciesPage;
