import React from "react";
import styles from "./VacancyCard.module.css";
import Vacancy from "@/services/vacancy.service";
import Link from "next/link";

type Props = {
	data: Vacancy;
};

function VacancyCard({ data }: Props) {
	return (
		<section className={styles["content"]}>
			<header className={styles["header"]}>
				<h2 className={styles["title"]}>{data.title}</h2>
				<ul className={styles["perk-list"]}>
					{data.keywords.map((perk) => (
						<li key={perk.id} className={styles["perk-item"]}>
							{perk.name}
						</li>
					))}
				</ul>
			</header>
			<div className={styles["actions"]}>
				<Link href={data.jobLink} className={styles["action-button"]}>
					Apply
				</Link>
				<Link
					href={data.downloadLink}
					className={`${styles["action-button"]} ${styles["action-button--outline"]}`}
				>
					Download
				</Link>
			</div>
		</section>
	);
}

export default VacancyCard;
