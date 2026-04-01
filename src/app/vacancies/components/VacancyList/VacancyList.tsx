"use client";
import React from "react";
import VacancyCard from "../VacancyCard/VacancyCard";
import styles from "./VacancyList.module.css";
import { useVacanciesQuery } from "@/services/vacancy.service";
function VacancyList() {
	const { data: vacancies, error, isLoading } = useVacanciesQuery();
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error: {JSON.stringify(error)}</div>;
	}

	return (
		<div className={styles["content"]}>
			{vacancies?.map((vacancy) => {
				return <VacancyCard key={vacancy.id} data={vacancy} />;
			})}
		</div>
	);
}

export default VacancyList;
