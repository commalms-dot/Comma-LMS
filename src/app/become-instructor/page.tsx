"use client";
import BecomeInstructorForm from "@/features/BecomeInstructorPage/BecomeInstructorForm/BecomeInstructorForm";
import styles from "./BecomeInstructor.module.css";

const BecomeInstructorPage = () => {
	return (
		<div className={styles["become-instructor-page"]}>
			<div className={styles["become-instructor-page__banner"]}>
				<div
					className={styles["become-instructor-page__banner__overlay"]}
				></div>
				<div className={styles["become-instructor-page-banner__text"]}>
					<div>
						<h2>Become an Instructor</h2>
						<p>
							Lorem Ipsum&nbsp;is simply dummy text of the printing and
							typesetting industry. Lorem Ipsum has been the industry&apos;s
							standard dummy text ever since
						</p>
					</div>
				</div>
			</div>
			<div className={styles["become-instructor-page__content"]}>
				<div className={styles["become-instructor-page__header"]}>
					<h1>Become an Instructor</h1>
					<p>
						Lorem Ipsum&nbsp;is simply dummy text of the printing and
						typesetting industry. Lorem Ipsum has been the industry&apos;s
						standard dummy text ever since
					</p>
				</div>
				<div className={styles["become-instructor-page__form-container"]}>
					<BecomeInstructorForm />
				</div>
			</div>
		</div>
	);
};

export default BecomeInstructorPage;
