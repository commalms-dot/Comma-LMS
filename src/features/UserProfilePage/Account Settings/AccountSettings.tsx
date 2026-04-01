import React from "react";
import styles from "./AccountSettings.module.css";
import ChangeEmailForm from "./ChangeEmailForm/ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm/ChangePasswordForm";

interface AccountSettingProps {
	email: string;
	userId: number;
}

const AccountSettings: React.FC<AccountSettingProps> = ({ email, userId }) => {
	return (
		<div className={styles["account-settings"]}>
			{/* Header */}
			<div className={styles["account-settings__header"]}>
				<h2>Account settings</h2>
				<p>Edit your account settings and change your password here.</p>
			</div>
			<div className={styles["account-settings__content"]}>
				{/* Change email form */}
				<div className={styles["account-settings__form-container"]}>
					<ChangeEmailForm email={email} userId={userId} />
				</div>
				<hr className={styles["account-settings__divider"]} />
				{/* Change Password Form */}
				<div className={styles["account-settings__form-container"]}>
					<p>Change Password </p>
					<ChangePasswordForm userId={userId} />
				</div>
			</div>
		</div>
	);
};

export default AccountSettings;
