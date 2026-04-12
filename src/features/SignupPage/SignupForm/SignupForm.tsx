"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/ui/Form/Input/Input";
import Button from "@/components/ui/Button/Button";
import styles from "./SignupForm.module.css";
import { generateValidationSchema } from "@/utils";
import { useSignupMutation } from "@/services/auth.service";
import ROUTES from "@/constants/routes";
import CountrySelect from "@/components/ui/Form/CountrySelect/CountrySelect";

interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  country: string;
  mobile: string;
}

const schema = generateValidationSchema([
  "fullName",
  "email",
  "password",
  "country",
  "mobile",
]);

const SignupForm = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      let formattedMobile = data.mobile;

      if (formattedMobile.startsWith("0")) {
        formattedMobile = "+2" + formattedMobile;
      }
      await signup({
        ...data,
        mobile: formattedMobile,
        role: "USER",
      }).unwrap();
      toast.success("Signup successful");
      router.push(ROUTES.SIGNIN);
    } catch (err: any) {
      if (
        err.data &&
        err.data.message &&
        err.data.message.includes("Email already exists")
      ) {
        toast.error("Email already exists");
      } else {
        toast.error("Failed to signup");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles["signup-form__form"]}
    >
      <div>
        <Input
          label={"Enter your full name"}
          {...register("fullName")}
          error={errors.fullName}
        />
        <Input
          label={"Enter your Email"}
          {...register("email")}
          error={errors.email}
        />
        <Input
          label={"Enter your phone number"}
          placeholder="+2010XXXXXXXX"
          {...register("mobile")}
          error={errors.mobile}
        />
        <Input
          type="password"
          label={"Enter your Password"}
          {...register("password")}
          error={errors.password}
        />
        <CountrySelect
          name="country"
          control={control}
          error={errors.country}
        />
      </div>
      <div>
        <p className={styles["signup-form__subtitle"]}>
          Forgot Password?&nbsp;
          <span>
            <Link
              className={styles["signup-form__link"]}
              href="/auth/forgot-password"
            >
              Reset Password
            </Link>
          </span>
        </p>
      </div>
      <div className={styles["signup-form__button-wrapper"]}>
        <Button
          variant="primary"
          size="large"
          type="submit"
          isLoading={isLoading}
        >
          Sign up
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
