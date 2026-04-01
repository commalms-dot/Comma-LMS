import React, { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import styles from "./TextArea.module.css";

interface TextAreaProps {
	id?: string;
	name?: string;
	label?: string;
	placeholder?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
	error?: FieldError | undefined;
	resizing?: boolean;
}

const TextArea: React.ForwardRefRenderFunction<
	HTMLTextAreaElement,
	TextAreaProps
> = (
	{
		id,
		name,
		label,
		placeholder,
		value,
		onChange,
		onBlur,
		error,
		resizing = false,
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
			<textarea
				ref={ref}
				id={id}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				rows={3}
				className={`
					${
						error
							? `${styles["form-group__textarea"]} ${styles["form-group__textarea--error"]}`
							: styles["form-group__textarea"]
					}
				${resizing ? "" : styles["form-group__textarea--no-resizing"]}`}
			/>
			{error && (
				<span className={styles["form-group__error-message"]}>
					{error.message}
				</span>
			)}
		</div>
	);
};

export default forwardRef(TextArea);
