import React from "react";
import styles from "./BusinessLicense.module.css";

const BusinessLicense = () => {
	return (
		<div className={styles["business-license"]}>
			<div className={styles["business-license__header"]}>
				<h2>Business licenses</h2>
			</div>
			<div className={styles["business-license__content"]}>
				Business License
			</div>
		</div>
	);
};

export default BusinessLicense;
