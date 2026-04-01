"use client";
import React from "react";
import styles from "./page.module.css";
import CourseList from "@/components/Courses/CourseList/CourseList";
import CartSummary from "@/features/Cart/components/CartSummary/CartSummary";
import CartList from "@/features/Cart/components/CartList/CartList";
import { useGetUserCartQuery } from "@/services/cart.service";

function Page() {
	const { data, isLoading, error } = useGetUserCartQuery();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>An error has occurred: JSON{JSON.stringify(error)}</div>;
	}

	return (
		<div className="container">
			<h2 className={styles["header"]}>shopping cart</h2>
			<div className={styles["content"]}>
				<div className={styles["list"]}>
					<CartList cartItems={data?.items!} />
				</div>
				<CartSummary totalPrice={data?.totalPrice!} />
			</div>
			<h2 className={styles["courses-header"]}>might be interested</h2>
			<CourseList />
		</div>
	);
}

export default Page;

