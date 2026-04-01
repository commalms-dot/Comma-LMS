import React from "react";
import SinglePodcastBanner from "../components/SinglePodcastBanner/SinglePodcastBanner";
import styles from "./page.module.css";
import PodcastList from "../components/PodcastList/PodcastList";
export default function page({ params }: { params: { slug: number } }) {
	return (
		<main className="container">
			<SinglePodcastBanner id={params.slug} />
			<h2 className={styles["suggested-podcasts-heading"]}>
				Suggested Podcasts
			</h2>
			<PodcastList many={true} />
		</main>
	);
}
