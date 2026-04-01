"use client";

import React, { useEffect, useState } from "react";
import styles from "./CategoriesGrid.module.css";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
  createdAt: string;
  image?: string;
}

const CategoriesGrid = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fallbackImage = "/images/categories/placeholder.png";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/categories`,
        );
        const data = await response.json();

        if (data && data.data) {
          setCategories(data.data);
        } else {
          setError("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className={styles.categoriesSection}>
        <h2 className={styles.heading}>Explore Categories</h2>
        <p className={styles.subheading}>
          Choose a category to start learning from top instructors
        </p>

        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className={`${styles.card} ${styles.skeletonCard}`}
            >
              <div className={`${styles.imageWrapper} ${styles.skeleton}`} />
              <div className={`${styles.skeletonTitle} ${styles.skeleton}`} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.categoriesSection}>
        <h2 className={styles.heading}>Explore Categories</h2>
        <p className={styles.subheading}>{error}</p>
      </section>
    );
  }

  // ✅ Click handler to navigate
  const handleCategoryClick = (categoryName: string) => {
    router.push(
      `/courses?type=offline&category=${encodeURIComponent(categoryName)}`,
    );
  };

  return (
    <section className={styles.categoriesSection}>
      <h2 className={styles.heading}>Explore Categories</h2>
      <p className={styles.subheading}>
        Choose a category to start learning from top instructors
      </p>

      <div className={styles.grid}>
        {categories.map((category) => (
          <div
            key={category.id}
            className={styles.card}
            onClick={() => handleCategoryClick(category.name)} // 👈 Redirect on click
            style={{ cursor: "pointer" }} // 👈 Make it obvious it's clickable
          >
            <div className={styles.imageWrapper}>
              <img src={category.image || fallbackImage} alt={category.name} />
              <div className={styles.overlay}></div>
            </div>
            <h3 className={styles.cardTitle}>{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesGrid;
