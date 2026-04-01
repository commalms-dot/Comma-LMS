"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import FormPageContainer from "@/components/FormPageContainer/FormPageContainer";
import styles from "./VerificationCode.module.css";
import VerificationCodeForm from "@/features/VerificationCodePage/VerificationCodeForm/VerificationCodeForm";

const VerificationCodePage = () => {
	const searchParams = useSearchParams();
	let email = searchParams.get("email");

	return (
		<FormPageContainer
			title={`Verfication code.`}
			subtitle={`Didn’t receive the code ?`}
			brandingTitle={"Ensuring your peace of mind."}
			routeLabel={"Resend code"}
			route="/"
		>
			<div className={styles["verificationC-code-form"]}>
				<VerificationCodeForm email={email as string} />
			</div>
		</FormPageContainer>
	);
};

export default VerificationCodePage;
