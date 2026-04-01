import React, { useState, useEffect, ReactElement } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { slugify } from "@/utils";
import "./Tabs.css";

interface TabProps {
	children: React.ReactNode;
	title: string;
}

interface TabsProps {
	children: ReactElement<TabProps>[];
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
	const [selectedTab, setSelectedTab] = useState<number>(0);
	const searchParams = useSearchParams();
	const router = useRouter();
	const tabParam = searchParams.get("tab");

	useEffect(() => {
		if (tabParam) {
			const tabIndex = children.findIndex(
				(child) => slugify(child.props.title) === tabParam
			);
			if (tabIndex >= 0) {
				setSelectedTab(tabIndex);
			} else {
				setSelectedTab(0);
			}
		} else {
			setSelectedTab(0);
		}
	}, [tabParam, children]);

	const handleTabClick = (index: number) => {
		setSelectedTab(index);
		const slug = slugify(children[index].props.title);
		router.push(`?tab=${slug}`);
	};

	return (
		<div className="tab-container">
			<div className="tabs">
				{children.map((child, index) => (
					<div
						key={index}
						onClick={() => handleTabClick(index)}
						className={`tabs__tab ${selectedTab === index ? "tabs__tab--active" : ""}`}
					>
						{child.props.title}
					</div>
				))}
			</div>
			<div className="tabs__tab-content">
				{children[selectedTab].props.children}
			</div>
		</div>
	);
};

export default Tabs;
