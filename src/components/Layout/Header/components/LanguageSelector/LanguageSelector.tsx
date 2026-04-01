// components/LanguageSelector.js
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import styles from "./LanguageSelector.module.css";

const languages = [
	{ code: "ar", name: "Arabic", flag: "/images/flags/eg.png" },
	{ code: "en", name: "English", flag: "/images/flags/us.png" },
	// Add more languages as needed
];

const LanguageSelector = () => {
	const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger className={styles.trigger}>
				<Image
					src={selectedLanguage.flag}
					alt={selectedLanguage.name}
					width={26}
					height={16}
				/>
				<span className={styles.languageCode}>
					{selectedLanguage.code.toUpperCase()}
				</span>
				<Image
					src={"/svg/arrow-chevron-down.svg"}
					alt="Chevron Down"
					width={16}
					height={16}
				/>
			</DropdownMenu.Trigger>

			<DropdownMenu.Content sideOffset={10} className={styles.content}>
				{languages.map((lang) => (
					<DropdownMenu.Item
						key={lang.code}
						className={styles.item}
						onSelect={() => setSelectedLanguage(lang)}
					>
						<Image src={lang.flag} alt={lang.name} width={26} height={16} />
						<span className={styles.languageName}>{lang.name}</span>
					</DropdownMenu.Item>
				))}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
};

export default LanguageSelector;
