import React from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from "@radix-ui/react-dialog";
import styles from "./CartModal.module.css";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

const CartModal = ({ open, onOpenChange }: Props) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				onClick={(e) => e.stopPropagation()}
				className={styles.modalContentWrapper}
			>
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
							<button className={`${styles.button} ${styles.confirmButton}`}>
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

export default CartModal;
