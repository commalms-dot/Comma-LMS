import React from "react";
import styles from "./UserAvatarCard.module.css";
import Image from "next/image";
import StarRating from "@/components/ui/StarRating/StarRating";

interface UserAvatarCardProps {
	isInstructor?: boolean;
	withRating?: boolean;
	rating?: number;
	age?: string;
	user: {
		id: number;
		fullName: string;
		avatarUrl?: string;
		jobTitle?: string;
		organization?: string;
	};
}

const UserAvatarCard: React.FC<UserAvatarCardProps> = ({
	isInstructor = false,
	withRating = false,
	rating = 1,
	age,
	user,
}) => {
	return (
		<div className={styles["card"]}>
			<Image
				className={styles["avatar-img"]}
				src={user?.avatarUrl || "/images/default-avatar.jpeg"}
				alt="avatar"
				width={40}
				height={40}
			/>
			<div className={styles["user-info"]}>
				<div className={styles["user-info__title"]}>
					<h3 className={styles["user-name"]}>{user.fullName}</h3>
					{withRating ? <StarRating rating={rating} /> : null}
				</div>
				<div className={styles["user-role"]}>
					{isInstructor && (
						<Image src="/svg/bag.svg" alt="role" width={20} height={20} style={{marginRight : "8px"}} />
					)}
					<p>
						<span>{user.jobTitle}</span>
						{isInstructor && (
							<span>
								at{" "}
								<span className={styles["user-organization"]}>
									{user.organization}
								</span>
							</span>
						)}
						{age ? <span>{`    .    `}{age}</span> : null}
					</p>
				</div>
			</div>
		</div>
	);
};

export default UserAvatarCard;
