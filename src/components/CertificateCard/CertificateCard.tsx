import React from "react";
import styles from "./CertificateCard.module.css";
import Image from "next/image";
import { Certificate } from "@/types/Certificate";

interface CertificateCardProps {
	certificate: Certificate;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
	certificate: { imageUrl, course, instructor },
}) => {
	return (
		<div className={styles["certificate-card"]}>
			<Image
				src={imageUrl}
				alt="Certificate"
				className={styles["certificate-card__image"]}
				width={240}
				height={150}
				priority
			/>
			<div className={styles["certificate-card__info"]}>
				<p className={styles["certificate-card__info__course-title"]}>
					{course.title}
				</p>
				<p className={styles["certificate-card__info__instructor-name"]}>
					{instructor.name}
				</p>
			</div>
		</div>
	);
};

export default CertificateCard;
