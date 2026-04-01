"use client";
import React, { useState } from "react";
import CourseList from "@/components/Courses/CourseList/CourseList";
import CategoriesList from "@/components/Categories/CategoriesList/CategoriesList";
import styles from "./coursesSlug.module.css";

export default function Page({ params }: { params: { slug: string } }) {
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);

  return (
    <section className={`container ${styles["category-container"]}`}>
      <h2 className={styles.header}>{params.slug} Courses</h2>

      {/* Categories */}
      <div>
        <h3 className={styles["section-title"]}>Categories</h3>
        <CategoriesList
          onCategoryClick={(categoryId: number | null) =>
            setCategoryFilter(categoryId)
          }
        />
      </div>

      {/* Courses */}
      <div>
        <h3 className={styles["section-title"]}>Available Courses</h3>
        <CourseList
          allCourses={true}
          limit={20}
          categoryId={categoryFilter ?? undefined}
        />
      </div>
    </section>
  );
}
