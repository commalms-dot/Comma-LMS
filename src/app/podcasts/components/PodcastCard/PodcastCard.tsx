import React from "react";
import styles from "./PodcastCard.module.css";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import MicIcon from "../../../../../public/svg/mic.svg";
import HeartIcon from "../../../../../public/svg/heart.svg";
import ShareIcon from "../../../../../public/svg/share.svg";

import clsx from "clsx";
import { PodcastListItem } from "@/features/Podcast/types/Podcast";
import Link from "next/link";

type Props = {
	data: PodcastListItem;
	playable?: boolean;
};

function PodcastCard({ data, playable }: Props) {
	return (
		<Link href={`/podcasts/${data.id}`}>
			<section
				className={clsx(styles.card, playable && styles["playable-card"])}
			>
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
					{playable ? (
						<>
							<div className={styles["playableContent-heading"]}>
								<h3 className={styles.title}>{data.name}</h3>

								<div className={styles.authors}>
									<MicIcon />
									<p>{data.instructor.name}</p>
								</div>
							</div>
							<p className={styles["playableContent-heading"]}>
								listen through:
							</p>
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
										src={"/podcasts/spotify.png"}
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
										src={"/podcasts/slack.png"}
										alt="itunes"
										width={30}
										height={30}
									/>
								</Button>
							</div>
						</>
					) : (
						<>
							<h3 className={styles.title}>{data.name}</h3>
							<p className={styles.description}>{data.description}</p>
							<div className={styles.authors}>
								<MicIcon />
								<p>{data.instructor.name}</p>
							</div>
						</>
					)}
				</div>
			</section>
		</Link>
	);
}

export default PodcastCard;