"use client";
import React from "react";
import styles from "./CategoryBadge.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export default function CategoryBadge({
	value,
	title,
}: {
	value: string;
	title: string;
}) {
	const uniqueId = `${value}-category`;
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(searchParams);
		const currentSearchParams = new URLSearchParams(
			Array.from(searchParams.entries())
		);
		const categoryValue = event.target.value.trim();

		if (!categoryValue) {
			currentSearchParams.delete("category");
		} else {
			currentSearchParams.set("category", categoryValue);
		}

		const search = currentSearchParams.toString();
		const query = search ? `?${search}` : "";
		router.push(`${pathname}${query}`, { scroll: false });
	};

	const isChecked =
		searchParams.get("category")?.includes(value) ?? "computer" == value;

	return (
		<>
			<input
				type="radio"
				id={uniqueId}
				name="category"
				value={value}
				onChange={handleChange}
				checked={isChecked}
				className={styles["category"]}
			/>
			<label className={styles["category-label"]} htmlFor={uniqueId}>
				{title}
			</label>
		</>
	);
}
