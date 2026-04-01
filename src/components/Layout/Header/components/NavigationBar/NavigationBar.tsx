"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavigationBar.module.css";
import Image from "next/image";

export default function NavigationBar() {
	const pathname = usePathname();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navigationLinks = [
		// { name: "Offline Course", url: "/courses/off-line" },
		// { name: "Online Course", url: "/courses/on-line" },
		{ name: "Courses", url: "/courses/recorded" },
		// { name: "Learning Path", url: "/learning-path" },
		// { name: "Podcasts", url: "/podcasts" },
		{ name: "Plans & Pricing", url: "/subscriptions"}
	];

	const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

	return (
		<nav className={styles["main-nav"]} aria-label="Main">
			<div className={styles["nav-container"]}>
				{/* Burger Menu (Left) */}
				<button className={styles["burger"]} onClick={toggleMenu} aria-label="Toggle menu">
					☰
				</button>

				{/* Logo (Center) */}
				{/* <div className={styles["logo"]}>
					<Link href="/">
						<Image src="/logo.svg" alt="Logo" width={100} height={40} />
					</Link>
				</div> */}

				{/* Right (Login + Language) */}
				{/* <div className={styles["nav-actions"]}>
					<Link href="/login">Login</Link>
					<select className={styles["language-selector"]}>
						<option value="en">EN</option>
						<option value="ar">AR</option>
					</select>
				</div> */}
			</div>

			{/* Main Links */}
			<ul
				className={`${styles["main-nav__list"]} ${
					isMobileMenuOpen ? styles["main-nav__list--open"] : ""
				}`}
			>
				{navigationLinks.map((link) => {
					const isActive = pathname === link.url;
					return (
						<li
							key={link.name}
							className={`${styles["main-nav__item"]} ${isActive ? styles["active"] : ""}`}
						>
							<Link href={link.url}>{link.name}</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
