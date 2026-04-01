"use client";
import React from "react";
import MenuList from "@/components/ui/MenuList/MenuList";
import MyCourses from "@/features/UserProfilePage/MyCourses/MyCourses";
import PublicProfile from "@/features/UserProfilePage/PublicProfile/PublicProfile";
import AccountSetting from "@/features/UserProfilePage/Account Settings/AccountSettings";
import MyCertificates from "@/features/UserProfilePage/MyCertificates/MyCertificates";
import SavedCourses from "@/features/UserProfilePage/SavedCourses/SavedCourses";
import PodcastHistory from "@/features/UserProfilePage/PodcastHistory/PodcastHistory";
import PaymentMethods from "@/features/UserProfilePage/PaymentMethods/PaymentMethods";
import Notebook from "@/features/UserProfilePage/Notebook/Notebook";
import BusinessLicense from "@/features/UserProfilePage/BusinessLicense/BusinessLicense";
import MyQuestions from "@/features/UserProfilePage/MyQuestions/MyQuestions";
import styles from "./UserProfile.module.css";
import { useAuthUser } from "@/hooks/useAuthUser";
import UserAvatarInput from "@/components/ui/UserAvatarInput/UserAvatarInput";

const UserProfile = () => {
	const { authUser } = useAuthUser();

	return (
		<div className={styles["user-profile-page"]}>
			<div className={styles["user-profile-page__header"]}>
				<UserAvatarInput
					fullName={authUser?.fullName as string}
					iniitialImg={authUser?.avatarUrl as string}
					jobTitle={authUser?.jobTitle as string}
				/>
			</div>
			<div className={`container ${styles["user-profile-page__content"]}`}>
				<MenuList
					tabs={[
						"Public Profile",
						"Account Setting",
						"My Courses",
						"Podcast History",
						"Saved Courses",
						"Payment Methods",
						"My Certificates",
						"Notebook",
						"Business License",
						"My Questions",
					]}
				>
					<PublicProfile user={authUser} />
					<AccountSetting
						email={authUser?.email as string}
						userId={authUser?.id as number}
					/>
					<MyCourses />
					<PodcastHistory />
					<SavedCourses />
					<PaymentMethods />
					<MyCertificates />
					<Notebook />
					<BusinessLicense />
					<MyQuestions />
				</MenuList>
			</div>
		</div>
	);
};

export default UserProfile;
