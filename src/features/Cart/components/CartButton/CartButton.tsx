import React from "react";
import styles from "./CartButton.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HoverCard from "@/components/ui/HoverCard/HoverCard";
import CartSummaryList from "../CartSummaryList/CartSummaryList";
import { useGetUserCartQuery } from "@/services/cart.service";

const CartButton = () => {
	const navigation = useRouter();
	const { data, isLoading } = useGetUserCartQuery();

	if (isLoading) return <div>Loading...</div>;

	return (
		<HoverCard content={<CartSummaryList />}>
			<button
				className={styles.cartButton}
				onClick={() => {
					navigation.push("/cart");
				}}
			>
				<Image src="/svg/bag.svg" alt="Cart" width={24} height={24} />
				<span className={styles.badge}>{data?.items?.length || 0}</span>
			</button>
		</HoverCard>
	);
};

export default CartButton;

