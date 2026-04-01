import React from "react";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import styles from "./SuccessModal.module.css";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm?: () => void;
};

const SuccessModal = ({ open, onOpenChange, onConfirm }: Props) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				onClick={(e) => e.stopPropagation()}
				className={styles.modalContentWrapper}
			>
				<div
					className={styles.modalOverlay}
					onClick={() => onOpenChange(false)}
				></div>
				<div className={styles.modalContent}>
					<p className={styles["heading"]}>
						<p>🎉</p>
						Congratulations!
					</p>
					<p className={styles["sub-heading"]}>
						Your course fees have been successfully paid. You're all set to
						embark on your learning journey. Enjoy your course!
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default SuccessModal;
