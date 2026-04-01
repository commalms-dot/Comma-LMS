"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateValidationSchema } from "@/utils";
import Input from "@/components/ui/Form/Input/Input";
import Button from "@/components/ui/Button/Button";
import styles from "./SigninForm.module.css";
import ROUTES from "@/constants/routes";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/services/auth.service";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/authStore";
import "react-toastify/dist/ReactToastify.css";

interface SignInFormData {
  email: string;
  password: string;
}

const schema = generateValidationSchema(["email", "password"]);

const SignInForm = () => {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await login(data).unwrap();
      const { setAuth } = useAuthStore.getState();
      setAuth(response.accessToken, response.user.id, response.user);
      console.log("AUTH STORE:", useAuthStore.getState());
      toast.success("Sign in successful");
      router.push(ROUTES.HOME);
    } catch (err) {
      const error = err as any;
      const errorMessage = error?.data?.message || "Failed to sign in";
      toast.error(errorMessage);
      console.error("Failed to sign in:", errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles["signin-form__form"]}
    >
      <div>
        <Input
          label={"Enter your Email"}
          {...register("email")}
          error={errors.email}
        />
        <Input
          type="password"
          label={"Enter your Password"}
          {...register("password")}
          error={errors.password}
        />
      </div>
      <div>
        <p className={styles["signin-form__subtitle"]}>
          Forgot Password?&nbsp;
          <span>
            <Link
              className={styles["signin-form__link"]}
              href={ROUTES.FORGOT_PASSWORD}
            >
              Reset Password
            </Link>
          </span>
        </p>
      </div>
      <div className={styles["signin-form__button-wrapper"]}>
        <Button
          className={styles["signin-form__button"]}
          variant="primary"
          size="large"
          type="submit"
          isLoading={isLoading}
        >
          Log in
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
