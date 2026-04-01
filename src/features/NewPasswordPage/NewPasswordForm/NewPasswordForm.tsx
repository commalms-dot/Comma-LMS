"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useResetPasswordMutation } from "@/services";
import Input from "@/components/ui/Form/Input/Input";
import Button from "@/components/ui/Button/Button";
import ROUTES from "@/constants/routes";
import styles from "./NewPasswordForm.module.css";

interface NewPasswordFormData {
  password: string;
  confirmPassword: string;
}

interface NewPasswordFormProps {
  email: string;
}

// Yup validation schema
const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const NewPasswordForm: React.FC<NewPasswordFormProps> = ({ email }) => {
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: NewPasswordFormData) => {
    try {
      await resetPassword({
        newPassword: data.password,
        email,
      }).unwrap();

      toast.success("Password updated successfully.");
      localStorage.removeItem("resetToken");
      router.push(ROUTES.SIGNIN);
    } catch (error) {
      toast.error("Failed to reset password.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles["new-password-form__form"]}
    >
      <div>
        <Input
          type="password"
          label="Enter your new password"
          {...register("password")}
          error={errors.password}
        />
        <Input
          type="password"
          label="Confirm password"
          {...register("confirmPassword")}
          error={errors.confirmPassword}
        />
      </div>
      <div className={styles["new-password-form__button-wrapper"]}>
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

export default NewPasswordForm;
