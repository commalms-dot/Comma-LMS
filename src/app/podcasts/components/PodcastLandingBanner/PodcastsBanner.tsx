import React from "react";
import styles from "./PodcastsBanner.module.css";
import clsx from "clsx";
import Image from "next/image";

export default function PodcastsBanner() {
	return (
		<div className={clsx(styles["podcasts-banner"])}>
			<div className={styles["left"]}>
				<h1 className={styles["heading"]}>
					Discover a new world through Comma’s podcasts
				</h1>
				<p className={styles["sub-heading"]}>
					Lurem ipsum dolar Set Dummy data is very important to express ideas
					before let’s go!
				</p>
				<h2 className={styles["important-numbers__heading"]}>
					Important Numbers:
				</h2>
				<div className={styles["numbers__container"]}>
					<p className={styles["numbers__item"]}>
						<span>102k</span>
						Podcast
					</p>
					<p className={styles["numbers__item"]}>
						<span>64k</span>
						listeners
					</p>
				</div>
			</div>
			<div className={styles["right"]}>
				<div className={clsx(styles["rectangle"], styles["rectangle1"])}></div>
				<div className={clsx(styles["rectangle"], styles["rectangle2"])}></div>
				<div className={clsx(styles["rectangle"], styles["rectangle3"])}></div>
				<div className={clsx(styles["rectangle"], styles["rectangle4"])}></div>
				<div className={clsx(styles["rectangle"], styles["rectangle5"])}></div>
				<div className={clsx(styles["rectangle"], styles["rectangle6"])}></div>

				<div className={styles["call-to-action"]}>
					{[
						{
							title: "lorem ipsum",
							subtitle: "lorem ipsum",
							icon: "/podcasts/mic1.png",
						},

						{
							title: "lorem ipsum",
							subtitle: "lorem ipsum",
							icon: "/podcasts/mic2.png",
						},

						{
							title: "lorem ipsum",
							subtitle: "lorem ipsum",
							icon: "/podcasts/mic3.png",
						},
					].map((item, index) => (
						<div key={index} className={styles["cta__button"]}>
							<Image src={item.icon} alt={item.title} width={28} height={28} />
							<div className={styles["cta__button__text"]}>
								<h3 className={styles["cta__button__text__title"]}>
									{item.title}
								</h3>
								<p className={styles["cta__button__text__subtitle"]}>
									{item.subtitle}
								</p>
							</div>
						</div>
					))}
				</div>
				<Image
					src="/images/podcast_banner.png"
					alt="Podcasts Banner"
					width={500}
					height={500}
				/>
			</div>
		</div>
	);
}
