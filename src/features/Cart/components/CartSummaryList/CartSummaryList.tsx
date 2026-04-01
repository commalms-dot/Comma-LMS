import { useGetUserCartQuery } from "@/services/cart.service";
import Image from "next/image";
import React from "react";
import styles from "./CartSummaryList.module.css";

export default function CartSummaryList() {
	const { data } = useGetUserCartQuery();
	
	return (
		<section className={styles["cart-list"]}>
			{data?.items.map((item) => {
				return (
					<div key={item.item.id} className={styles["cart-item"]}>
						<Image
							src={item.item.course.posterUrl}
							alt="Course"
							width={50}
							height={60}
						/>
						<div className={styles["item-content"]}>
							<p className={styles["item-title"]}>{item.item.course.title}</p>
							<p className={styles["item-instructor"]}>
								{item.item.instructor.name}
							</p>
							<p className={styles["item-price"]}>
								{item.item.course.price} EGP
							</p>
						</div>
					</div>
				);
			})}
		</section>
	);
}
