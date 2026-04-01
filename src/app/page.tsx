import CourseList from "@/components/Courses/CourseList/CourseList";
import InstructorList from "@/components/Instructor/InstructorList/InstructorList";
import ClientsList from "@/features/landingPage/components/ClientsList/ClientsList";
import StatisticsList from "@/features/landingPage/components/StatisticsList/StatisticsList";
import CategoriesGrid from "@/components/Categories/CategoriesGrid/CategoriesGrid";
import Banner from "@/features/landingPage/components/Banner/Banner";
// import CategoriesList from "@/components/Categories/CategoriesList/CategoriesList";
// import UserReviewList from "@/components/User/UserReviewList/UserReviewList";
// import { Suspense } from "react";
// import Loader from "@/components/ui/Loader/Loader";
import "./page.css";

export default async function Home({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  return (
    <main className="home-page">
      <div className="home-page__top-section container">
        <Banner />
        {/* Categories list */}
        {/* <section className="home-page__section home-page__categories">
					<h2 className="home-page__categories-header">
						Choose category to learn more about the courses in this category
					</h2>
				</section> */}
        {/* Featured Courses */}
        <section className="home-page__section home-page__categories">
          <CategoriesGrid />
        </section>
        <section className="home-page__section home-page__featured-courses">
          <article>
            <div className="home-page__section-header home-page__top-selling-header">
              <h2 className="heading-1">Top selling</h2>
              <span className="home-page__top-selling-subtext">
                The most popular courses among our learners
              </span>
            </div>
            <CourseList type="recorded" />
          </article>
        </section>
      </div>
      <div className="home-page__bottom-section-wrapper">
        <div className="home-page__bottom-section container">
          {/* Clients list */}
          <section className="home-page__section home-page__featured-clients">
            <div className="home-page__section-header">
              <h2 className="heading-1">Most important clients</h2>
              <p className="home-page__clients-section-subheader">
                Trusted by the industry&apos;s best experts
              </p>
            </div>
            <ClientsList />
          </section>
          {/* Experts */}
          <section className="home-page__section home-page__featured-experts">
            <div className="home-page__section-header">
              <h2 className="heading-1">Comma Experts</h2>
            </div>
            <InstructorList />
          </section>
          {/* Statistics */}
          <section className="home-page__section home-page__stats">
            <div className="home-page__section-header">
              <h2 className="heading-1">A platform that delivers results</h2>
              <p className="home-page__stats-section-subheader">
                We measure our Success by our driven values
              </p>
            </div>
            <StatisticsList />
          </section>
          {/* Students reviews */}
          {/* <section>
				<h2>Loved by Our Learners</h2>
				<UserReviewList category={searchParams?.category ?? "computer"} />
			</section> */}
        </div>
      </div>
    </main>
  );
}
