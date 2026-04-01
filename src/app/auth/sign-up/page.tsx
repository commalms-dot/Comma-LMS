"use client";
import SignupForm from "@/features/SignupPage/SignupForm/SignupForm";
import FormPageContainer from "@/components/FormPageContainer/FormPageContainer";
import styles from "./Signup.module.css";
import ROUTES from "@/constants/routes";

const SignUpPage = () => {
	return (
		<FormPageContainer
			title={`Get Started Now`}
			subtitle={`Already Have an account ?`}
			route={ROUTES.SIGNIN}
			routeLabel={`Sign in`}
			brandingTitle={"Begin your transformative educational journey today."}
		>
			<div className={styles["signup-form-container"]}>
				<SignupForm />
			</div>
		</FormPageContainer>
	);
};

export default SignUpPage;
