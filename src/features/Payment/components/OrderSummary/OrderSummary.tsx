import React from "react";
import styles from "./OrderSummary.module.css";
import clsx from "clsx";
type Props = {
	price: number;
	discount: number;
	className?: string;
};
function OrderSummary({ price, discount, className }: Props) {
	return (
		<section className={clsx(styles["card"], className)}>
			<h3 className={styles["heading"]}>order summary</h3>
			<ul className={styles["price-list"]}>
				<li className={styles["price-item"]}>
					<span className={styles["price-item__label"]}>Course Price:</span>
					<span className={styles["price-item__value"]}>{price} EGP</span>
				</li>
				<li className={styles["price-item"]}>
					<span className={styles["price-item__label"]}>promocode:</span>
					<span className={styles["price-item__value"]}>{discount} EGP</span>
				</li>
				<hr className="divider" />
				<li className={clsx(styles["price-item"], styles["total"])}>
					<span className={styles["price-item__label"]}>order Total:</span>
					<span className={styles["price-item__value"]}>
						{price - discount} EGP
					</span>
				</li>
			</ul>
		</section>
	);
}

export default OrderSummary;
