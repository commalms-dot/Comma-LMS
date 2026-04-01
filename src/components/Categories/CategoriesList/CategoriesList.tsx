"use client";

import React, { useEffect, useState } from "react";
import styles from "./CategoriesList.module.css";

type CategoryListItem = {
  id: number;
  name: string;
};

type CategoriesListProps = {
  onCategoryClick?: (categoryId: number | null) => void;
};

export default function CategoriesList({
  onCategoryClick,
}: CategoriesListProps) {
  const [categories, setCategories] = useState<CategoryListItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null); // use id
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/categories`,
        );
        const data = await res.json();
        if (Array.isArray(data?.data)) {
          setCategories(data.data);
        } else {
          setCategories([]);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading)
    return (
      <div className={styles.list}>
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className={styles["category-skeleton"]}></div>
        ))}
      </div>
    );

  if (error) return <div>{error}</div>;
  if (categories.length === 0) return <div>No categories found.</div>;

  return (
    <div className={styles.list}>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => {
            const newActive =
              activeCategory === category.id ? null : category.id;
            setActiveCategory(newActive);
            onCategoryClick?.(newActive); // notify parent
          }}
          className={`${styles["category-btn"]} ${
            activeCategory === category.id ? styles.active : ""
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
