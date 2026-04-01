"use client";
import React, { useState } from "react";
import styles from "./CartList.module.css";
import CartItem from "../CartItem/CartItem";
import ConfirmModal from "@/components/ui/ConfirmModal/ConfirmModal";
import { CartListItem } from "../../types/CartItem";
import { useRemoveFromCartMutation } from "@/services/cart.service";
import { toast } from "react-toastify";

type Props = {
	cartItems: CartListItem[];
};

export default function CartList({ cartItems }: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [removeItemFromCart] = useRemoveFromCartMutation();
	const handleRemove = (id: number) => {
		removeItemFromCart({ id });
		toast.success("Item removed from cart");
	};

	const confirmRemove = () => {
		setIsModalOpen(false);
	};
	console.log(cartItems);
	return (
		<>
			<article className={styles["list"]}>
				{cartItems.map((item) => {
					return (
						<CartItem key={item.item.id} data={item} onRemove={handleRemove} />
					);
				})}
			</article>
			<ConfirmModal
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
				onConfirm={confirmRemove}
			/>
		</>
	);
}
