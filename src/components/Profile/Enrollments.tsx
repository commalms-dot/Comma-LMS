"use client";
import React from "react";
import Link from "next/link";
import styles from "./Enrollments.module.css";

interface Enrollment {
  id: number;
  title: string;
  lastWatched: string;
  progress: number;
}

interface EnrollmentsProps {
  enrollments: Enrollment[];
  isLoading: boolean;
}

export default function Enrollments({
  enrollments,
  isLoading,
}: EnrollmentsProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>My Enrollments</h3>
        <span className={styles.count}>
          {isLoading ? "…" : enrollments.length}
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

                <div className={styles.progressWrapper}>
                  <div className={`${styles.skeleton} ${styles.skeletonBar}`} />
                </div>
              </div>
            ))
          : enrollments.map((e) => (
              <Link
                key={e.id}
                href={`/courses/id/${e.id}`}
                className={styles.item}
              >
                <div className={styles.itemLeft}>
                  <div className={styles.courseTitle}>{e.title}</div>
                  <div className={styles.meta}>
                    Last watched: {e.lastWatched}
                  </div>
                </div>

                <div className={styles.progressWrapper}>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progress}
                      style={{ width: `${e.progress}%` }}
                    />
                  </div>
                  <div className={styles.progressLabel}>{e.progress}%</div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
