"use client";
import React from "react";
import styles from "./SinglePodcastBanner.module.css";
import clsx from "clsx";
import { usePodcastQuery } from "@/services/podcast.service";
import PlayablePodcastCard from "../PlayablePodcastCard/PlayablePodcastCard";
export default function SinglePodcastBanner({ id }: { id: number }) {
	const { data: podcast, isLoading, error } = usePodcastQuery({ id });
	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {JSON.stringify(error)}</p>;
	return (
		<article className={styles["content"]}>
			<div className={styles["left"]}>
				<p className={styles["description"]}>{podcast?.description}</p>
				<h2 className={styles["heading"]}>Podcast Information</h2>
				<div className={styles["info-list"]}>
					<p className={clsx(styles["date"], styles["info-item"])}>
						Date: {podcast?.startDate!}
					</p>
					<p className={clsx(styles["data"], styles["info-item"])}>
						type: {podcast?.type}
					</p>
					<p className={clsx(styles["duration"], styles["info-item"])}>
						duration: {podcast?.duration}
					</p>
				</div>
				<div className={styles["numbers-container"]}>
					<p className={styles["numbers-heading"]}>numbers</p>
					<ul className={styles["numbers-list"]}>
						<p className={styles["number-item"]}>
							<span>{podcast?.listnersCount} </span>
							Listeners
						</p>
						<p className={styles["number-item"]}>
							<span>{podcast?.listnersCount} </span>
							Love the Podcast
						</p>
					</ul>
				</div>
			</div>
			<div className="right">
				<PlayablePodcastCard data={podcast!} />
			</div>
		</article>
	);
}
