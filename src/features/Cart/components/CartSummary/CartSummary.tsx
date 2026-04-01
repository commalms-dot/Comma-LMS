import React from "react";
import styles from "./CartSummary.module.css";
import Button from "@/components/ui/Button/Button";
import clsx from "clsx";
import Link from "next/link";
type Props = {
	className?: string;
	totalPrice: number;
};
function CartSummary({ className, totalPrice }: Props) {
	return (
		<section className={clsx(styles["card"], className)}>
			<div className={styles["content"]}>
				<p className={styles["header"]}>total</p>
				<p className={styles["total_price"]}>{totalPrice} EGP</p>
			</div>
			<Link href="/payment">
				<Button className={styles["checkout-btn"]} size="full" variant="danger">
					checkout
				</Button>
			</Link>
		</section>
	);
}

export default CartSummary;
