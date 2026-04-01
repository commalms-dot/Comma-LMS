"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button/Button";
import { userData } from "@/__mocks__/data/user";
import SkipIcon from "../../../public/svg/double-right-chevron.svg";

import styles from "./UserInterests.module.css";

const interests = [
	"Technology",
	"Fashion",
	"Travel",
	"Health",
	"Sports",
	"Education",
	"Food",
	"Music",
];

const UserInterestPage: React.FC = () => {
	const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

	const handleInterestChange = (event: ChangeEvent<HTMLInputElement>) => {
		const interest = event.target.value;
		console.log("Interest:", interest);
		setSelectedInterests((prevInterests) =>
			prevInterests.includes(interest)
				? prevInterests.filter((i) => i !== interest)
				: [...prevInterests, interest]
		);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(`Selected Interests: ${selectedInterests.join(", ")}`);
	};

	return (
		<div className={styles["user-interests-page"]}>
			<div className={styles["user-interests__header"]}>
				<Link
					href="/user-profile"
					className={styles["user-interests__skip-button"]}
				>
					<span>Skip to Comma</span>
					<SkipIcon className={styles["user-interests__skip-icon"]} />
				</Link>
			</div>
			<div className={styles["user-interests-page__content"]}>
				<div className={styles["user-interests-page__heading"]}>
					<p>Hello&nbsp;{userData.firstName}&nbsp;👏🏻</p>
					<h1>We would like to know more about interests</h1>
				</div>
				<form
					onSubmit={handleSubmit}
					className={styles["user-interests__form"]}
				>
					{interests.map((interest) => (
						<div
							key={interest}
							className={styles["user-interests__form-group"]}
						>
							<label
								htmlFor={interest}
								className={`${styles["user-interests__label"]} 
									${selectedInterests.includes(interest) ? styles["user-interests__label--selected"] : ""}
								`}
							>
								<input
									type="checkbox"
									id={interest}
									value={interest}
									checked={selectedInterests.includes(interest)}
									onChange={handleInterestChange}
									className={styles["user-interests__checkbox"]}
								/>
								{interest}
							</label>
						</div>
					))}

					<div className={styles["user-interests__btn-wrapper"]}>
						<Button className={styles["button"]} type="submit" fullWidth>
							Confirm
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UserInterestPage;
