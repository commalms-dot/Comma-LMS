import React from "react";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import styles from "./AddCardModal.module.css";
import Input from "@/components/ui/Form/Input/Input";
import Button from "@/components/ui/Button/Button";
import clsx from "clsx";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm?: () => void;
};

const AddCardModal = ({ open, onOpenChange, onConfirm }: Props) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className={styles.modalContentWrapper}>
				<div
					className={styles.modalOverlay}
					onClick={() => onOpenChange(false)}
				></div>

				<div className={styles["container"]}>
					<div className={styles["header"]}>
						Comma accepts all major credit and debit cards:
					</div>
					<div className={styles["form-group"]}>
						<Input
							onChange={() => {
								console.log(1);
							}}
							label="Card number"
							id="card-number"
							name="card-number"
						/>
					</div>
					<div className={styles["form-group"]}>
						<Input
							label="Name on card"
							id="card-name"
							name="card-name"
							onChange={() => {
								console.log(1);
							}}
						/>
					</div>
					<div className={clsx(styles["form-group"], styles["expiration-cvv"])}>
						<div className={styles["form-group"]}>
							<Input
								label="Expiration date"
								id="expiration date"
								name="expiration date"
								onChange={() => {
									console.log(1);
								}}
							/>
						</div>
						<div className={styles["form-group"]}>
							<Input
								label="CVV"
								id="cvv"
								name="cvv"
								onChange={() => {
									console.log(1);
								}}
							/>
						</div>
					</div>
					<div className={styles["actions"]}>
						<Button
							variant="outline"
							onClick={() => {
								onOpenChange(false);
							}}
							className={styles["cancel-btn"]}
						>
							cancel
						</Button>

						<Button
							size="fit"
							onClick={() => {
								onOpenChange(false);
							}}
							variant="primary"
						>
							Add your card
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AddCardModal;
