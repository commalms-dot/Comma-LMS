import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import Input from "@/components/ui/Form/Input/Input";
import Button from "@/components/ui/Button/Button";
import generateValidationSchema from "@/utils/validationSchemaGenerator";
import { useChangeEmailMutation } from "@/services";
import styles from "./ChangeEmailForm.module.css";

interface ChangeEmailFormData {
	email: string;
}

interface ChangeEmailFormProps {
	email: string;
	userId: number;
}

const schema = generateValidationSchema(["email"]);

const ChangeEmailForm: React.FC<ChangeEmailFormProps> = ({
	email = "",
	userId = undefined,
}) => {
	const [isEmailChanged, setIsEmailChanged] = useState(false);
	const [changeEmail, { isLoading, isSuccess, isError, error }] =
		useChangeEmailMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<ChangeEmailFormData>({
		resolver: yupResolver(schema) as any,
		defaultValues: {
			email: email,
		},
	});

	const newEmail = watch("email");

	const onSubmit = async (data: ChangeEmailFormData) => {
		try {
			await changeEmail({ id: userId, newEmail: data.email }).unwrap();
			toast.success("Email changed successfully.");
		} catch (error: any) {
			if (error?.status === 400) {
				toast.error("Email is already in use.");
			} else {
				toast.error("An error occurred. Please try again later.");
			}
		}
	};

	useEffect(() => {
		setIsEmailChanged(newEmail !== email);
	}, [newEmail, email]);

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={styles["account-settings-form"]}
		>
			<Input label="Email" {...register("email")} error={errors.email} />
			<div className={styles["account-settings-form__button-wrapper"]}>
				<Button
					type="submit"
					variant="primary"
					size="large"
					disabled={isLoading || !isEmailChanged}
					isLoading={isLoading}
				>
					Save
				</Button>
			</div>
		</form>
	);
};

export default ChangeEmailForm;
