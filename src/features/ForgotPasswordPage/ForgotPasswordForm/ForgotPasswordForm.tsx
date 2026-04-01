"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/ui/Form/Input/Input";
import Button from "@/components/ui/Button/Button";
import { generateValidationSchema } from "@/utils";
import { useForgotPasswordMutation } from "@/services";
import styles from "./ForgotPasswordForm.module.css";
import { toast } from "react-toastify";
import ROUTES from "@/constants/routes";

interface ForgotPasswordData {
	email: string;
}

const schema = generateValidationSchema(["email"]);

const ForgotPasswordForm = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotPasswordData>({
		resolver: yupResolver(schema) as any,
	});

	const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

	const onSubmit = async (data: ForgotPasswordData) => {
		try {
			await forgotPassword(data.email).unwrap();
			toast.success("Password reset OTP sent to your email.");
			router.push(`${ROUTES.VERIFICATION_CODE}?email=${data.email}`);
		} catch (error) {
			toast.error("Failed to send OTP. Please try again.");
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={styles["forgot-password-form__form"]}
		>
			<div>
				<Input
					label={"Enter your Email"}
					{...register("email")}
					error={errors.email}
				/>
			</div>
			<div className={styles["forgot-password-form__button-wrapper"]}>
				<Button
					type="submit"
					variant="primary"
					size="large"
					isLoading={isLoading}
				>
					Confirm
				</Button>
			</div>
		</form>
	);
};

export default ForgotPasswordForm;
