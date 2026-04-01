import React, { useState, useRef, KeyboardEvent } from "react";
import styles from "./OTPInput.module.css";

interface OTPInputProps {
  id?: string;
  label?: string;
  onChange: (value: string) => void;
}

export interface OTPInputRef {
  getValue: () => string;
}

const OTPInput: React.FC<OTPInputProps> = ({ id = "otp", label, onChange }) => {
  const [inputValues, setInputValues] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleInputChange = (index: number, inputValue: string) => {
    if (!/^\d*$/.test(inputValue)) return; // only numbers

    const updatedValues = [...inputValues];
    updatedValues[index] = inputValue.slice(-1); // take last digit
    setInputValues(updatedValues);

    if (inputValue && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    onChange(updatedValues.join(""));
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && inputValues[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className={styles["otp-input__container"]}>
      {label && (
        <label htmlFor={id} className={styles["otp-input__label"]}>
          {label}
        </label>
      )}
      <div className={styles["otp-input__inputs"]}>
        {inputValues.map((val, index) => (
          <input
            key={index}
            id={`${id}-${index}`}
            type="text"
            value={val}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            maxLength={1}
            className={styles["otp-input__input"]}
            ref={(el) => {
              inputRefs.current[index] = el!;
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default OTPInput;
