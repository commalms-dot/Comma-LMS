"use client";
import React, { useState } from "react";
import styles from "./InputEditor.module.css";
import Button from "../ui/Button/Button";

interface InputEditorProps {
	placeholder?: string;
	isLoading?: boolean;
	onSubmit: (content: string) => void;
	onCancel?: () => void;
}

const InputEditor: React.FC<InputEditorProps> = ({
	onSubmit,
	onCancel,
	placeholder,
	isLoading = false,
}) => {
	const [content, setContent] = useState<string>("");

	const handleSubmit = () => {
		onSubmit(content);
		setContent("");
	};

	const handleCancel = () => {
		if (onCancel) {
			onCancel();
		}
		setContent("");
	};

	return (
		<div className={styles["input-editor"]}>
			<textarea
				value={content}
				onChange={(e) => setContent(e.target.value)}
				placeholder={placeholder}
				rows={4}
				cols={50}
			/>
			<div className={styles["input-editor__footer"]}>
				<Button
					variant="transparent"
					className={styles["input-editor__cancel-btn"]}
					onClick={handleCancel}
				>
					Cancel
				</Button>
				<Button
					variant="accent"
					className={styles["input-editor__submit-btn"]}
					onClick={handleSubmit}
					isLoading={isLoading}
					disabled={isLoading || content.trim() === ""}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default InputEditor;
