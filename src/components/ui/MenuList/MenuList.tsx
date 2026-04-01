import React, { useState } from "react";
import styles from "./MenuList.module.css";

interface MenuListProps {
	tabs: string[];
	children: React.JSX.Element[];
}

const MenuList: React.FC<MenuListProps> = ({ tabs, children }) => {
	const [activeTab, setActiveTab] = useState(0);

	const handleTabClick = (index: number) => {
		setActiveTab(index);
	};

	return (
		<div className={styles["tabs-area"]}>
			<div className={styles["tabs-area__tabs-list-container"]}>
				<ul className={styles["tabs-area__tabs-list"]}>
					{tabs.map((tab, index) => (
						<li
							key={index}
							// className={`tab ${index === activeTab ? "active" : ""}`}
							onClick={() => handleTabClick(index)}
							className={`
								${styles["tabs-area__tabs-list__tab"]}
								${index === activeTab ? `${styles["tabs-area__tabs-list__tab--active"]}` : ""}
							`}
						>
							{tab}
						</li>
					))}
				</ul>
			</div>
			<div className={styles["tabs-area__content"]}>
				{React.Children.map(children, (child, index) =>
					index === activeTab ? child : null
				)}
			</div>
		</div>
	);
};

export default MenuList;
