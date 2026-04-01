import React, { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./FormPageContainer.module.css";
import ExpertTrustSummary from "./ExpertTrustSummary/ExpertTrustSummary";
import ExpertCard from "./ExpertCard/ExpertCard";

interface FormPageContainerProps {
	children: ReactElement;
	title?: string;
	subtitle?: string;
	route?: string;
	routeLabel?: string;
	brandingTitle?: string;
	showBranding?: boolean; // ✅ add this
}

const FormPageContainer: React.FC<FormPageContainerProps> = ({
	children,
	title,
	subtitle,
	route,
	routeLabel,
	brandingTitle,
	showBranding, // ✅ add this here
}) => {
	return (
		<div className={styles["form-page-container"]}>
			{/* Form */}
			<div className={styles["form-page-container__form-container"]}>
				{/* <div className={styles["form-page-container__logo-wrapper"]}>
					<Image
						src="/images/comma-logo.png"
						alt="Comma Logo"
						className={styles["form-page-container__logo"]}
						width={94}
						height={28}
						priority
					/>
				</div> */}
				<div>
					<h1 className={styles["form-page-container__title"]}>{title}</h1>
					<p className={styles["form-page-container__subtitle"] }>
						{subtitle}&nbsp;
						{route && (
							<span>
								<Link
									className={styles["form-page-container__link"]}
									href={route}
								>
									{routeLabel}
								</Link>
							</span>
						)}
					</p>
				</div>
				{children}
			</div>
			{/* organization branding */}

			<div className={styles["form-page-container__branding"]}>
				<div className={styles["form-page-container__branding-content"]}>
					<p className={styles["form-page-container__branding-title"]}>
						{brandingTitle}
					</p>
					<p className={styles["form-page-container__branding-text"]}>
						using Lorem Ipsum is that it has a more-or-less normal distribution
						of letters, as opposed to using readable English.
					</p>
					<div>
						<ExpertTrustSummary />
					</div>
				</div>
				<div className={styles["form-page-container__branding-footer"]}>
					<ExpertCard />
				</div>
			</div>

		</div>
	);
};

export default FormPageContainer;
