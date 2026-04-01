"use client";

import React from "react";
import styles from "./ExpertProfile.module.css";

export default function ExpertProfile() {
  const expert = {
    name: "Dr. Youssef Hisham",
    title: "Software Engineering Instructor",
    avatarUrl: "",
    subscribers: 1250,
    courses: 8,
  };

  const dummyCourses = [
    { id: 1, title: "React Masterclass", students: 420 },
    { id: 2, title: "Advanced TypeScript", students: 310 },
    { id: 3, title: "Clean Architecture in JS", students: 270 },
  ];

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <div className={styles.infoLeft}>
          <div className={styles.avatar}>
            {expert.avatarUrl ? (
              <img src={expert.avatarUrl} alt={expert.name} />
            ) : (
              <div className={styles.initials}>
                {expert.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
            )}
          </div>

          <div className={styles.textBlock}>
            <h1 className={styles.name}>{expert.name}</h1>
            <p className={styles.title}>{expert.title}</p>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statNumber}>{expert.subscribers}</div>
            <div className={styles.statLabel}>Subscribers</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>{expert.courses}</div>
            <div className={styles.statLabel}>Courses</div>
          </div>
        </div>
      </section>

      <section className={styles.courses}>
        <h2 className={styles.sectionTitle}>My Courses</h2>
        <div className={styles.courseGrid}>
          {dummyCourses.map((course) => (
            <div key={course.id} className={styles.courseCard}>
              <div className={styles.courseTitle}>{course.title}</div>
              <div className={styles.courseMeta}>
                {course.students} enrolled students
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
