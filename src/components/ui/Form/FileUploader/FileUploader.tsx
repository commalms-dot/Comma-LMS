import React, { useState, useEffect } from "react";
import { UseControllerProps, Control, useController } from "react-hook-form";
import { PiUploadSimpleLight as UploadIcon } from "react-icons/pi";
import styles from "./FileUploader.module.css";

interface FileUploaderProps extends UseControllerProps {
	label?: string;
	control: Control<any>;
	error?: any;
	accept?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
	label,
	control,
	name,
	error,
	accept,
}) => {
	const [fileName, setFileName] = useState("");

	const { field } = useController({
		name,
		control,
	});

	useEffect(() => {
		const defaultValue = control._defaultValues[name];
		if (defaultValue) {
			setFileName(defaultValue);
		}
	}, [control._defaultValues, name]);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setFileName(file.name);
			field.onChange(file);
		}
	};

	return (
		<div className={styles["file-uploader"]}>
			{label && (
				<label htmlFor={name} className={styles["file-uploader__label"]}>
					{label}
				</label>
			)}
			<div className={styles["file-uploader__input-container"]}>
				<input
					type="text"
					className={
						error
							? `${styles["file-uploader__input-name"]} ${styles["file-uploader__input-name--error"]}`
							: styles["file-uploader__input-name"]
					}
					value={fileName}
					readOnly
				/>
				<label htmlFor={name} className={styles["file-uploader__icon"]}>
					<UploadIcon />
				</label>
				<input
					id={name}
					type="file"
					accept={accept}
					onChange={handleFileChange}
					className={styles["file-uploader__hidden-input"]}
				/>
			</div>
			{error && (
				<span className={styles["form-group__error-message"]}>
					{error?.message}
				</span>
			)}
		</div>
	);
};

export default FileUploader;
