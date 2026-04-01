import React from "react";
import styles from "./page.module.css";
import CategoriesList from "@/components/Categories/CategoriesList/CategoriesList";
import PodcastList from "./components/PodcastList/PodcastList";
import PodcastsBanner from "./components/PodcastLandingBanner/PodcastsBanner";

export default function Page() {
	return (
		<main className={"container"}>
			<PodcastsBanner />
			<h2 className={styles["sub-heading"]}>
				Choose category to learn more about the courses in this category
			</h2>
			<CategoriesList />
			<PodcastList />
			{/* Passing the category parameter to PodcastList */}
		</main>
	);
}