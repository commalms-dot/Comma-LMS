"use client";
import React from "react";
import styles from "./PodcastList.module.css";
import PodcastCard from "../PodcastCard/PodcastCard";
import Button from "@/components/ui/Button/Button";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { usePodcastsQuery } from "@/services/podcast.service";
import { PodcastListItem } from "@/features/Podcast/types/Podcast";
type props = {
	many?: boolean;
	limit?: number;
	start?: number;
	type?: string;
};

function PodcastList({ limit = 4, start = 0, type, many }: props) {
	const searchParams = useSearchParams();
	const category = searchParams.get("category") || "";

	const {
		data: podcasts,
		isLoading,
		error,
	} = usePodcastsQuery({
		type,
		category,
		limit,
	});
	console.log(category);
	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {JSON.stringify(error)}</p>;

	return (
		<div>
			<article className={clsx(styles.list, many && styles["many-cols"])}>
				{podcasts.map((podcast: PodcastListItem) => {
					return <PodcastCard key={podcast.id} data={podcast} />;
				})}
			</article>
			<Button
				variant="outline"
				size="large"
				className={styles["explore-button"]}
			>
				Explore More
			</Button>
		</div>
	);
}

export default PodcastList;