import React from "react";
import styles from "./MyCertificates.module.css";
import CertificateCard from "@/components/CertificateCard/CertificateCard";
import { userCertificatesData } from "@/__mocks__/data/user";

const MyCertificates = () => {
	return (
		<div className={styles["my-certificates"]}>
			<div className={styles["my-certificates__header"]}>
				<h2>My Certificates</h2>
				<p>Check your acheivments!</p>
			</div>
			<div className={styles["my-certificates__content"]}>
				<div className={styles["my-certificates__certs-list"]}>
					{userCertificatesData.map((certificate, index) => (
						<CertificateCard key={index} certificate={certificate} />
					))}
				</div>
			</div>
		</div>
	);
};

export default MyCertificates;
