"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CourseCard } from "@/components/Courses/CourseCard/CourseCard";
import { CourseListItem } from "@/types/Course"; // import the correct type

interface Course extends CourseListItem {} // ✅ extend CourseListItem

const CoursesByCategory = () => {
  const searchParams = useSearchParams();
  const categoryNameFromURL = searchParams.get("category");

  const [selectedCategoryName, setSelectedCategoryName] = useState<
    string | null
  >(categoryNameFromURL);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch courses whenever selectedCategoryName changes
  useEffect(() => {
    if (!selectedCategoryName) return;

    const fetchCourses = async () => {
      setLoadingCourses(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/courses?page=1&limit=50`,
        );
        const data = await res.json();

        // Filter by category name and map to CourseListItem with defaults
        const filtered: Course[] = data
          .filter(
            (course: any) => course.category.name === selectedCategoryName,
          )
          .map((course: any) => ({
            id: course.id,
            title: course.title,
            posterUrl: course.posterUrl,
            description: course.description,
            instructor: course.instructor,
            rating: course.rating,
            reviewsCount: course.reviewsCount,
            status: course.status,
            category: course.category,
            // ✅ add missing fields with defaults if not provided
            caption: course.caption || "",
            price: course.price || 0,
            discountPrice: course.discountPrice || undefined,
            slug: course.slug || "",
            duration: course.duration || 0,
          }));

        setCourses(filtered);
      } catch (err) {
        console.error(err);
        setCourses([]);
        setError("Failed to load courses.");
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, [selectedCategoryName]);

  if (!selectedCategoryName) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        No category selected.
      </div>
    );
  }

  // Grid style: max 4 per row, responsive
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "30px",
    justifyItems: "center",
  };

  return (
    <section style={{ padding: "80px 0", textAlign: "center" }}>
      <h2
        style={{
          fontSize: "36px",
          fontWeight: 700,
          color: "#5656f1",
          marginBottom: "10px",
        }}
      >
        {selectedCategoryName} Courses
      </h2>
      <p style={{ fontSize: "18px", color: "#666", marginBottom: "50px" }}>
        Explore courses in this category
      </p>

      {loadingCourses ? (
        <div style={gridStyle}>
          {Array.from({ length: 6 }).map((_, idx) => (
            <CourseCard key={idx} loading />
          ))}
        </div>
      ) : courses.length > 0 ? (
        <div style={gridStyle}>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "4rem",
            color: "#64748b",
            fontSize: "1.25rem",
            border: "2px dashed #cbd5e1",
            borderRadius: "12px",
            background: "#f1f5f9",
            marginTop: "1rem",
          }}
        >
          No courses found in this category.
        </div>
      )}
    </section>
  );
};

export default CoursesByCategory;
