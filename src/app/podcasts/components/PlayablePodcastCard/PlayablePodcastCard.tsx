import React from "react";
import styles from "./PlayablePodcastCard.module.css";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import MicIcon from "../../../../../public/svg/mic.svg";
import HeartIcon from "../../../../../public/svg/heart.svg";
import ShareIcon from "../../../../../public/svg/share.svg";
import clsx from "clsx";
import { SinglePodcast } from "@/features/Podcast/types/Podcast";

type Props = {
	data: SinglePodcast;
};

function PlayablePodcastCard({ data }: Props) {
	return (
		<section className={clsx(styles.card, styles["playable-card"])}>
			<aside className={styles.aside}>
				<Button
					variant="primary"
					radius="full"
					className={styles["favorite-button"]}
				>
					<HeartIcon width={20} height={20} color={"#ff5646"} />
				</Button>
				<Button
					variant="primary"
					radius="full"
					className={styles["share-button"]}
				>
					<ShareIcon width={20} height={20} color={"white"} />
				</Button>
				<Image
					src={data.posterUrl}
					fill={true}
					alt={data.name}
					className={styles.image}
				/>
			</aside>

			<div className={styles.content}>
				<div className={styles["playableContent-heading"]}>
					<h3 className={styles.title}>{data.name}</h3>
					<div className={styles.authors}>
						<MicIcon />
						<p>{data.instructor.name}</p>
					</div>
				</div>
				<p className={styles["playableContent-heading"]}>listen through:</p>
				<div className={styles.playableContent}>
					<Button
						variant="transparent"
						radius="full"
						className={styles["play-button"]}
					>
						<Image
							src={"/podcasts/itunes.png"}
							alt="itunes"
							width={30}
							height={30}
						/>
					</Button>
					<Button
						variant="transparent"
						radius="full"
						className={styles["play-button"]}
					>
						<Image
							src={"/podcasts/youtube.png"}
							alt="youtube"
							width={30}
							height={30}
						/>
					</Button>
					<Button
						variant="transparent"
						radius="full"
						className={styles["play-button"]}
					>
						<Image
							src={"/podcasts/spotify.png"}
							alt="spotify"
							width={30}
							height={30}
						/>
					</Button>
					<Button
						variant="transparent"
						radius="full"
						className={styles["play-button"]}
					>
						<Image
							src={"/podcasts/slack.png"}
							alt="slack"
							width={30}
							height={30}
						/>
					</Button>
				</div>
			</div>
		</section>
	);
}

export default PlayablePodcastCard;
