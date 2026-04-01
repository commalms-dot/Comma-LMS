"use client";
import FormPageContainer from "@/components/FormPageContainer/FormPageContainer";
import SocialLoginLinks from "@/features/SigninPage/SocialLoginLinks/SocialLoginLinks";
import SigninForm from "@/features/SigninPage/SigninForm/SigninForm";
import ROUTES from "@/constants/routes";
import styles from "./Signin.module.css";

const SignInPage = () => {
  return (
    <FormPageContainer
      title={`Welcome Back`}
      subtitle={`Haven’t an account?`}
      route={ROUTES.SIGNUP}
      routeLabel={`Sign up`}
      brandingTitle={`Unlock a world of knowledge!`}
    >
      <div className={styles["signin-form-container"]}>
        <div>
          <SocialLoginLinks />
        </div>
        <SigninForm />
      </div>
    </FormPageContainer>
  );
};

export default SignInPage;
