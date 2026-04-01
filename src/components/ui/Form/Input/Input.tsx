import React, { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import styles from "./Input.module.css";

interface InputProps {
	id?: string;
	name?: string;
	type?: string;
	label?: string;
	placeholder?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	error?: FieldError | undefined;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
	{
		id,
		name,
		type = "text",
		label,
		placeholder,
		value,
		onChange,
		onBlur,
		error,
	},
	ref
) => {
	return (
		<div className={styles["form-group"]}>
			{label && (
				<label htmlFor={id} className={styles["form-group__label"]}>
					{label}
				</label>
			)}
			<input
				ref={ref}
				id={id}
				name={name}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				className={
					error
						? `${styles["form-group__input"]} ${styles["form-group__input--error"]}`
						: styles["form-group__input"]
				}
			/>
			{error && (
				<span className={styles["form-group__error-message"]}>
					{error.message}
				</span>
			)}
		</div>
	);
};

export default forwardRef(Input);
