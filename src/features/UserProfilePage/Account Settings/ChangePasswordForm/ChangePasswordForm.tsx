import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/ui/Form/Input/Input";
import Button from "@/components/ui/Button/Button";
import { generateValidationSchema } from "@/utils";
import { useChangePasswordMutation } from "@/services";
import styles from "./ChangePasswordForm.module.css";

interface ChangePasswordFormData {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

interface ChangePasswordFormProps {
	userId?: number;
}

const schema = generateValidationSchema([
	"currentPassword",
	"newPassword",
	"confirmPassword",
]);

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
	userId = undefined,
}) => {
	const [changePassword, { isLoading }] = useChangePasswordMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<ChangePasswordFormData>({
		resolver: yupResolver(schema) as any,
	});

	const watchFields = watch([
		"currentPassword",
		"newPassword",
		"confirmPassword",
	]);
	const isFormFilled = watchFields.every(
		(field) => field !== undefined && field !== ""
	);

	const onSubmit = async (data: ChangePasswordFormData) => {
		if (userId) {
			try {
				await changePassword({
					id: userId,
					currentPassword: data.currentPassword,
					newPassword: data.newPassword,
				}).unwrap();
				toast.success("Password change successfully.");
			} catch (error: any) {
				if (error?.status === 404) {
					toast.error("User not found.");
				} else if (error?.status === 400) {
					toast.error("Current password is incorrect");
				} else {
					toast.error("Failed to change password: ");
				}
			}
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={styles["account-settings-form"]}
		>
			<Input
				label="Enter your current password"
				type="password"
				{...register("currentPassword")}
				error={errors.currentPassword}
			/>
			<Input
				label="Enter your new password"
				type="password"
				{...register("newPassword")}
				error={errors.newPassword}
			/>
			<Input
				label="Confirm password"
				type="password"
				{...register("confirmPassword")}
				error={errors.confirmPassword}
			/>
			<div className={styles["account-settings-form__button-wrapper"]}>
				<Button
					type="submit"
					variant="primary"
					size="large"
					isLoading={isLoading}
					disabled={!isFormFilled || isLoading}
				>
					Submit
				</Button>
			</div>
		</form>
	);
};

export default ChangePasswordForm;
