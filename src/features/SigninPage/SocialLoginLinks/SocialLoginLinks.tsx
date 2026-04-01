import React from "react";
import Image from "next/image";
import styles from "./SocialLoginLinks.module.css";

const SocialLoginLinks = () => {
	return (
		<div className={styles["social-login"]}>
			<ul className={styles["social-login__links"]}>
				<li className={styles["social-login__links__item"]}>
					<Image
						src="/svg/linkedin.svg"
						alt="LinkedIn Logo"
						width={22}
						height={22}
						priority
					/>
					<span>LinkedIn</span>
				</li>
				<li className={styles["social-login__links__item"]}>
					<Image
						src="/svg/facebook.svg"
						alt="Facebook Logo"
						width={22}
						height={22}
						priority
					/>
					<span>Facebook</span>
				</li>
				<li className={styles["social-login__links__item"]}>
					<Image
						src="/svg/gmail.svg"
						alt="Gmail Logo"
						width={22}
						height={22}
						priority
					/>
					<span>Gmail</span>
				</li>
			</ul>
			<div className={styles["social-login__or-divider"]}>Or</div>
		</div>
	);
};

export default SocialLoginLinks;
