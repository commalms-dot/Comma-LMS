"use client";
import "./Button.css";
import { ReactNode, ButtonHTMLAttributes, MouseEventHandler } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?:
		| "primary"
		| "secondary"
		| "danger"
		| "transparent"
		| "outline"
		| "primary-outline"
		| "accent";
	children: ReactNode;
	className?: string;
	radius?: "large" | "full";
	size?: "small" | "medium" | "large" | "full" | "fit";
	fullWidth?: boolean;
	isLoading?: boolean;
	disabled?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
	variant,
	children,
	className,
	radius,
	size,
	fullWidth = false,
	isLoading = false,
	disabled = false,
	onClick = () => {},
	type = "button",
	...props
}: Readonly<ButtonProps>) {
	// Construct classes
	const classes = [
		"button",
		variant ? `button--${variant}` : "",
		radius ? `button--rounded-${radius}` : "",
		size ? `button--${size}` : "",
		fullWidth ? "button--fullWidth" : "",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<button
			type={type}
			className={classes}
			onClick={onClick}
			disabled={disabled}
			{...props}
		>
			{isLoading ? "Loading..." : children}
		</button>
	);
}
