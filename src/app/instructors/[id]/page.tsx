"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import styles from "@/components/ExpertProfile/ExpertProfile.module.css";

import { Star, Linkedin, Twitter, Globe } from "lucide-react";

const FALLBACK_AVATAR = "/images/instructors/instructor-1.png";

const ExpertProfilePage = () => {
  const { id } = useParams();
  const [expert, setExpert] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchExpert = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/instructors/${id}`,
        );

        if (!response.ok) throw new Error("Failed to fetch instructor");

        const data = await response.json();

        const allReviews =
          data.courses?.flatMap(
            (course: any) =>
              course.reviews?.map((review: any) => ({
                id: `${course.id}-${review.id}`,
                rating: review.rating,
                comment: review.text,
                createdAt: review.createdAt,
                courseTitle: course.title,
              })) || [],
          ) || [];

        setExpert({
          name: data.name || "Unknown Instructor",
          title: data.jobTitle || "—",
          organization: data.organization || "—",
          avatar: data.avatarUrl || FALLBACK_AVATAR,
          location: data.category || "—",

          avgRating: data.instructorAvgRating ?? 0,
          totalReviews: data.instructorReviewCount ?? 0,
          totalStudents: 0,

          social: {
            linkedin: "#",
            twitter: "#",
            website: "#",
          },

          courses:
            data.courses?.map((course: any) => ({
              id: course.id,
              title: course.title,
              rating: course.avgRating ?? 0,
              reviews: course.reviewCount ?? 0,
              thumbnail: "/images/course1.jpeg",
            })) || [],

          reviews: allReviews,
        });
      } catch (error) {
        console.error("Error fetching expert:", error);
        setExpert(null);
      } finally {
        setLoading(false);
      }
    };

    fetchExpert();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (!expert) {
    return <p className="text-center">Instructor not found.</p>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Image src={expert.avatar} alt={expert.name} width={180} height={180} />

        <div>
          <h1>{expert.name}</h1>

          <p className={styles.title}>
            {expert.title}
            {expert.organization !== "—" && ` at ${expert.organization}`}
          </p>

          <div className={styles.socialLinks}>
            <a href={expert.social.linkedin}>
              <Linkedin size={20} />
            </a>
            <a href={expert.social.twitter}>
              <Twitter size={20} />
            </a>
            <a href={expert.social.website}>
              <Globe size={20} />
            </a>
          </div>

          <div className={styles.stats}>
            <p>
              ⭐ {expert.avgRating} ({expert.totalReviews} reviews)
            </p>
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <h2>Courses</h2>

        {expert.courses.length === 0 ? (
          <p>No courses available yet.</p>
        ) : (
          <div className={styles.coursesGrid}>
            {expert.courses.map((course: any) => (
              <div key={course.id} className={styles.courseCard}>
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  width={500}
                  height={300}
                />
                <div className={styles.courseContent}>
                  <h3>{course.title}</h3>
                  <div className={styles.courseRating}>
                    <Star size={14} />
                    <span>
                      {course.rating} ({course.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h2>Student Reviews</h2>

        {expert.reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div className={styles.reviewsGrid}>
            {expert.reviews.map((review: any) => (
              <div key={review.id} className={styles.reviewCard}>
                <p className="text-yellow-500">
                  {"⭐".repeat(Math.max(1, review.rating))}
                </p>
                <p className={styles.reviewText}>“{review.comment}”</p>
                <small className="opacity-70">From: {review.courseTitle}</small>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ExpertProfilePage;
