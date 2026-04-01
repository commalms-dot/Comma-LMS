import React, { useState } from "react";
import Image from "next/image";
import styles from "./UserAvatarInput.module.css";

interface UserAvatarInputProps {
	fullName: string;
	jobTitle?: string;
	iniitialImg?: string;
}

const UserAvatarInput: React.FC<UserAvatarInputProps> = ({
	fullName,
	jobTitle,
	iniitialImg = "/images/default-avatar.jpeg",
}) => {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			const reader = new FileReader();
			reader.onloadend = () => {
				setSelectedImage(reader.result as string);
			};
			reader.readAsDataURL(file);

			// Upload the image to the backend
			const formData = new FormData();
			formData.append("avatar", file);

			// @TODO: send backend request here
		}
	};

	return (
		<div className={styles["user-avatar-input"]}>
			<div className={styles["user-avatar-input__avatar-container"]}>
				<Image
					src={selectedImage || iniitialImg}
					alt="Expert"
					className={styles["user-avatar-input__avatar-container__image"]}
					width={82}
					height={82}
					priority
				/>
				<div
					className={
						styles["user-avatar-input__avatar-container__edit-btn-wrapper"]
					}
				>
					<label
						className={styles["user-avatar-input__avatar-container__edit-btn"]}
					>
						<Image
							src="/svg/edit.svg"
							alt="Edit icon"
							width={22}
							height={22}
							priority
						/>
						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className={styles["user-avatar-input__file-input"]}
						/>
					</label>
				</div>
			</div>
			<div className={styles["user-avatar-input__text"]}>
				<p className={styles["user-avatar-input__name"]}>{fullName}</p>
				{jobTitle && (
					<p className={styles["user-avatar-input__role"]}>{jobTitle}</p>
				)}
			</div>
		</div>
	);
};

export default UserAvatarInput;

