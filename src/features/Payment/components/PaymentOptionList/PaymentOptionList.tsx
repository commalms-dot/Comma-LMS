"use client";
import * as RadioGroup from "@radix-ui/react-radio-group";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import AddCardModal from "../AddCardModal/AddCardModal";
import "./PaymentOptionList.css";

interface PaymentOptionListProps {
	onSelect: (value: string) => void;
}

const PaymentOptionList: React.FC<PaymentOptionListProps> = ({ onSelect }) => {
	const [isCardModalOpen, setIsCardModalOpen] = useState(false);

	const switchCardModal = useCallback(() => {
		setIsCardModalOpen((prev) => !prev);
	}, []);

	return (
		<>
			<RadioGroup.Root
				className="radio-group-root"
				defaultValue="default"
				aria-label="Payment Options"
				onValueChange={onSelect}
			>
				<div className="list-item">
					<div>
						<RadioGroup.Item
							className="radio-group-item"
							value="card"
							id="r1"
							aria-labelledby="label-r1"
							aria-checked={true}
						>
							<RadioGroup.Indicator className="radio-group-indicator" />
						</RadioGroup.Item>
						<label className="label" htmlFor="r1" id="label-r1">
							Pay with Cards
						</label>
					</div>
					<Button
						variant="transparent"
						size="fit"
						className="item-action"
						onClick={switchCardModal}
					>
						<Image
							src="/images/payment/visa.png"
							alt="Add credit or debit card"
							width={40}
							height={20}
						/>
						+ Add a credit or Debit card
					</Button>
				</div>
				<hr className="divider" />
				<div className="list-item">
					<div>
						<RadioGroup.Item
							className="radio-group-item"
							value="valu"
							id="valu"
							aria-labelledby="label-valu"
						>
							<RadioGroup.Indicator className="radio-group-indicator" />
						</RadioGroup.Item>
						<Image
							src="/images/payment/valu.png"
							alt="valu"
							width={40}
							height={20}
						/>
						<label className="label" htmlFor="valu" id="label-valu">
							Buy now pay later
						</label>
					</div>
					<p className="item-description">Installments using valU</p>
				</div>
				<hr className="divider" />
				<div className="list-item">
					<div>
						<RadioGroup.Item
							className="radio-group-item"
							value="e-wallet"
							id="ewallet"
							aria-labelledby="label-ewallet"
						>
							<RadioGroup.Indicator className="radio-group-indicator" />
						</RadioGroup.Item>
						<label className="label" htmlFor="ewallet" id="label-ewallet">
							E-wallets
						</label>
					</div>
					<p className="item-description">
						Effortless Payment: Seamlessly Transact Course Fees via E-Wallets
					</p>
				</div>
			</RadioGroup.Root>

			<AddCardModal open={isCardModalOpen} onOpenChange={setIsCardModalOpen} />
		</>
	);
};

export default PaymentOptionList;

