import React, { Suspense } from "react";
import CategoriesList from "../CategoriesList/CategoriesList";
import Loader from "@/components/ui/Loader/Loader";
import UserReviewList from "@/components/User/UserReviewList/UserReviewList";

export async function getServerSideProps(context: any) {
	const category = context.query.category || "computer";
	return {
		props: {
			category,
		},
	};
}

export default function CategorySelector({ category }: { category: string }) {
	return (
		<section>
			<Suspense fallback={<Loader />}>
				<CategoriesList />
				<UserReviewList category={category} />
			</Suspense>
		</section>
	);
}
