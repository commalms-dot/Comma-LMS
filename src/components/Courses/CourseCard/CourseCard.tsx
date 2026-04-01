"use client";

import React, { useEffect, useState } from "react";
import { CourseListItem } from "@/types/Course";
import { toast } from "react-toastify";
import Link from "next/link";
import clsx from "clsx";
import ProgressBar from "@/components/ui/ProgressBar/ProgressBar";
import StarRatingSummary from "@/components/ui/StarRatingSummary/StarRatingSummary";
import HeartIcon from "../../../../public/svg/heart.svg";
import AddToCartPopUp from "@/features/Cart/components/AddToCartPopup/AddToCartPopup";
import HoverCard from "@/components/ui/HoverCard/HoverCard";
import coursePlaceholder from "../../../../public/images/course-placeholder.png";
import { useAuthStore } from "@/store/authStore";
import "./CourseCard.css";

export interface CourseCardProps {
  course?: CourseListItem;
  withProgress?: boolean;
  loading?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  withProgress = false,
  loading = false,
}) => {
  const { token } = useAuthStore();
  const [isFavorite, setIsFavorite] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  /* ------------------ CHECK IF COURSE IS IN WISHLIST ------------------ */
  useEffect(() => {
    if (!token || !course?.id) return;

    const checkWishlist = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/wishlist?page=1&limit=20`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        const exists = data?.data?.some(
          (item: any) => item.courseId === course.id,
        );

        if (exists) setIsFavorite(true);
      } catch (error) {
        console.error("Wishlist check failed", error);
      }
    };

    checkWishlist();
  }, [token, course?.id]);

  if (loading || !course) {
    return <div className="course-card course-card--skeleton" />;
  }

  const fallbackSrc = coursePlaceholder.src;
  const imageSrc =
    course.posterUrl && course.posterUrl !== "null"
      ? course.posterUrl
      : fallbackSrc;

  /* ------------------ TOGGLE WISHLIST ------------------ */
  const handleWishlistToggle = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
      toast.error("Please login to use wishlist");
      return;
    }

    setWishlistLoading(true);

    try {
      const method = isFavorite ? "DELETE" : "POST";

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/wishlist/courses/${course.id}`,
        {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error("Wishlist action failed");
      }

      setIsFavorite(!isFavorite);
      toast.success(isFavorite ? "Removed from wishlist" : "Added to wishlist");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <Link href={`/courses/id/${course.id}`}>
      <HoverCard
        side="right"
        align="end"
        alignOffset={100}
        className="HoverCardContent"
        content={null}
      >
        <div className="course-card">
          <div className="course-card__image-wrapper">
            <img
              src={imageSrc}
              alt={course.title}
              className="course-card__image"
              loading="lazy"
              onError={(e) => (e.currentTarget.src = fallbackSrc)}
            />

            <div className="course-card__gradient-overlay" />

            <button
              className={clsx("course-card__favorite-btn", {
                active: isFavorite,
                loading: wishlistLoading,
              })}
              onClick={handleWishlistToggle}
              disabled={wishlistLoading}
            >
              <HeartIcon
                width={20}
                height={20}
                color={isFavorite ? "#ff5646" : "#64748b"}
              />
            </button>

            <div className="course-card__status-badge">
              {course.status ? "Active" : "Inactive"}
            </div>
          </div>

          <div className="course-card__content">
            <div className="course-card__instructor-wrapper">
              <div className="course-card__instructor-avatar">
                {course.instructor.name.charAt(0).toUpperCase()}
              </div>
              <span>{course.instructor.name}</span>
            </div>

            <h3 className="course-card__title">{course.title}</h3>

            <StarRatingSummary
              rating={course.rating}
              reviewsCount={course.reviewsCount}
            />

            {withProgress && <ProgressBar progress="19" />}
          </div>
        </div>
      </HoverCard>
    </Link>
  );
};
