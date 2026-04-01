import React from "react";
import styles from "./PaymentMethods.module.css";

const PaymentMethods = () => {
	return (
		<div className={styles["payment-methods"]}>
			<div className={styles["payment-methods__header"]}>
				<h2>Payment methods</h2>
			</div>
			<div className={styles["payment-methods__content"]}>Payment Methods</div>
		</div>
	);
};

export default PaymentMethods;
