"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FormPageContainer from "@/components/FormPageContainer/FormPageContainer";
import NewPasswordForm from "@/features/NewPasswordPage/NewPasswordForm/NewPasswordForm";
import ROUTES from "@/constants/routes";
import styles from "./NewPassword.module.css";

const NewPasswordPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	let email = searchParams.get("email");

	useEffect(() => {
		const token = localStorage.getItem("resetToken");
		if (!token) {
			router.push(ROUTES.VERIFICATION_CODE);
		}
	}, [router]);

	return (
		<FormPageContainer
			title={`Change your password.`}
			brandingTitle={"Begin your transformative educational journey today."}
		>
			<div className={styles["new-password-form"]}>
				<NewPasswordForm email={email as string} />
			</div>
		</FormPageContainer>
	);
};

export default NewPasswordPage;
