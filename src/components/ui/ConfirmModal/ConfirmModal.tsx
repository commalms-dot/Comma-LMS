import React from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from "@radix-ui/react-dialog";
import styles from "./ConfirmModal.module.css";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
};

const ConfirmModal = ({ open, onOpenChange, onConfirm }: Props) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent onClick={(e) => e.stopPropagation()}>
				<div
					className={styles.modalOverlay}
					onClick={() => onOpenChange(false)}
				>
					<div className={styles.modalContent}>
						<DialogTitle className={styles.modalHeader}>
							Confirm Deletion
						</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete this item?
						</DialogDescription>
						<div className={styles.modalActions}>
							<button
								className={`${styles.button} ${styles.confirmButton}`}
								onClick={onConfirm}
							>
								Delete
							</button>
							<button
								className={`${styles.button} ${styles.cancelButton}`}
								onClick={() => onOpenChange(false)}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ConfirmModal;
