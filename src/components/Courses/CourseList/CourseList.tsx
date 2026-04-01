"use client";

import { CourseListItem } from "@/types/Course";
import { CourseCard } from "../CourseCard/CourseCard";
import { useSearchParams } from "next/navigation";
import {
  useCoursesQuery,
  useEnrolledCoursesQuery,
  useViewedCoursesQuery,
} from "@/services/course.service";
import { FiBox } from "react-icons/fi"; // modern icon
import "./CourseList.css";

type Props = {
  allCourses?: boolean;
  limit?: number;
  start?: number;
  type?: string;
  enrolled?: boolean;
  viewed?: boolean;
  categoryId?: number; // new prop for filtering
};

export default function CourseList({
  allCourses = false,
  limit = 4,
  type,
  enrolled = false,
  viewed = false,
  categoryId,
}: Props) {
  const searchParams = useSearchParams();

  const queryParams = allCourses
    ? { page: 1, limit: limit }
    : {
        type,
        category: searchParams.get("category") || "",
        limit,
      };

  const {
    data: courses,
    isLoading,
    error,
  } = enrolled
    ? useEnrolledCoursesQuery({})
    : viewed
      ? useViewedCoursesQuery({})
      : useCoursesQuery(queryParams);

  if (isLoading) {
    return (
      <section className="course-list">
        <article className="course-list__items">
          {Array.from({ length: limit }).map((_, i) => (
            <CourseCard key={i} loading={true} withProgress={true} />
          ))}
        </article>
      </section>
    );
  }

  if (error) {
    return (
      <p className="course-list__error">
        Error loading courses. Please try again later.
      </p>
    );
  }

  // Apply category filter if categoryId is provided
  const filteredCourses = categoryId
    ? courses.filter((course: any) => course.category?.id === categoryId)
    : courses;

  // Show modern empty state if no courses
  if (filteredCourses.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "300px",
          gap: "16px",
          color: "#64748b",
          background: "#f9fafb",
          borderRadius: "12px",
          marginTop: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          animation: "fadeIn 0.5s ease-in-out",
        }}
      >
        <FiBox size={48} />
        <h3 style={{ fontSize: "1.25rem", fontWeight: 600 }}>
          No courses in this category
        </h3>
        <p
          style={{
            fontSize: "0.95rem",
            textAlign: "center",
            maxWidth: "300px",
          }}
        >
          It looks like this category is empty. Check other categories or come
          back later for new courses.
        </p>
      </div>
    );
  }

  return (
    <section className="course-list">
      <article className="course-list__items">
        {filteredCourses.map((course: any) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </article>
    </section>
  );
}
