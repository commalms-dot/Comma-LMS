"use client";
import React from "react";
import Link from "next/link";
import styles from "./Enrollments.module.css";

interface WishlistItem {
  courseId: number;
  createdAt: string;
  course: {
    id: number;
    title: string;
    slug: string;
    posterUrl?: string;
  };
}

interface WishlistProps {
  wishlist: WishlistItem[];
  isLoading: boolean;
}

export default function Wishlist({ wishlist, isLoading }: WishlistProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>My Wishlist</h3>
        <span className={styles.count}>
          {isLoading ? "…" : wishlist.length}
        </span>
      </div>

      <div className={styles.list}>
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={styles.item}>
                <div className={styles.itemLeft}>
                  <div
                    className={`${styles.skeleton} ${styles.skeletonTitle}`}
                  />
                  <div
                    className={`${styles.skeleton} ${styles.skeletonMeta}`}
                  />
                </div>
              </div>
            ))
          : wishlist.map((item) => (
              <Link
                key={item.courseId}
                href={`/courses/id/${item.course.id}`}
                className={styles.item}
              >
                <div className={styles.itemLeft}>
                  <div className={styles.courseTitle}>{item.course.title}</div>
                  <div className={styles.meta}>
                    Added on {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
