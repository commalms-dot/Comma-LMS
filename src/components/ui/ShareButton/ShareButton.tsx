"use client";
import React from "react";
import * as HoverCard from "@radix-ui/react-hover-card";
import styles from "./ShareButton.module.css";
import Button from "../Button/Button";
import Image from "next/image";

export default function ShareButton() {
	const shareOptions = [
		{
			title: "Facebook",
			icon: "/svg/facebook.svg",
		},
		{
			title: "LinkedIn",
			icon: "/svg/LinkedIn.svg",
		},
		{
			title: "gmail",
			icon: "/svg/gmail.svg",
		},
	];
	return (
		<HoverCard.Root openDelay={0}>
			<HoverCard.Trigger>
				<Button variant="transparent">Share</Button>
			</HoverCard.Trigger>
			<HoverCard.Content
				align="center"
				sideOffset={5}
				className={styles["hover-card-content"]}
			>
				<HoverCard.Arrow className={styles["hover-card-arrow"]} />
				<ul className={styles["share-list"]}>
					{shareOptions.map((option) => (
						<li key={option.title}>
							<button className={styles["share-option"]}>
								<Image
									src={option.icon}
									alt={option.title}
									width={20}
									height={20}
								/>
							</button>
						</li>
					))}
				</ul>
			</HoverCard.Content>
		</HoverCard.Root>
	);
}
