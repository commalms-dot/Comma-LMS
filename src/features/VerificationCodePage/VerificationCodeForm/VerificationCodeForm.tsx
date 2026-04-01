"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useVerifyResetPasswordOtpMutation } from "@/services";
import Button from "@/components/ui/Button/Button";
import OTPInput from "@/components/ui/Form/OTPInput/OTPInput";
import ROUTES from "@/constants/routes";
import styles from "./VerificationCodeForm.module.css";

interface VerificationCodeFormProps {
	email: string;
}

const VerificationCodeForm: React.FC<VerificationCodeFormProps> = ({
	email,
}) => {
	const [otp, setOtp] = useState("");
	const router = useRouter();

	const [verifyResetPasswordOtp, { isLoading }] =
		useVerifyResetPasswordOtpMutation();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await verifyResetPasswordOtp({ email, otp }).unwrap();
			if (response.token) {
				toast.success("OTP verified successfully.");
				localStorage.setItem("resetToken", response.token);
				router.push(`${ROUTES.NEW_PASSWORD}?email=${email}`);
			}
		} catch (error) {
			console.error("Failed to verify OTP:", error);
			toast.error("Failed to verify OTP. Please try again.");
		}
	};

	return (
		<form
			onSubmit={onSubmit}
			className={styles["verificationC-code-form__form"]}
		>
			<div>
				<OTPInput
					onChange={(val) => setOtp(val)}
					label={"Enter your OTP here"}
				/>
			</div>
			<div className={styles["verificationC-code-form__button-wrapper"]}>
				<Button
					variant="primary"
					type="submit"
					size="large"
					isLoading={isLoading}
				>
					Confirm
				</Button>
			</div>
		</form>
	);
};

export default VerificationCodeForm;
