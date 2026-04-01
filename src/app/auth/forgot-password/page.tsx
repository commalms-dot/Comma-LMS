"use client";
import FormPageContainer from "@/components/FormPageContainer/FormPageContainer";
import ForgotPasswordForm from "@/features/ForgotPasswordPage/ForgotPasswordForm/ForgotPasswordForm";

import styles from "./ForgotPassword.module.css";

const ForgotPasswordPage = () => {
	return (
		<FormPageContainer
			title={`Forgot Password?`}
			subtitle={`Enter the email associated with your account to send you a code.`}
			routeLabel={`Resend code`}
			brandingTitle={"Security is our priority."}
		>
			<div className={styles["forgot-password-form-container"]}>
				<ForgotPasswordForm />
			</div>
		</FormPageContainer>
	);
};

export default ForgotPasswordPage;
