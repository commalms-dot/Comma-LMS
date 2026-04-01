"use client";
import React, { useState, useEffect } from "react";
import ReviewsList from "@/components/Reviews/ReviewsList/ReviewsList";
import Button from "@/components/ui/Button/Button";
import {
  useGetReviewsQuery,
  useCreateReviewMutation,
  useGetReviewSummaryQuery,
} from "@/services/course-reviews.service";
import { User } from "@/store/slices/auth.slice";
import InputEditor from "@/components/InputEditor/InputEditor";
import StarRatingInput from "@/components/ui/StarRatingInput/StarRatingInput";
import CourseFeedback from "../CourseFeedback/CourseFeedback";
import CourseContentHeader from "../ContentHeader/ContentHeader";
import UserAvatarCard from "@/components/User/UserAvatarCard/UserAvatarCard";
import { CourseReview } from "@/types/Review";
import "./CourseReviewsSection.css";

interface CourseReviewsSectionProps {
  courseId: string;
  user: User | null;
  watchMode?: boolean;
}

const CourseReviewsSection: React.FC<CourseReviewsSectionProps> = ({
  courseId,
  user,
  watchMode = true,
}) => {
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState<CourseReview[]>([]);
  const [rating, setRating] = useState(1);

  // Mutation to create a new review
  const [createReview, { isLoading: isCreatingReviewingLoading }] =
    useCreateReviewMutation();
  // Query to fetch course reviews summary
  const { data: reviewsSummaryData, refetch: refetchCourseReviewSummary } =
    useGetReviewSummaryQuery({ courseId });
  // Query to fetch reviews with pagination
  const { data: reviewsData, isLoading } = useGetReviewsQuery({
    courseId,
    page,
    limit: 10,
  });

  // Effect to update the reviews state when reviewsData changes
  useEffect(() => {
    if (reviewsData?.data) {
      setReviews((prevReviews) => [...prevReviews, ...reviewsData.data]);
    }
  }, [reviewsData]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSubmitReview = async (content: string) => {
    try {
      const newReview = await createReview({
        courseId,
        review: { text: content, rating, userId: 1 },
      }).unwrap();
      setReviews((prevReviews) => [newReview, ...prevReviews]);
      setRating(1);
      // Invalidate the review summary query to refetch it
      refetchCourseReviewSummary();
    } catch (error) {
      console.error("Failed to create review:", error);
    }
  };

  return (
    <div className="course-reviews-section">
      <CourseContentHeader title="Students feedback" />
      <div className="course-reviews-section__content">
        <CourseFeedback
          totalReviews={reviewsSummaryData?.totalReviews}
          oneStarCount={reviewsSummaryData?.oneStarCount}
          twoStarCount={reviewsSummaryData?.twoStarCount}
          threeStarCount={reviewsSummaryData?.threeStarCount}
          fourStarCount={reviewsSummaryData?.fourStarCount}
          fiveStarCount={reviewsSummaryData?.fiveStarCount}
          overallRating={reviewsSummaryData?.overallRating}
        />
        {watchMode ? (
          <div className="course-reviews-section__input">
            <UserAvatarCard
              user={{
                id: user?.id as number,
                fullName: user?.fullName as string,
                jobTitle: user?.jobTitle,
                avatarUrl: user?.avatarUrl as string,
              }}
            />
            <div className="course-reviews-input__star-rating">
              <p>How do you rate this course?</p>
              <StarRatingInput
                onRatingChange={(rating) => setRating(rating)}
                rating={rating}
              />
            </div>
            <InputEditor
              onSubmit={handleSubmitReview}
              isLoading={isCreatingReviewingLoading}
              placeholder="Write your review here..."
            />
          </div>
        ) : null}
        <div className="course-reviews-section__reviews-list">
          <ReviewsList reviews={reviews} />
        </div>
        {reviewsData?.totalPages && page < reviewsData.totalPages && (
          <Button
            variant="transparent"
            className="load-more-btn"
            isLoading={isLoading}
            onClick={handleLoadMore}
          >
            See More Reviews
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseReviewsSection;
