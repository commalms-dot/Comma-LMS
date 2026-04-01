"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./enrollments.module.css";
import coursePlaceholder from "../../../public/images/course-placeholder.png";
import { useAuthStore } from "@/store/authStore";

interface Enrollment {
  id: number;
  title: string;
  description?: string;
  posterUrl?: string | null;
  price?: number;
  discountPrice?: number | null;
  status?: boolean;
  slug?: string;
  rating?: number;
  videoUrl?: string | null;
  reviewsCount?: number;
  instructor: {
    id: number;
    name: string;
    avatarUrl?: string | null;
    jobTitle?: string | null;
    organization?: string | null;
    level?: string | null;
  };
  category: {
    id: number;
    name: string;
  };
  progress?: number;
}

/* ================= Skeleton Card ================= */
function EnrollmentSkeleton() {
  return (
    <div className={styles.enrollmentCard}>
      <div className={`${styles.imageContainer} ${styles.skeleton}`} />

      <div className={styles.cardContent}>
        <div>
          <div className={`${styles.skeleton} ${styles.skeletonTextSmall}`} />
          <div className={`${styles.skeleton} ${styles.skeletonText}`} />
          <div className={`${styles.skeleton} ${styles.skeletonTextSmall}`} />
        </div>

        <div className={styles.actions}>
          <div className={`${styles.skeleton} ${styles.skeletonButton}`} />
          <div className={`${styles.skeleton} ${styles.skeletonIcon}`} />
        </div>
      </div>
    </div>
  );
}

export default function EnrollmentsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!token) {
        setError("You must be logged in to see enrollments.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/enrollments`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (!response.ok) throw new Error("Failed to fetch enrollments.");
        const data: Enrollment[] = await response.json();
        setEnrollments(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [token]);

  const filteredEnrollments = enrollments.filter((enrollment) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "in-progress") return (enrollment.progress ?? 0) < 100;
    if (activeFilter === "completed") return (enrollment.progress ?? 0) === 100;
    return true;
  });

  if (error) return <div className={styles.container}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span>/</span>
          <span>My Enrollments</span>
        </div>
        <h1>My Enrollments</h1>
        <p>Continue your learning journey</p>
      </div>

      <div className={styles.filters}>
        <button
          className={`${styles.filter} ${activeFilter === "all" ? styles.active : ""}`}
          onClick={() => setActiveFilter("all")}
        >
          All Courses
        </button>
        <button
          className={`${styles.filter} ${activeFilter === "in-progress" ? styles.active : ""}`}
          onClick={() => setActiveFilter("in-progress")}
        >
          In Progress
        </button>
        <button
          className={`${styles.filter} ${activeFilter === "completed" ? styles.active : ""}`}
          onClick={() => setActiveFilter("completed")}
        >
          Completed
        </button>
      </div>

      <div className={styles.enrollmentsGrid}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <EnrollmentSkeleton key={i} />
            ))
          : filteredEnrollments.map((enrollment) => (
              <div key={enrollment.id} className={styles.enrollmentCard}>
                <div className={styles.imageContainer}>
                  <Image
                    src={enrollment.posterUrl || coursePlaceholder}
                    alt={enrollment.title}
                    fill
                    sizes="100vw"
                    className={styles.image}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        coursePlaceholder.src;
                    }}
                  />
                  {enrollment.progress !== undefined && (
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${enrollment.progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>

                <div className={styles.cardContent}>
                  <div>
                    <div className={styles.category}>
                      {enrollment.category.name}
                    </div>
                    <h3 className={styles.title}>{enrollment.title}</h3>
                    <p className={styles.instructor}>
                      By {enrollment.instructor.name}
                    </p>
                  </div>

                  <div className={styles.actions}>
                    <Link href={`/courses/id/${enrollment.id}`}>
                      <button className={styles.continueButton}>
                        {enrollment.progress === 100
                          ? "Review Course"
                          : "Continue Learning"}
                      </button>
                    </Link>

                    <button className={styles.menuButton}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {!loading && filteredEnrollments.length === 0 && (
        <div className={styles.emptyState}>
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 6V7M12 12V13M12 18V19M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <h3>No enrollments found</h3>
          <p>You haven't enrolled in any courses yet.</p>
          <Link href="/courses" className={styles.exploreButton}>
            Explore Courses
          </Link>
        </div>
      )}
    </div>
  );
}
